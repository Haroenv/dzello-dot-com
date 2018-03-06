---
categories: ["Technology"]
date: 2017-06-12T00:00:00Z
description: The transcript and slides of a talk given by Josh Dzielak at DevXCon 2017
image: /images/devxcon-slides/file-page1.jpg
title: How to scale community support for APIs - DevXCon talk transcript
---

*These are the slides and transcript from a talk I gave at [DevXCon 2017](http://devxcon.com). Find the full PDF of the slides [here on Speakerdeck](https://speakerdeck.com/dzello/from-few-to-some-to-many-how-to-scale-community-support-for-apis).*

![slide](/images/devxcon-slides/file-page1.jpg)

Hello and thank you for coming. My name is Josh Dzielak and I am a Developer Advocate at [Algolia](https://algolia.com/). Developers use Algolia's API to create search features for their websites and mobile applications.

Inevitably, some of those developers get stuck. They hit a wall.

![slide](/images/devxcon-slides/file-page2.jpg)

Sometimes they can't find an answer using documentation, Google or StackOverflow. What they need is to talk to a human. They need to start a conversation.

![slide](/images/devxcon-slides/file-page3.jpg)

At scale, when your API or developer tool is being used by thousands of developers, that’s a lot of conversations. That’s too much for one developer experience or developer relations or customer success team to handle.

This is where community support comes in. Community is a great way to scale conversations.

![slide](/images/devxcon-slides/file-page4.jpg)

A community support program can address the needs of a large, heterogenous group of developers, for whom paying for private email or 1:1 support doesn’t make sense.

Many of us, as makers of APIs and developer tools, do offer some sort of community support for our free tier developers.

The question is - what do we mean by community support? How do we deliver on that at scale?

![slide](/images/devxcon-slides/file-page5.jpg)

That's what I'm going to talk about today. I’ll tell you what community support means at Algolia, the tools and processes we have in place to scale it, and how we use outreach to get more people involved.

First, we need to talk about what community support does not mean. Community support does not mean: "Good luck on the Internet!".

![slide](/images/devxcon-slides/file-page6.jpg)

Community support does not mean: "Ask your question on StackOverflow".

![slide](/images/devxcon-slides/file-page7.jpg)

StackOverflow is for programming questions only. That’s a small subset of questions related to APIs.

If too many non-programming conversations get asked on your StackOverflow tag, the mods will notice and ask you to stop.

This happened to us earlier this year, and we’ve since made it very clear on our StackOverflow tag wiki that non-programming questions should go on our Discourse.

![slide](/images/devxcon-slides/file-page8.jpg)

Unless you provide detailed information about how you support users on StackOverflow or 3rd party internet sites, you’re sending a mixed signal.

The reality is that many companies don't do a great job monitoring their StackOverflow tag or even their Github issues. Questions can remained unanswered for days. Because of that, expectations are low. Plus, if something goes wrong, if there’s a bad actor, there’s little you can do.

Fundamentally, unless you control the support site, you don’t control the developer experience.

If you want the most control over the end-to-end developer experience, than just like you host your own docs, you should host your own conversations.

![slide](/images/devxcon-slides/file-page9.jpg)

By creating and carefully maintaining a space for your community, it shows a true commitment. If you want the community to commit eventually, you have to commit first.

In December, Algolia launched our first wholly-owned community support space.

We chose [Discourse](https://discourse.org) to power it, because it is open source, deeply customizable, and it now has webhooks.

![slide](/images/devxcon-slides/file-page10.jpg)

What about timing? Why last December? We'd grown a lot in the last year, and we were starting to feel some growing pains in our email support process. We had a lot of new developers coming from our new integrations - WordPress, Magento, Shopify and Zendesk - and they needed a lot of support.

Just doing email support wasn’t going to change anything. What happens in email support, stays in email support.

![slide](/images/devxcon-slides/file-page11.jpg)

Email support doesn’t create content. It does not help deflect future tickets. It guarantees that you have to do the support - there's no potential community involvement.

Forum posts are content, and we now have over 80 topics and 400 posts on our [forum's WordPress tag](https://discourse.algolia.com/tags/wordpress).

![slide](/images/devxcon-slides/file-page12.jpg)

That's in just six months. And most importantly, we're starting to see questions be answered by our community members, not us.

When we think about making the leap from few to many active community supporters, the major KPI we need to look at is the % of questions answered by the community.

![slide](/images/devxcon-slides/file-page13.jpg)

You have to measure this and you need segmentation to find hot spots. We couldn’t find anything that did this out of the box.

So, we’ve built some of our own tooling to track activity and KPIs.

Here’s a look at our community tech stack.

![slide](/images/devxcon-slides/file-page14.jpg)

Discourse has webhooks and StackOverflow has RSS feeds which we consume with [Zapier](https://zapier.com).

Every time a topic, post or users is created on our Discourse instance, it calls a webhook that we're hosting on [Auth0's](https://auth0.com) excellent [webtask](https://webtask.io) framework.

That webhook takes all the attributes we're interested in and logs an event to [Keen IO](https://keen.io/), the analytics API. We put that data on a dashboard that we monitor over time.

![slide](/images/devxcon-slides/file-page15.jpg)

Here’s a look at one of our dashboards, built with Keen IO’s [responsive dashboard templates](https://github.com/keen/dashboards) library. This view shows new topics and new posts broken down by category. But we’re able to segment by dozens of variables beyond that.

It’s important to be able measure KPIs. Now let’s talk about how you move them.

![slide](/images/devxcon-slides/file-page16.jpg)

To start the long journey from few:many to many:many, we can start by increasing the number of the "few", making it a "some".

The best place to start recruiting more people into the "few" is from your company, especially your engineering team.

![slide](/images/devxcon-slides/file-page17.jpg)

You have to get the company involved in community support.

This will demonstrate the company's commitment to community support - no more mixed signals. It adds a lot more faces to the community, not just the developer advocates.

At Algolia, every new employee joins the forum as part of their onboarding.

![slide](/images/devxcon-slides/file-page18.jpg)

After joining, each employee introduces themself on an [introductions thread](https://discourse.algolia.com/t/welcome-please-introduce-yourself/36), which now has over 70 intros.

You have to keep employees engaged over time. To do this at Algolia, we built connectors from Discourse and StackOverflow into our [Slack](https://slack.com) & [HelpScout](https://helpscout.net)-based technical support process.

Here’s what it looks like in Slack when a new Discourse topic is created.

![slide](/images/devxcon-slides/file-page19.jpg)

We send a lot of information into Slack, including categories, tags and the member’s name and avatar. We can even click their email address to pull up any private support history.

Using the buttons in the message, a developer advocate can decide whether to send the question into Algolia’s technical support process. This is done with the “Dispatch” button.

If it’s not technical but does need to be addressed, an advocate can send it into a special shared HelpScout mailbox for community tasks. This is done with the “Community” button.

This workflow makes sure that all new topics get responded to, whether they’re about technical questions or not.

One more way that we encourage employees to be active in the community is ask them to do things they'd normally do in team emails on the forum instead. Event summaries are a great example.

![slide](/images/devxcon-slides/file-page20.jpg)

At Algolia, everyone who goes to an event does a summary. These used to be in email where all of you you can't see them. But now we ask our teammates to [post on our forum instead](https://discourse.algolia.com/tags/events), which makes them available to all, while giving public mention to our speakers and community members we interact with.

Getting the company involved in community support is essential, but it’s still just one part of the story. We’re still only at some:many. To get to many:many, we are going to need to do more. We're going to need outreach.

![slide](/images/devxcon-slides/file-page21.jpg)

Outreach means asking individual community members to respond to a question you think they might be able to answer, or read a thread they might be interested in.

Outreach is personal. Outreach is time-consuming. Outreach can be emotionally draining, you’re putting yourself out there every time you ask for help.

You need to build tools that make outreach less stressful. You need to build an outreach toolkit.

The first tool in your toolkit is not sexy, but it’s very effective. Templates.

![slide](/images/devxcon-slides/file-page22.jpg)

Create a template library for common requests that you’d like to make to community members. To answer a question, ask for participation, do an introduction.

We use HelpScout as a shared work queue for outreach. and HelpScout has templates which they call saved replies. They save us a ton of time.

The next tool you need in your outreach toolkit is search.

![slide](/images/devxcon-slides/file-page23.jpg)

Create a searchable database of your community members. Tag each by their location, programming languages, frameworks, and products they use.

I’d also recommend including an activity metric, so that you can avoid reaching out to inactive members or reaching out too frequently to others.

The next tool that you need in your outreach toolkit are incentives.

![slide](/images/devxcon-slides/file-page24.jpg)

Giving recognition and rewarding participation is essential for making the jump to many:many.

Create a set of standard incentives that are easy to offer and fulfill. If a user answer their first question, send them a t-shirt. If they answer their 10th, send them to a conference. The incentive should match their involvement level.

This brings me to my final point. There are many ways to do outreach. At Algolia, we use three principles to guide our decisions.

![slide](/images/devxcon-slides/file-page25.jpg)

Right person means choosing the appropriate person to get involved based on their skills, interests or location.

Right time means asking with an acceptable frequency. Not too often, but often enough to sustain an ongoing commitment.

Right incentive means over-matching contribution with recognition. Don’t be afraid to say thanks in a big way.

If you can learn how to good outreach without it taking too much of your time, I think you have the best chance of crossing the API community support chasm - the jump from few:many to some:many to many:many.

Thank you!

![slide](/images/devxcon-slides/file-page26.jpg)
