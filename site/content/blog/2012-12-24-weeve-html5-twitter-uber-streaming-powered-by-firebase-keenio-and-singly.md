+++
categories = ["Technology"]
date = "2012-12-24T00:00:00Z"
title = "weeve - HTML5 Twitter uber-streaming powered by Firebase, Keen IO, and Singly"

+++

![weeve logo](/images/weeve.png "weeve logo")

#### Update: weeve has been retired, but the [Keen](https://keen.io) and [Firebase](https://firebase.com) APIs allow you to build more apps just like it :)

Ever wish you could trade Twitter timelines with someone for a day? Or just a few minutes?

weeve goes one step further, allowing groups of Twitter users to combine their timelines to create an **uber-timeline**.
Try it out - join the weeve at http://weeve.dzello.com/.

I created weeve in 2 days over the winter holiday as a fun way to get hands-on with some new tech.
My goals for weeve were:

* to play with some APIs I'd been hearing a lot about
* to build a server-less app using a [Backend-as-a-Service](http://en.wikipedia.org/wiki/Backend_as_a_service)
* to open-source the project for others to benefit from
* to build something useful that could help people discover new content on Twitter
* to distract me lest I consume hordes of delicious holiday foods

All but one of those goals was accomplished. :)

In this blog post I'll talk about how weeve works and APIs that made it possible.

### The API's

These APIs, and the companies behind them, are doing great things. It's no coincidence
I chose them to hack on. Here they are, including a brief summary of what they do in (mostly) my own words.

##### **Firebase** - [https://firebase.com/](https://firebase.com/)

Firebase provides data storage that's directly and securely accessible from the browser.
With Firebase, you lay out your data hierarchically, then bind clients to changes
that happen at individual nodes. The unification of messaging locations and data
is intuitive and powerful. And the JavaScript SDK is a pleasure to work with. The
Security API has a learning curve, but it's a unique take on a important problem for
server-less development - definitely worth spending the time to pick up.

