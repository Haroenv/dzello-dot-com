+++
categories = ["Technology"]
date = "2012-04-06T00:00:00Z"
title = "Auto-troll your app: a Ruby client for TrollemIpsum"

+++

I found [TrollemIpsum](http://trollemipsum.appspot.com) yesterday. Now I'm using it to generate my fixture data and generally auto-troll the applications.

I'm releasing a simple Ruby API client for TrollemIpsum so you can too.

If you spend most of your development day trolling instead of coding, this might save you a lot of time you can use to do more trolling.

### Usage and Examples

One-liner:

    TrollemIpsum.lorem
      # => "Flash sucks, during delay in getting Ice Cream Sandwich what gorgeous."

Filter options per client:

    troll = TrollemIpsum.new(["confident"], ["siegler"])
    troll.lorem
      # => "It’s not good for Google I believe fingergate finally pure bullshit..."

Filter options per call:

    troll = TrollemIpsum.new
    troll.lorem("gruber")  # => "Steve Jobs in my opinion baseball."

### Installation

Rubygems:

    gem install ruby_trollem_ipsum

Bundler:

    gem 'ruby_trollem_ipsum'

Source Code: [ruby_trollem_ipsum](https://github.com/dzello/ruby_trollem_ipsum) on Github.

Trollem Ipsum API Docs: [http://trollemipsum.appspot.com/api.json](http://trollemipsum.appspot.com/api.json)

### Error messages

*Reason*: All the reasons

*Message*:

```
trololololololololol
```

### Credits

Thanks to [@davidmoss](https://twitter.com/davidmoss) and [@patrickhmason](https://twitter.com/patrickhmason) for creating TrollemIpsum!
