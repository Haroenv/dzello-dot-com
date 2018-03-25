+++
categories = ["Technology"]
date = "2012-01-01T00:00:00Z"
title = "Updated: Spin up your Heroku dyno automatically after deploy"

+++

In March I had [written](http://www.dzello.com/blog/2012/03/11/spin-up-your-heroku-dyno-automatically-after-deploy/) about using a [Heroku deploy hook](https://devcenter.heroku.com/articles/deploy-hooks) to ensure your application's dyno(s) spin up immediately after a deploy. It's a simple hack, but it can save you a few seconds each time you hit a newly-deployed build.

[Keith Rarick](http://xph.us/), a product manager at Heroku, reached out to me shortly after and suggested an easy way to achieve a similar effect while also being more resource-conscious.

### Dynos and deploys

Heroku's deploy/dyno heuristic works like this - the number of dynos running pre- and post-deploy remains the same. If you deploy to an environment w/ 0 active dynos, 0 will be spun up after the deploy. If you deploy to an environment w/ active dynos, each dyno is restarted after the new code is picked up.

So, if we want at least 1 dyno to be live post-deploy, we need at least 1 dyno to be running when we deploy. To ensure that, we can simply hit the application right before or during the deploy, ideally via an automated step. So choose your favorite method - a git hook, a shell script, etc - and fire it when you deploy.

While the deploy hook also ensures an active dyno, it does so indiscriminately for every deploy - it happens regardless of whether anyone's actually planning to use the environment thereafter. For example, your CI might automatically deploy any commit for which tests pass, even if no one's waiting to acceptance test.

The local hook approach lets you choose on a per-deploy basis if you'd like to ensure a running dyno. Ultimately that's more flexible and efficient.

### Cleanup

If you decide to switch to the local script/hook method, make sure to remove your existing Heroku HTTP deploy hook.

    heroku addons:remove deployhooks:http

(You'll also want to remove the route formerly handling the hook from your app.)

### Fin

A big thanks to Keith for the explanation and taking the time to reach out. I've found my workflow to be just as good and I'm happy to avoid using resources I don't need.
