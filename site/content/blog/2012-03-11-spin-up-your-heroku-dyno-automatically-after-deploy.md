+++
categories = ["Technology"]
date = "2012-03-11T00:00:00Z"
title = "Spin up your Heroku dyno automatically after deploy"

+++

**See an update to this post with a more efficient solution [here](http://dzello.com/blog/2012/08/01/update-to-spin-up-heroku-dyno-automatically-after-deploy/)**.

Here's my *former* Heroku manual acceptance testing workflow:

1.  Finish some stories and commit them.
2.  `git push heroku master`
3.  Do other stuff while I wait for the deploy to finish. (darn those precompiling assets!)
4.  Eventually notice the deploy is complete.
5.  Visit `http://myapp.com/` in my browser.
6.  Put on some tea. Wait 1-2 minutes for the dyno to spin up.
7.  Eventually notice the app is up, and begin testing.

Minus the tea, Step 6 and its delay of step 7 seem the most regrettable. It'd be nice if the dyno started right when the deploy finished, and my first request (step #5) incurred no overhead.

Here's how to achieve that using a Heroku HTTP [deploy hook](http://devcenter.heroku.com/articles/deploy-hooks#http_post_hook) for a Rails application.

Note that I also recommend doing email deploy notifications to your team in this HTTP hook *instead* of the Heroku [email deploy hook](http://devcenter.heroku.com/articles/deploy-hooks#email) - read more below.

### Add a post-deploy-hook route to your Rails app

Heroku's deploy hook comes as a POST so you'll want a specific route to handle it.

First, write a spec, just like you would for any other action - right?

``` ruby spec/controllers/home_controller_spec.rb
describe "#post_deploy_hook" do
  it "should render successfully" do
    post :post_deploy_hook
    response.should render_template "home/post_deploy_hook"
  end
end
```

Run the spec, and it fails. Let's fix it. First, add the route. My route points to the `post_deploy_hook` action in my `HomeController`.

``` ruby config/routes.rb
post 'post-deploy-hook' => "home#post_deploy_hook"
```

In my `HomeController`, I'm simply declaring an empty method so that the corresponding template will render.

``` ruby app/controllers/home_controller.rb
def post_deploy_hook
end
```

Here's the simple template:

``` haml app/views/home/post_deploy_hook.html.haml
%blockquote
  If a post deploy hook fails when no one's watching, does it make a log entry?
```

I'm choosing to render a template here (with layout) so I can get the most initialization and caching possible out of this hit. Also, I have the potential to find out earlier if something goes wrong. For me this is preferable to just returning a `head :ok` from the hook.

Run your spec again, and it should pass. When it does, `git add` and `git commit` your changes like you normally would.

### Add the HTTP deploy hook to Heroku

Before pushing these changes to Heroku, register the deploy hook as follows:

```
heroku addons:add deployhooks:http url=http://myapp.com/post-deploy-hook -a my-app-name
```

Replace `myapp.com` with the location of your deployed Heroku application and `my-app-name` with the name of your app (if you have more than one).

To watch the hook happen, tail your Heroku logs before you start the deploy. You'll need [realtime tailing](https://addons.heroku.com/logging) enabled.

```
heroku logs --tail -a my-app-name
```

Now, deploy the app. Again, however you normally would; but for me and my enviroment it goes a little something like this:

```
git push heroku master
```

Review the log tail. Sometime after this log entry appears - "Deployed AF4C3D1 created by xxx@yyy.com" - you should then see this entry - "State changed from starting to up" - followed by output from the dyno booting and the standard web logging for the post deploy hook route you just wrote.

This is normally what would happen when the first web request comes in to your app. But here it's happening *immediately* after the deploy. Now, when you or your team go to start your acceptance testing, the web dyno will be hot and you won't have to wait at all.

### More Thoughts on Usage

In my post deploy hook, I generate email notifications to the team to let them know the environment is ready for testing. While Heroku features an [email deploy hook](http://devcenter.heroku.com/articles/deploy-hooks#email), the emails will go out before the dyno is hot. So if you have team members with itchy mouse fingers responding to their emails immediately, they'll click through just to see their browser spin. However, if you send the notification in the HTTP deploy hook, by definition your dyno is up and your app is ready! As an added benefit, this confirms your application's email service is working.

While I find this most useful deploying to a demo environment to improve workflow, it can be quite nice for production as well. In a low volume app (a few RPM), it might mean that the hook pays the price for the initial load so the first visitor doesn't have to.

Another potential use for the deploy hook is to prime and/or validate other services you might have. Send a request to your search engine to rebuild the index. Make an HTTP call to a dependent service. You get the idea.

### Limitations

If your application has multiple web dynos this technique will only spin up one of them. However, from the web hook you could dole out some EventMachine [HTTP requests](https://github.com/igrigorik/em-http-request) to asynchronously spin up other dynos from the first. Since Heroku uses [Thin](http://code.macournoyer.com/thin/), using em-http-request works with no extra setup.

### Conclusion

Good luck! Drop a line in the comments if you have any tips, tricks, or troubles.
