+++
categories = ["Technology"]
date = "2017-06-09"
image = "talks/josh-dzielak-ossat-2017.jpg"
imageCaption = "Speaking at Open Source Show & Tell in San Francisco"
title = "Scale community support by webhooking the things"

+++

I gave a talk at [Open Source Show and Tell 2017](http://opensourceshowandtell.com) about how Algolia automates the flow of information between Discourse, Slack and our primary support tool HelpScout. Big thanks to everyone who came and to [Justin Johnson](https://taco.computer/) for organizing the event. The video, transcript and slides continue below.

{{< vimeo 223525087 >}}

Hello and thank you for coming. My name is Josh Dzielak and I am a Developer Advocate at [Algolia](https://algolia.com/). Developers use Algolia's API to create search features for their websites and mobile applications.

Inevitably, some of those developers get stuck. They hit a wall.

![slide](/images/ossat-slides/file-page2.jpg)

Sometimes they can't find an answer in documentation, Google or StackOverflow. What they need is to talk to a human. They need to start a conversation.

![slide](/images/ossat-slides/file-page3.jpg)

At scale, when your API or developer tool is being used by thousands of developers, that’s a lot of conversations. That’s far too many for one team of developer advocates and evangelists to handle.

But this is where community support comes in. Community can scale conversations.

![slide](/images/ossat-slides/file-page4.jpg)

Community-based support is a great way to address the needs of a large, heterogenous group of developers, for whom paying for private email or 1:1 support doesn’t make sense.

But even scaling that can be tricky. You have to be involved a lot up front to get it to scale on its own someday. That's what I'm going to talk about today. I’ll tell you the tools and processes we have in place at Algolia to scale our community using a combination of humans, webtasks and webhooks.

Back in December, we launched a [Discourse](https://discourse.org/) forum.

![slide](/images/ossat-slides/file-page5.jpg)

Why December? We'd grown a lot in the last year and we were starting to feel some growing pains in our email support process. We had a lot of developers coming from our new integrations - WordPress, Magento, Shopify and Zendesk - and they needed a lot of support.

The forum helped us scale support for these developers and help ensure their success. In the last 6 months, we’ve had over 200 topics and 1500 posts created.

![slide](/images/ossat-slides/file-page6.jpg)

Doing this support on the forum is great - it creates content and again it lets people help each other. Discourse is a great example of how we’re using an open source project to scale our community.

But we’ve also had to build a variety of tools to help us manage Discourse and to connect everyone at Algolia to it. A forum has to be integrated deeply into where your team is living throughout the day like Slack. A forum cannot be an island.

![slide](/images/ossat-slides/file-page7.jpg)

Don’t make your forum an island or your community members will drown or get eaten by Internet sharks. Plug the forum into everything that you do. Automate as much as you can.

At Algolia, we use a variety of open source tools and APIs to connect Discourse and StackOverflow into our [Slack](https://slack.com/), and also [Keen IO](https://keen.io/) analytics and automation. Here’s a look at the full stack of tools we’re using.

![slide](/images/ossat-slides/file-page8.jpg)

Discourse has webhooks and StackOverflow has RSS feeds, which we consume with [Zapier](https://zapier.com/).

Every time a topic, post or users is created on our Discourse instance, it calls a webhook that we're hosting on [Auth0's](https://auth0.com/) excellent [webtask](https://webtask.io/) framework.

That webhook takes all the attributes we're interested in and logs an event to Keen IO. We put that data on a dashboard that we monitor over time.

![slide](/images/ossat-slides/file-page9.jpg)

Today I want to introduce a new open source repository that was extracted out of the code we used to build that dashboard.

![slide](/images/ossat-slides/file-page10.jpg)

[vue-keen-dashboards](https://github.com/algolia/vue-keen-dashboards) comes with a lot of things. Authentication-ready with Auth0, which you can use to make it so only members of your Google apps domain can log in. [Hugo](https://gohugo.io/) is used as the static site generator so you can add new pages with ease. The project comes ready to deploy to [Netlify](https://netlify.com/). The Keen IO [point-and-click explorer](https://github.com/keen/explorer) is baked in so you can make charts on the fly. All instructions on how to do this are included in the repository.

So that’s one open source project that’s available to you today. Now, let’s talk about one more. It’s great that Discourse can emit webhooks, but you have to write a lot of code to process them and then trigger actions downstream. We’ve already done a lot of that work at Algolia, so we figure, why not open source it? So this is [discourse-webhook-collector](https://github.com/algolia/discourse-webhook-collector).

![slide](/images/ossat-slides/file-page11.jpg)

discourse-webhook-collector deploys to Auth0’s webtask framework and then catches webhooks coming from Discourse. From there, it can send them to Slack, HelpScout, Keen IO and a variety of other services. It takes care of inconsistent or missing JSON coming from Discourse webhooks so that your downstream events have all the context that you need.

Do you like to work on open source? Does the idea of doing engineering to meet the needs of a community sound exciting to you? More importantly, do you love cheese?? Well, Algolia is hiring developer advocates and developer community managers!

![slide](/images/ossat-slides/file-page12.jpg)

We're hiring in San Francisco, Paris, New York, Atlanta and remote for some roles. Check out our careers page to learn more.

I want to thank our hosts Keen IO, Github, Google, Microsoft and wish all of you a wonderful rest of the day at Open Source Show and Tell. Thank you.

![slide](/images/ossat-slides/file-page13.jpg)
