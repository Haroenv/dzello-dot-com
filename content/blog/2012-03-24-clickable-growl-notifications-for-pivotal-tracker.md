+++
categories = ["Technology"]
date = "2012-03-24T00:00:00Z"
title = "Clickable Growl Notifications for Pivotal Tracker"

+++

When your team is greasing through the Pivotal Tracker backlog - adding/updating/finishing multiple stories a minute leading up to that big release - you get a sense for the value that Tracker's real-time web interface offers.

The real-time component affords the conversations that need to take place to avoid all manner of confusion, story duplication, double-starts (a.k.a. *2 Developers 1 Story*), priority mix-ups, etc.

However, in my workflow, I'm not always in front of the Tracker web client. So to stay in the loop, I've been using [kilt](https://github.com/dcrec1/kilt) to get Growl notifications about Tracker activities.

kilt pulls your Pivotal Tracker [activity feed](https://www.pivotaltracker.com/help/api?version=v3#get_all_activity) every 30s or so, and notifies you about new items using Growl, Snarl, or libnotify depending on your platform.

I recently took the time to fork kilt and add a few new features to streamline my workflow.

### My Fork

This is my [fork of kilt](https://github.com/dzello/kilt). __The features added in this fork__:

* On OSX, clicking the Growl bubble before 10s will open the related Tracker story in the browser. I've found this greatly improves the workflow when you need to respond to a notification.
* A Pivotal Tracker story 'author' can be specified at installation to skip notifications from - namely you. Specify your exact Pivotal Tracker name (not username). Without this, you get all the notifications of actions that YOU did - very tedious.

To install, download this [pre-built gem](/gems/kilt-0.5.1.gem) I created and

    gem install /path/to/kilt-0.5.1.gem

After you've installed, run the initialization script and then the process itself:

    kilt-install MYPIVOTALTRACKERAPITOKEN "My Tracker Profile Name"
    kilt-app

Make sure to substitute your values for the token and the name. Find further instructions at the [original README](https://github.com/dcrec1/kilt/blob/master/README.textile).

### Notes

Right now, due to a [bug in growlnotify](http://groups.google.com/group/growldiscuss/browse_thread/thread/9b5af76d3c1667d9), you have to click the notification *within 10s* to actually have a browser window open for the story. Thankfully, it looks like this bug will be fixed when Growl 1.4 drops.

I tried hard to get this to work using [GNTP](http://www.growlforwindows.com/gfw/help/gntp.aspx) (including with [ruby_gntp](https://github.com/snaka/ruby_gntp) and [groem](https://github.com/ericgj/groem)). However, on OSX I could not get the handling of the click of the notification to actually trigger, despite many attempts. If you have GNTP w/ callbacks working somewhere, I'd love to see the code!

A big thanks to [Diego Carrion](http://www.diegocarrion.com/) for making kilt!
