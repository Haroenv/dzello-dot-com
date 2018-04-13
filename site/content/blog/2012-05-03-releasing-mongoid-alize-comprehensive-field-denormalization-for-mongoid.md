+++
categories = ["Technology"]
date = "2012-05-03T00:00:00Z"
title = "Releasing Mongoid Alize - Comprehensive field denormalization for Mongoid that stays in sync"

+++

*<span style="color: red">Warning:</span> The API has evolved since the initial release - make sure to check out [this post](http://dzello.com/blog/2012/07/28/mongoid-alize-0-dot-3-1-is-out/) before diving in!*

Today I'm releasing v0.1 of Mongoid Alizé. From [MongoSF](http://www.10gen.com/events/mongo-sf) nonetheless!

Mongoid Alize is a Ruby gem that allows [Mongoid](http://mongoid.org)-based applications to
easily denormalize data between one-to-one, one-to-many, and many-to-many relations.

While this blog post is an announcement of the release, it's also intended to be a
a primer on denormalization and how to use it to make your applications faster.

(If you're already familiar with the concept of denormalization, you might skip the following and head directly to
[mongoid_alize on Github](https://github.com/dzello/mongoid_alize). Otherwise, read on!)

Denormalization: Why Fat is Fast
--------------------------------
Database [denormalization](http://en.wikipedia.org/wiki/Denormalization)
"is the process of attempting to optimise the read performance of a database by adding redundant data or by grouping data."

The skinny: to cut down on trips to the database, you store copies of data in multiple tables/collections.
In doing so, you avoid the need for JOINs and lookups needed to stitch together related pieces of data.

In sum: you're storing more data - but your overall application can get *much* faster!

Real World analogy
------------------
Airlines make money when butts are in seats. It's more than twice as profitable to fly 1 flight with
300 people than it is to fly 2 flights with 150 people each (all other things equal).

Chances are, there are *a lot* of empty seats (i.e. fields) on the roundtrips between your application and
your database. And because of that, you're probably making a lot of extra roundtrips. If you could
just get certain "passengers" to fly together, the number of roundtrips could be significantly reduced.

Because many applications block on I/O (new roundtrips can't start until the previous roundtrip returns),
response time tends to increase linearly with the number of roundtrips taken. So just like the airlines, reducing this number by flying at capacity
is essential for a cost-efficient operation.

Code Example: Users and Posts
------------------------
Your blogging app has `Users` and `Posts`. Users write the
Posts. A common use case for your app is to display a list of posts with the post's title and the authoring user's name.

Assume this is your implied data structure in a no-sql database:

    [posts]
      - user_id
      - title

    [users]
      - id
      - name

Sadly, fetching the list of posts *with user names* will require 1+n trips to the database, where n is the number of
posts. If you have 10 posts, for example, you need 1 lookup to get the post record(s), and then
1 lookup *for each post* to get the user's name - that's 11 database roundtrips!

Here's a typical, unrefined HAML view snippet that does just that:

``` haml
- Post.all.each do |post|
  %h1= post.title
  %h2= post.user.name  # cloaked dagger!
```

Calling `post.user.name` is a cloaked dagger! This snippet looks like it will hit the database entirely once -
for `Post.all` - but in fact it does so `Post.count` more times - on each invocation of `post.user.name`.
This is Not Good.

Don't cache out yet
-------------------
Finding and addressing occurrences like these is a common first step in performance tuning a Rails application.

In the ActiveRecord days, we had the `:include` option - which would load associations via JOINs.
This was very helpful, but we often don't have an analogue in the no-sql world.

Nowadays, once the response times start climbing, many developers turn immediately to caching. Dropping in record caches,
partial caches, page caches, tango and caches, etc. And caching Done Right can help here. Caches are Good Things.

However, a mature, scaling app will typically employ caching in many forms,
and a multitude of caching tiers can quickly lead to Real Tears.

So when possible, it's better to achieve the intent of a caching
via something you Already Have. (ok I'm getting a little Carried Away)

No JOINS, no caching, no problem!
---------------------------------
While you don't get JOINs with most no-sql architectures, you do get a lot of flexibility with record structure.
This is well-suited to denormalizing data. When denormalizing, you're adding additional, conceptually auxiliary, attributes
to related collections. Not worrying about the maintenance of an explicit schema makes this a much more practical solution than it might be otherwise.

Let's take a look. I've updated the implied data model, now showing `user.name` denormalized into `posts`:

    [posts]
      - user_id
      - title
      - user_name # populated from user.name

    [users]
      - id
      - name

Now we can write our HAML snippet like this:

``` haml
- Post.all.each do |post|
  %h1= post.title
  %h2= post.user_name  # winning!
```

**1** database hit later and we are winning at denormalizing. `user_name` is a real field
stored inside the `posts` collection and retrieved along with the post itself.
Those other 10 lookups Never Happened!

Voilà, Alizé!
-------------
Now we just need to make sure that the `user_name` attribute of the `Post` is populated.
That's where `Mongoid::Alize` comes in.

Let's do just that by adding one line of code to our `Post` model:

``` ruby
class Post
  include Mongoid::Document
  include Mongoid::Alize

  has_one :user
  alize :user, :name
  # ...
```

Here we're telling Alize - "copy the `name` field from the `user` relation into the post record itself." (note: you can specify as many fields as you like, or specify none to denormalize all non-internal fields)

Alize then defines a new field `user_name` and adds callbacks to the `User` and `Post` to models to populate the field
when the value changes.

Staying in sync
----------------
Here's the question that makes denormalization sound scary at first. "If I store multiple copies of my
data everywhere, how will I ever keep them all fresh/in sync?"

I'm glad you asked! The ActiveModel spec (and Mongoid's implementation of it) have two classy properties that
make this possible.

+ A relation and its inverse are well-defined. If a model `has_many :foos`, it's easy to find out who `Foo` is.
+ Callbacks, sweet callbacks. Once you know who `Foo` is, its easy to do something when a `foo` changes.

Alize takes advantage of these concepts to keep data in sync. Bi-directional syncing is
fully supported for one-to-one, one-to-many, many-to-one, and many-to-many relations.
This includes save operations *and* destroys.

Here's a line-by-line example (assume users and posts as above w/ alize included):

``` ruby
@post = Post.create!(title: "Cat coasters")
@user = User.create!(name: "Bob")
@post.user = @user
@post.user_name # => "Bob"
@user.update_attributes!(name: "Robert")
@post.user_name # => "Robert"
@user.destroy
@post.user_name # => nil
```

The denormalized user data included in the post stays in sync from create to destroy.

More Examples
------------------------
Here's an example that shows off Alize's support for `many` relations on the source side
(i.e. the side of the relation where the denormalized attributes go).

The use case here - you'd like to show a user and all of their post titles using just **1** database call.

``` ruby
class User
  # ...
  has_many :posts
  alize :posts, :title  #stores titles for all posts in posts_fields
end

# begin example
@user = User.create!(name: "Bob")
@user.posts # => []
@user.posts_fields # => []
@user.posts.create!(title: "Living the dream")
@user.posts_fields # => [{title: "Living the dream")}]
@post = @user.posts.create!(title: "Woke up")
@user.posts_fields # => [{title: "Living the dream")}, {title: "Woke up"}]
@post.destroy
@user.posts_fields # => [{title: "Living the dream")}] # still dreamin'!
```

(Note: `_id` is also stored in posts_fields but omitted here for readability. It's needed to locate
records when propagating updates.)

Installation
------------
Ready to try it out?

If using Bundler, add this to your `Gemfile`:

``` ruby
gem 'mongoid_alize'
```

Without bundler:

``` ruby
gem install mongoid_alize
```

Or clone it: [mongoid_alize on Github](https://github.com/dzello/mongoid_alize). The repository has a full
set of specs, examples, and documentation.

Outro
-----
Mongoid Alize was born from within a real-life Rails/Mongoid/JSON application with lots of nooks and crannies. It's also
very young, so if you try it out I'd love to hear about your experiences and suggestions. Bug reports and pull
requests are very welcome!

For next time...
----------------
This denormalization pattern scales well up the development stack. JSON serialization becomes
easy and fast when you don't have to bounce around populating object graphs. And it's easy, for example,
to use denormalized fields to populate nested Backbone JS models. More on that soon!