*Example code, taken from [writing data](https://www.firebase.com/docs/writing-data.html) in the Firebase docs:*

``` javascript
// First we get a reference to the location of the user’s name data:
var nameRef =
  new Firebase(
    'https://SampleChat.firebaseIO-demo.com/users/fred/name');

// And then we write data to his first and last name locations:
nameRef.child('first').set('Fred');
nameRef.child('last').set('Swanson');
```

##### **Keen IO** - [https://keen.io/](https://keen.io/)

Keen IO does analytics by API. It's a developer-friendly solution that solves both problems -
collecting event data and looking at event data. Recently, Keen IO released
a [JavaScript Visualization API](https://keen.io/docs/clients/javascript/usage-guide/#analyze-and-visualize-data)
that lets you draw charts & graphs with just a few lines of code.

*Example code, taken from weeve:*

``` javascript
// Draw a pie chart in just 2 function calls!
new Keen.Metric("tweets", {
  analysisType: "count", groupBy: "source_screen_name"
}).draw($("#top-weevers")[0], {
  showLegend: true, title: "Top weevers today"
})
```

##### **Singly** - [https://singly.com/](https://singly.com/)

Singly is the intelligent, unifying proxy for social network APIs you asked Santa for this year.
Singly already has support for over 35 services. One thing I love about Singly is that [their APIs](https://github.com/Singly/hallway)
are open source.

And if that wasn't enough, Singly is also behind [The Locker Project](http://lockerproject.org/), which has the bad-ass
mission of making it possible for you to keep track of the mountains of personal data you spread around the nets.
It's like insurance for the next time this happens: ["All Online Data Lost After Internet Crash"](http://www.theonion.com/video/breaking-news-all-online-data-lost-after-internet,14148/).

*Example code using the [profile](https://singly.com/docs/profiles) Singly endpoint:*

``` javascript
// Retrieve a user's unified profile
$.getJSON("https://api.singly.com/profile"),
  { accessToken: "HOHOHO" },
  function(profile) {
    alert("Would "  + profile.name + " like some fruitcake?")
  }
)
```

### Special mentions

The following services and libraries are also used by weeve.

##### **Twitter** - [https://twitter.com/](https://twitter.com/)

When people say 'the twitters' they really just mean Twitter.

##### jQuery, Bootstrap, Backbone, twitter-text, socket.io, CDNJS & more

Get the full list on the Github [README](https://github.com/dzello/weeve#credits--acknowledgements).

### How weeve works

weeve has no server. weeve is just an HTML page, a JS file, and a CSS file.
You can deploy weeve under to any static web server like Apache and nginx, or to [Github Pages](https://pages.github.com/).

Despite being flat, weeve has a host of features that traditionally require a server:

* OAuth Authentication

  Singly proxies the OAuth conversation with Twitter. Then, Singly creates a Firebase
  authentication token and hands it back to weeve as a location fragment.
  The weeve Backbone router uses the token to establish a faux 'session' backed by localStorage, so
  the authentication persists across page refreshes.
  Read more about this flow here - [Firebase Authentication Setup](https://singly.com/docs/firebase) and [here](https://www.firebase.com/docs/security/nodejs-token-generator.html).

* Central data storage

  Firebase is used to store data in a way that's accessible to all clients, yet still secure. User A cannot tamper
  with User B's data, etc. See the weeve [security rules](https://github.com/dzello/weeve/blob/master/firebase-rules.json)
  JSON definition to see what's defined.

* Shared messaging layer

  Clients get notifications about what's going on by binding to Firebase data references.
  Everything happens in real-time and neatly stays in sync. weeve uses Firebase 'on' bindings to
  reflect the presence of users and to add tweets to the **uber-timeline**.

* Analytics

  Application events are logged to Keen IO via their [Javascript SDK](https://keen.io/docs/clients/javascript/usage-guide/).
  weeve uses the combined Keen IO SDK to get event logging and metrics/visualization all in one package. The
  event logging piece is also [available separately](https://keen.io/docs/clients/javascript/usage-guide/#install-guide).
  The SDK lets you define metrics, including timeframes, intervals, and group-by, and then makes it easy to represent the metric
  as a number, pie chart, or line graph.

  weeve uses Keen IO to display who's contributing the most tweets (pie chart), how many total weevers there are (number),
  and recent tweet volume as a series (line graph).

* [Twitter's Streaming API](https://dev.twitter.com/docs/streaming-apis)

  weeve uses the [user stream](https://dev.twitter.com/docs/streaming-apis/streams/user) endpoint of
  the Twitter streaming API. Tweets appear instantaneously; as in the instant someone pushes 'send'. It's quite thrilling.

  (I did have to write a 40-line node.js [twitter streaming proxy](https://github.com/dzello/twitter-stream-proxy) to
  make the streaming API accessible from the browser. In the future, I hope Singly's experimental
  [push support](https://singly.com/docs/push) can replace the proxy!)

### Get the code

weeve is open source. You can read the annotated source code and learn how to host your own weeve(s)
on Github at [dzello/weeve](https://github.com/dzello/weeve).

If you're looking to build something with one or more of these APIs, definitely check out the repo - there's
a good chance you might find a relevant example of something you'd like to do.

[weeve.js](https://github.com/dzello/weeve/blob/master/www/weeve.js)
is the main (and only!) JavaScript file. I've added lots of comments and taken extra care to lay the code out
in a way that's easy to follow.

### Conclusion

I'm very happy with the way things turned out. I started with quite a few unknows and estimated at least
a few unsightly hacks would be required to get it all working.

The streaming proxy was the only 'hack' required. I think that says a **lot**
about the feasability of these API's for pure-client-side development and the
readiness of backend-as-a-service providers for real-world HTML5 apps.

weeve is only a few hundred lines of JavaScript. And of that maybe 100 lines aren't 'boilerplate'.
Needing just 100 lines of 'reasoned' code to get this feature set is *mind-blowing*.

And what's positively *mind-altering* is that there's no server to scale,
deploys are sub-second (`cp` baby), and the heavy lifting is distributed across the browsers of your users and
your API providers. Quite literally, I'm already thinking about new domains this topology can be applied to.

Overall, I'm excited to see what other apps & patterns emerge as developers consider 'staying off the server'.
