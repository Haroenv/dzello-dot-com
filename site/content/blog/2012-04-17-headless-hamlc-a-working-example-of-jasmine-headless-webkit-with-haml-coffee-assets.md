+++
categories = ["Technology"]
date = "2012-04-17T00:00:00Z"
title = "headless_hamlc - A working example of jasmine-headless-webkit with haml_coffee_assets"

+++

I've [written before](http://dzello.com/blog/2011/12/24/using-haml-coffee-assets-with-jasmine-headless-webkit/) about using [haml_coffee_assets](https://github.com/netzpirat/haml_coffee_assets) to add Haml Coffee templates into your Rails asset pipeline. And how to test these templates using [jasmine-headless-webkit](https://github.com/johnbintz/jasmine-headless-webkit).

I've watched and/or helped developers try to get these tools working together in their apps but it's been a little bumpy. Thankfully, the process just got easier.

Earlier this month jasmine-headless-webkit added support for registering [custom template engines](https://github.com/johnbintz/jasmine-headless-webkit/pull/111). It's now possible to plug in a templating engine like Haml Coffee - no fork required.

That said, there's still a little bit of leg work required to get the "ideal" setup going with jasmine-headless-webkit and haml_coffee_assets. For that purpose I created headless_hamlc - a template app that shows both technologies playing together nicely.

### headless_hamlc

Check out [headless_hamlc](https://github.com/dzello/headless_hamlc) on Github. Clone it, bundle it, and fire it up:

```
git clone git://github.com/dzello/headless_hamlc.git
```

The headless_hamlc README has more information, and the commit log shows you how the pieces came together.

Here's an exerpt from the README about what's in the app:

- A simple page to show you Ruby Haml and Haml Coffee rendering side by side
- Specs passing when running jasmine-headless-webkit
- Specs passing when mounted to `/specs` in the browser
- Shared haml_coffee_assets (HCA) configuration by browser specs/actual app and JHW runs
- The jasmine-headless-webkit spec_helper.rb that does the heavy integration lifting

### Credits

A huge thanks to [@johnbintz](https://twitter.com/johnbintz) for creating jasmine-headless-webkit and [@netzpirat](https://twitter.com/netzpirat) for creating haml_coffee_assets!

### Discussion

Leave a comment here or on [hacker news](http://news.ycombinator.com/item?id=3859970).
