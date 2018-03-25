+++
categories = ["Technology"]
date = "2014-01-10T00:00:00Z"
title = "Listen to your log files with aud"

+++

Today I am open sourcing a tool called *aud*. It's a concept I developed while working on distributed systems at [Keen IO](https://keen.io). *aud* helps me process log files aurally, without having to stare at tiny, fast-scrolling text all day.

The way it works is simple. You pipe text to *aud* on the command line, just like *grep*, and it'll emit a tone each time new input comes in. Here's an example that plays a middle C note for 10ms as each line of an http log is written:

```
$ tail -f access.log | aud -n C -d 10
```

Source code and detailed instructions are on Github at [dzello/aud](https://github.com/dzello/aud).
