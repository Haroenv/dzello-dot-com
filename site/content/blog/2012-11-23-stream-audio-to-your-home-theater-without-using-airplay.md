+++
categories = ["Technology"]
date = "2012-11-23T00:00:00Z"
title = "Stream Audio To Your Home Theater Without Using Airplay"

+++

I wrote a post earlier this week about [live streaming system audio from Mac OSX](http://www.dzello.com/blog/2012/11/21/live-stream-audio-from-osx-mountain-lion-with-icecast-and-darkice/).

My home theater is powered by a [Denon AVR-1912](http://www.amazon.com/gp/product/B004U403XQ/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004U403XQ&linkCode=as2&tag=looartblo-20).
One reason I chose this receiver is that supports Airplay directly. Over the last year it's become well-integrated with the rest of my chain. I can
control it via the [Denon Remote iPhone App](https://itunes.apple.com/us/app/denon-remote-app/id388608879?mt=8) or access it via a web interface:

![Denon web interface](/images/denon-web-interface.png "Denon web interface")

Because it has an HTTP interface, we can reverse-engineered wire traffic and build an API for it.
You can learn a lot creating API's this way and it's especially gratifying if the resulting integration becomes useful to you or someone else.

After a quick glance I can tell it'll be a snap to plug this Denon into [party.io](http://party.io/)'s 'Rabot' so it can control not only the playlist
stream but the actual Denon client playing the music. For example, to turn up the bass:

```
rabot prepare to DROP  #=> POST /ChannelLevel.asp?_subwoofer_offset=+10
```

### Airplay vs. Streaming server

The Mac OSX setup I wrote up still lets you send audio to Airplay targets - a huge bonus. But, then the audio ceases to reach line out.
You can't have both without more trickery, which to the perfectionist is *clearly* not acceptable. (And keeping in mind Windows users for whom Airport isn't an option.)

The ideal solution is to have the Denon consume the Icecast streaming audio feed, just like all of the other devices around the company.

Fortunately, this Denon has an Internet streaming radio capability. Unfortunately, I couldn't find anywhere to enter a custom URL for a radio station.
Things weren't looking good - but this only bolsters the will.

### Enter vTuner

On the Internet Radio options list there's an option labeled "radiodenon.com". It turns out this is a 3rd party integration with a platform
called [vTuner](http://www.vtuner.com/) - "The vTuner platform connects your Internet enabled product to the wide world of streamed music, talk, and video."
vTuner provides a logged-in user experience where you can add various radio stations as favorites. The favorites then appear on your Denon automagically.

For this to work, vTuner needs to support creating a new station that's not already in their directory. Thankfully it does!

### How to configure vTuner + Denon

* Find your Denon's MAC address per the [intructions here](http://www.radiodenon.com/setupapp/denon/asp/help/moreinfo_tt.asp?lngy=eng). Or just look at your router's DHCP table.
* Register for a Denon vTuner account at [www.radiodenon.com](http://www.radiodenon.com). This process is a little wonky. You'll actually first sign in
with the MAC Address of your Denon.

  ![vTuner Register](/images/vtuner-1.png "vTuner Register")

  Which brings me to:

  <p style="text-align: center">
  <img src="/images/mac-address.gif" style="width: 50%" alt="Mac Address">
  </p>

* Once you've created an account and logged in, choose the "Add Another Station" option by clicking the nearby Go button. You'll be taken to this screen:

  ![vTuner Add Station](/images/vtuner-2.png "vTuner Add Station")

* Enter the required fields and click 'Go'. The station URL is the URL to your streaming Icecast instance.

* Now that your station is added, your Denon should have it on the list. We'll use the web interface to check. To enter the web interface, just point a browser to your Denon's IP address.
You can find the IP by looking at system info on the unit or by looking at your router's client table.

* In the web interface, navigate to NET Audio/USB via the right-side boxes. Then choose Internet Radio. Then click the radiodenon.com option.

  ![Denon Internet Radio](/images/denon-1.png "Denon Internet Radio")

* You should be taken to this page (with your unique ID showing):

  ![Denon radiodenon.com](/images/denon-2.png "Denon radiodenon.com")

* Click the ID# option and you should see the radio station you created on vTuner - ours is called Spin Party. Click it to connect and start playing!

  ![Denon playing vTuner station](/images/denon-3.png "Denon playing vTuner station")

## Success

So there you have it - streaming system audio to your receiver or any of your Internet-savvy devices without requiring Airplay.
