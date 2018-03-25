+++
categories = ["Technology"]
date = "2012-11-21T00:00:00Z"
title = "Live-stream system audio from OSX Mountain Lion with Icecast2 and Darkice"

+++

To share both music and announcements, [party.io](http://party.io) uses [Play](https://github.com/play/play) from Github. Play is an 'employee-powered iTunes-based client-driven distributed music server for your office'.
Our company DJ (a big-hearted, chrome-plated [hubot](http://hubot.github.com/)) manages Play and occasionally accepts submissions from the team.

Play syncs the company song queue, but a streaming audio server is still needed to stream what's playing. There are products that do this; [Nicecast](http://www.rogueamoeba.com/nicecast/) is one.

You can also build an open-source frankenstack for free. It's *just* four pieces: [Soundflower](http://cycling74.com/products/soundflower/), [Jack](http://jackaudio.org/), [Darkice](http://darkice.org/) and [Icecast](http://www.icecast.org/).
This post explains how to put these pieces together.

While it's a little more work, the outcome is the ability to stream **system audio** anywhere.
This makes more scenarios possible and it requires less maintenance - there's no
requirement to add media files in advance or to configure any applications.

### Before starting
You'll need the latest compiler installed, whether via XCode or the OSX Mountain Lion Command Line Tools installation at [http://connect.apple.com/](http://connect.apple.com/) (recommended if you don't need all of XCode). You'll need to be somewhat comfortable with working on the [command line](http://en.wikipedia.org/wiki/In_the_Beginning..._Was_the_Command_Line).
Make sure you have [Homebrew](http://mxcl.github.com/homebrew/) installed. And make sure to run `brew update` before beginning, and `brew doctor` if anything goes wrong along the way.

### Installation: Soundflower
Soundflower is an inter-application audio routing utility. Soundflower creates additional audio devices that bind to applications to send and receive audio.
Soundflower also comes with a program called Soundflowerbed. It lets you listen to audio locally even while broadcasting, like a splitter. Here's what the Soundflowerbed menu bar app looks like:

![Soundflowerbed](/images/soundflowerbed.png "Soundflowerbed and JackRouter in the menu bar")

[Download Soundflower here](http://cycling74.com/soundflower-landing-page/) and install it. Homebrew doesn't have a Soundflower formula AFAIK, but thankfully there's nothing tricky to this installation.

Once you've restarted we'll install the next component, Jack.

### Installation: Jack
Jack is a professional quality audio tool that can also route audio between applications.

Jack had problems initially with Mac OSX 10.7.3+, but a beta version seems to have worked the bugs out. Neither the Homebrew formula nor the latest download on [jackosx.com](http://www.jackosx.com/download.html) have the new code, but you can find it on the Jack-OSX Yahoo group.

There's a link to the 0.90b8 beta package on [this thread](http://tech.groups.yahoo.com/group/jackosx/message/3945). Download and install it, restarting when necessary.

Next, start the Soundflowerbed app (in /Applications/Soundflower) and choose the 'Audio Setup' option from the menu bar icon it installs. This will launch the System Audio Midi Setup menu. Set both input and output to Soundflower (2ch), like in the image below. Also make sure the volume is up.

![Audio Midi Setup](/images/audiomidisetup.png "Audio Midi Setup")

Now we can start Jack as follows:

``` bash
➜  ~  jackdmp -d coreaudio
jackdmp 1.9.9
Copyright 2001-2005 Paul Davis and others.
Copyright 2004-2012 Grame.
jackdmp comes with ABSOLUTELY NO WARRANTY
This is free software, and you are welcome to redistribute it
under certain conditions; see the file COPYING for details
JACK server starting in realtime mode with priority 10
Input channel = 0 ==> JACK input port = 0
Input channel = 1 ==> JACK input port = 1
JACK output port = 0 ==> output channel = 0
JACK output port = 1 ==> output channel = 1
CoreAudio driver is running...
```

Jack will now be running and can pass audio from Soundflower into our next component, Darkice.

### Installation: Darkice
Darkice is a live audio streamer. In our setup, it's responsible for encoding the audio from Jack (into MP3, Ogg Vorbis, et. al.) and sending it to Icecast.

We'll install Darkice with Homebrew but this gets a little weird. Darkice has a dependency on Jack, but Homebrew doesn't
know we've already installed Jack through another means. So we have to install a 'dummy', unlinked Jack so Homebrew
thinks the Jack dependency is satisfied but Darkice builds against the downloaded Jack and not the Homebrew Jack (this is essential).

Run this command:

``` bash
brew install darkice --use-llvm   #ignore the linking warnings for Jack - Darkice must complete without Jack linked!
```

During this process Jack will fail to link and issue a warning but the script will still continue. This is good, because Darkice will then build against the downloaded Jack. If things blow up which installing dependencies, install without the llvm flag and then retry this again. The goal is just to get the Jack-failed-link and the Darkice build in the same step.

### Installation: Icecast
Icecast is the web-serving layer of our stack, accepting incoming client connections and then broadacsting out the stream it receives from Darkice.

Install Icecast with Homebrew.

``` bash
brew install icecast
```

### Running Icecast and Darkice
We need a config file for Icecast: download this sample [icecast.xml](/images/icecast.xml) I've put together for this tutorial into `~/.icecast.xml`. Now we can start Icecast:

``` bash
icecast -c ~/.icecast.xml
```

We also need a config file for darkice: download this sample [darkice.cfg](/images/darkice.cfg) into `~/.darkice.cfg`. Once you have it saved, let's start Darkice:

``` bash
darkice -c ~/.darkice.cfg
```

We can now check our status by logging into Icecast's administration UI. Go to [http://localhost:8000/admin/](http://localhost:8000/admin/) and enter the admin-user and admin-password from the icecast.xml config file. You should arrive at the admin page:

![Icecast Admin](/images/icecast.png "Icecast")

And you should see an area below that shows the active mount point, created by Darkice:

![Icecast with Darkice mount](/images/dubspin.png "Icecast mount")

### Testing with a client
Now, head over to another computer on your network, or your smartphone, and head for to the streaming address we've set up. The URL should look something like this:

```
http://computer.local:8000/spin
```

Substitute 'computer.local' for the hostname or IP address of your computer. 'spin' is the name of the mountpoint we specified in darkice.cfg (and 8000 the port).

Paste the URL into Safari on Mac or iOS and you should get playback in iTunes / iOS Quicktime respectively:

![Streaming from iTunes](/images/itunes.png "Streaming on iTunes")
<img src="/images/iphone.png" style="width: 190px" alt="Streaming on iPhone">

Now you, your team, or the whole Internet can listen to your music, broadcasts, and the output of the command [say](http://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/say.1.html)! Flex the golden pipes!

### Configure your router
You won't be able to access your streaming server from outside your home network unless your open the appropriate ports on your router. In this example, you'd open port 8000. Your router's instruction manual can you tell you how.

### Bonus Gist
If you get it all to work, you might want to run these programs in the background and on startup. I wrote up a few basic plist files to be used with launchd that do just that. You can find them in [this gist](https://gist.github.com/4126599).

### Thanks
Thanks to the creators of all of these fine tools and the author of this article: *[Broadcasting music to multiple speakers](http://www.dudek.org/blog/140)*.
