+++
categories = ["Technology"]
date = "2011-12-24T00:00:00Z"
title = "Using haml_coffee_assets with jasmine-headless-webkit"

+++

[haml_coffee_assets](https://github.com/netzpirat/haml_coffee_assets) allows you to use [haml-coffee](https://github.com/9elements/haml-coffee) templates in the Rails asset pipeline.

[jasmine-headless-webkit](http://johnbintz.github.com/jasmine-headless-webkit/) runs your Jasmine specs comically fast - seriously. It supports Coffeescript and works great with Guard. It provides a nice CLI with debugging output while still giving you browser access at `/specs`.

Both of these libraries pack a powerful punch of development environment efficiency. However, they don't work together out-of-the-box.

### Integration milieu

Here's a little background about what's incompatible between the gems right now:

*  haml_coffee_assets (HCA) adds its Sprockets `.hamlc` (and `.jst.hamlc`) extensions in a Rails Engine initializer. In order to be fast, jasmine-headless-webkit (JHW) does not boot the Rails app (that'd be slow). Thus the `.hamlc` extension does not get registered and the HAML coffee templates are output raw into the test runner (causing syntax errors).
*  HCA also loads it's configuration settings in the initializer, and wants you to configure it with your Rails app in `application.rb`. Again, with the Rails-free JHW loading method, the settings won't get applied.
*  HCA needs you to require an ERB file, `hamlcoffee.js.coffee.erb`, into your asset pipeline. It's an `.erb` because it gets some dynamic behavior from configuration settings you can specify. JHW does not process dynamic templates, and again, it doesn't have access to the Rails-initializer-centric HamlCoffeeAssets config.

### My fork of jasmine-headless-webkit

Check out the source [here](https://github.com/dzello/jasmine-headless-webkit). The fork:

*  Allows you to use .hamlc with headless and browser-based jasmine-headless-webkit runs.
*  Allows you to configure HamlCoffeeAssets in one place. Your configuration will apply to your Rails app and jasmine-headless-webkit.
*  Compiles the hamlcoffee.js.coffee.erb using your configuration and puts it back into the asset pipeline for use by jasmine-headless-webkit. It removes the old .erb pipeline entry so you don't get a warning, too.

### Using the fork

First point your `Gemfile` to the fork and run `bundle install`.

``` ruby Gemfile
  gem 'jasmine-headless-webkit', :git => "git://github.com/dzello/jasmine-headless-webkit.git"
```

Then, add your HamlCoffeeAssets configuration into `config/haml_coffee_assets.rb` as follows. If you have existing settings they are probably in `config/application.rb`. Move those settings into here, and convert them to use traditional hash syntax.

``` ruby config/haml_coffee_assets.rb
module HamlCoffeeAssets
  class Engine < Rails::Engine
    # add your valid haml-coffee options to this hash
    APP_CONFIG = {
      :preserve => "textarea,pre,code" # formerly 'config.hamlcoffee.preserve = ...'
    }
  end
end
```

This exposes your config in a way that the JHW fork can find. Though it's worth mentioning that you will need to run JHW from your project root for the config file to be found and generally for this fork to work.

Now we need to tell your Rails app about the settings. Add the following to your `application.rb`, and remove any remaining HamlCoffeeAssets code.

``` ruby config/application.rb
  require Rails.root.join('config/haml_coffee_assets.rb')
  config.hamlcoffee.merge!(HamlCoffeeAssets::Engine::APP_CONFIG)
```

Lastly, make sure your javascripts manifest contains `hamlcoffee` at the top - just like you normally would.

``` javascript app/assets/application.js
  //=require 'hamlcoffee'
```

### That's it

You should now be able to run HAML Coffee Assets and Jasmine Headless Webkit together. Terse syntax + immediate feedback FTW!
