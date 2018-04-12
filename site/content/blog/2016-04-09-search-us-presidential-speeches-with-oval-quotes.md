+++
categories = ["Technology"]
date = "2016-04-09T00:00:00Z"
title = "Search Presidential Speeches with Oval Quotes"
image = "blog/oval-quotes-home.png"
+++

[Oval Quotes](http://oval-quotes.dzello.com) is a mashup I made using data from [The Miller Center](http://millercenter.org) and search from [Algolia](https://algolia.com/). It's highly compact and lots of fun to play with.

The app lets you search over 500 historical speeches by US presidents. You can search by full-text keywords, like *gettysburg civil war*, and you can filter results to one or more presidents. The results are delivered as quote-sized chunks that you can copy, paste and share.

![Gettysburg Address on Oval Quotes](/images/oval-quotes-lincoln.png)

Because the search is powered by Algolia, Oval Quotes has a lot of nice features that didn't require me building them. Typo correction, highlighting search terms in results and faceting (filtering) are all handled automatically by the [Algolia API](https://www.algolia.com/doc) and the [instantsearch.js](https://community.algolia.com/instantsearch.js/) open source library. Check out [this screencast](https://www.youtube.com/watch?v=xZTNzNjwl3w) to learn more about how Oval Quotes was built. The [source code](https://github.com/dzello/oval-quotes) is up on Github.

Ready to try it out? Do know you how many presidents have mentioned [shoes](http://dzello.github.io/oval-quotes?q=shoes&hPP=25&idx=paragraphs&p=0&is_v=1)?
