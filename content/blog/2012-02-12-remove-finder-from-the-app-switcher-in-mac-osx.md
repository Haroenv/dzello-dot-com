+++
categories = ["Technology"]
date = "2012-02-12T00:00:00Z"
title = "Remove Finder from the Application Switcher in Mac OSX"

+++

When I'm doing web development, I typically only have 2 Mac Applications running - [iTerm2](http://www.iterm2.com) and a Web Browser.

My workflow calls for jumping between them frequently. Thankfully, the `Command+Tab` OSX shortcut makes switching applications mouse-free and efficient. I mean, if Tim Ferriss [is doing it](https://twitter.com/#!/tferriss/status/165307280416456705)...

However, there's always another 'Application' lurking in the Application Switcher - the notoriously trollsome _Finder_. There may be no _Finder_ windows open, but it's still there. Watching. Waiting for you to unwittingly switch to it and start typing. *It has an insatiable thirst for keystrokes.*

<img src='/images/troll_finder.png' />

(Troll Finder image from [getterdragon](http://getterdragon.deviantart.com/art/Troll-Finder-255193612))

Worse yet, when you accidently switch to Finder and no Finder windows are open, you are provided little feedback with which to spot your error. _Finder_ will become the app name at the top left of your screen, and both your browser and terminal will be blurred (generally a subtle effect).

That's all you get. So you'll continue typing, believing you're focused on the app you want, and in fact your keystrokes are only whetting *Finder's* appetite.

Surprisingly, I could not find a clear and concise how-to post on to alter this behavior. So I decided to write one up here.

### 1. Change the Finder.app Plist

First, open the plist file that corresponds to Finder:

```
  sudo vi /System/Library/CoreServices/Finder.app/Contents/Info.plist
```

Note: the `sudo` is required for write access to the file, and substitute `vi` with the text editor you're most comfortable with.

Then add the following entry to the file you've opened:

``` html
  <key>NSUIElement</key>
  <string>1</string>
```

Anywhere in the top-level `dict` node of the file will work - here's an example of the new properties in the file:

<img src='/images/info_plist.png' />

Then save and quit; and make sure you don't get any readonly or permissions warnings. If you used `sudo`, you shouldn't.

### 2. Relaunch Finder

Next, relaunch finder by holding down `Option` and clicking on the Finder dock icon.

<img src='/images/relaunch_finder.png' />

Choose _Relaunch_. Wait a few seconds.

### 3. Enjoy a troll-free lifestyle

Your Application Switcher should no longer contain _Finder_. Jumping out of windows has never been safer.

<img src='/images/happy_finder.png' />

### Furthermore

Should you need to open a Finder window again, just perform a Spotlight search and choose "Show All in Finder".

Alternatively, you can use a pro-tool like [Alfred](http://alfredapp.com) to browse through folders. I prefer this method, and find Alfred to be the best in class. (My friend @dorkitude has a few extensions for it too, [find them on github](https://github.com/dorkitude/Alfred-Hacks).)

Update: Believing this dilemma to be fairly common (though sadly tolerated) among developers using OSX, I submitted this post to Hacker News - if any discussion ensues you can find it [here](http://news.ycombinator.com/item?id=3583246).
