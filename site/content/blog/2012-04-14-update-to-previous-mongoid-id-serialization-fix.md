+++
categories = ["Technology"]
date = "2012-04-14T00:00:00Z"
title = "Update to previous Mongoid id serialization fix"

+++

Previously I had blogged about [one way](http://dzello.com/blog/2011/12/24/tame-the-mongoid-id-field-in-your-rails-and-backbone-js-app/) to get an `id` attribute included in the serialization of Mongoid documents.

The original solution involved a patch to the `as_json` method from `ActiveModel::Serialization` applied to `Mongoid::Document`. This patch ensured that the `id` attribute was included in the serialization for persisted documents.

There was, however, a shortcoming of this solution: `id` would appear in the JSON for the top-level object (i.e. the object on which `as_json` is directly called). However, the `id` attribute would NOT appear in the JSON of children specified to be added to the serialization via the `as_json` `:include` option.

Here's an illustration of what goes wrong:

``` ruby
# example: serialize only the id attribute of the user and any comments
user.as_json(only: :id, include: { comments: { only: :id } } )
```

```
# returns the following using the as_json patch
{ id: BSON::ObjectId('ABC123'), comments: [{}] }  # the comment has no id attribute!
```

### Enter #serializable_hash

In doing some digging into the `as_json` method in `ActiveModel::Serialization`, it's clear that `as_json` is not triggered recursively on the child objects specified by the `:include` option. Instead, it's the `#serializable_hash` method that acts recursively.

``` ruby
# File activemodel/lib/active_model/serializers/json.rb, line 89
def as_json(options = nil)
  root = include_root_in_json
  root = options[:root] if options.try(:key?, :root)
  if root
    root = self.class.model_name.element if root == true
    { root => serializable_hash(options) }
  else
    serializable_hash(options)
  end
end
```

Therefore it's `serializable_hash` that needs to be hooked into to cause `id` to appear in the nested records.

### The patch to #serializable_hash

Here's one way to hook into `serializable_hash`:

``` ruby
class ApplicationModel
  class << self
    def inherited(base)
      base.class_eval do
        include Mongoid::Document

        # juicy bits
        serializable_hash_method = instance_method(:serializable_hash)
        define_method :serializable_hash do |options=nil|
          self.attributes["id"] = self.persisted? ? self._id : nil
          serializable_hash_method.bind(self).call(options)
        end

      end
    end
  end
end
```

You can add the juicy bits directly into your individual models or, far better, into a base class your models inherit from (as illustrated here).

(It's unwise to patch out serializable_hash globally as it is likely used in other parts of your application. Doing it like this makes sure that the behavior is modified only the context of your models.)

Here's the result when running the aforementioned snippet with this patch:

``` ruby
# returns the expected id attributes
{ id: BSON::ObjectId('ABC123'),
  comments: [{ id: BSON::ObjectId('ABC123') }] } # the comment has an id attribute!
```
