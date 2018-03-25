+++
categories = ["Technology"]
date = "2011-12-24T00:00:00Z"
title = "Tame the Mongoid _id field in your Rails and Backbone JS App"

+++

### The Identity Crisis - \_id vs id

Sooner or later as you develop your Rails + Mongoid + Backbone app you'll run into a conflict between the identity attribute Mongoid prefers - `_id` - and the identity attribute Backbone JS prefers - `id`.

It's bad all right - Backbone will believe all of your models are new, i.e not persisted.

### A client-side solution (not recommended)

Backbone allows you to override the model property it considers the ID. As so:

``` javascript
    Backbone.Model.prototype.idAttribute = "_id";
```

Backbone will now use `_id` as the identity column. And as long as you're emitting `_id` in the Rails code that generates your JSON, your models will have a valid ID. Fetches and saves will perform as expected.

That's reasonable, but for reasons I'll give in the next section this isn't the way I chose to go.

### A server-side, API-aware solution

Many applications use JSON API's to move models around - externally and/or internally (e.g. with a Backbone app). And generally speaking, `id` is the most common representation of identity for such API's.

That said, if you were to go create an out-of-the-box Rails app with a JSON API using Mongoid, you would end up exposing model identity via the `_id` attribute. Personally, I wouldn't want to do that - it would seem to violate the principle of least surprise for my potential API consumers.

Instead, I'd prefer to use `id`, and coerce `_id` into `id` by patching Mongoid's `as_json` method.

``` ruby
    module Mongoid
      module Document
        def as_json(options={})
          attrs = super(options)
          attrs["id"] = self.persisted? ? self._id : nil
          attrs
        end
      end
    end
```

This gives you access to `id` as expected when specifying JSON outputs. (Your API consumers never see `_id` - which I think is great, because it feels like an implementation detail rather than a statement about your data.)

Not only does this solve the API surprise problem, it has also solved our Backbone JS problem. Backbone gets what it wanted in the first place - `id`.

Essentially, this 2 for 1 win is why I prefer this solution.

If you had implemented the client-side `_id` solution, and the time came to start creating your API, you'd be faced with the unfortunate choice of sticking with `_id` for your whole API, or forking somewhere in your JSON generation. In my opinion, JSON generation should be straightforward - too dry and needly for forking.

### A few little details

Note the `if self.persisted?` check in the above example. This is very important, because Mongoid assigns ID's even to brand new objects (unlike ActiveRecord, say). See for yourself:

``` ruby
    >> User.new.id #=> BSON::ObjectId4ef6bdf5e968815efd000002
```

Note #2 - Currently this solution is always going to add `"id"` to the results - regardless of the options given. This fits my use case and allows me to omit the "id" when specifying options. However, if that doesn't work in your case, you can do some simple inspection of the options and see if any of the `:id` or `:_id` keys were requested in the `:only`/`:methods` keys. And only in those cases add the id.

### That's it.

So far this approach has gotten good mileage across a few projects for me and I hope you find it useful. If you have any other solutions for this problem, or extensions to this one, I'd love to hear about it.

Note: This post was inspired by a blog post I commented on [here](http://lostechies.com/derickbailey/2011/06/17/making-mongoid-play-nice-with-backbone-js/).
