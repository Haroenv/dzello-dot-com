+++
categories = ["Technology"]
date = "2016-03-10"
title = "A Crazy introduction"
image = "blog/memex-vannevar-bush.jpeg"

+++

I started building an app a few months ago. It’s called Crazy. Crazy helps you get knowledge out of your head and into a place where you can actually start to work with it. It’s an ideal tool for anyone who needs to tame large amounts of unstructured information — authors, researchers, journalists, engineers, designers, students, or teachers. But it’s so fast and minimal that you‘d be happy using it just to take notes.

## Inspirations

Here are a few people who had really smart things to say about organizing knowledge. Their wisdom (and many others) pushed me over the line to actually start working on this thing.

Robert Pirsig, known for writing *Zen and the Art of Motorcycle Maintenance:*

> *"When information is organized in small chunks that can be accessed and sequenced at random it becomes much more valuable than when you have to take it in serial form."*
> — Robert Pirsig from Lila: An Inquiry Into Morals

Computer pioneer Vannevar Bush, whose hypothetical assisted-thinking machine *The Memex* went on to inspire the hyperlink and the World Wide Web:

> *"When data of any sort are placed in storage, they are filed alphabetically or numerically, and information is found (when it is) by tracing it down from subclass to subclass. It can be in only one place, unless duplicates are used; one has to have rules as to which path will locate it, and the rules are cumbersome. Having found one item, moreover, one has to emerge from the system and re-enter on a new path.*

> *The human mind does not work that way. It operates by association. With one item in its grasp, it snaps instantly to the next that is suggested by the association of thoughts, in accordance with some intricate web of trails carried by the cells of the brain. It has other characteristics, of course; trails that are not frequently followed are prone to fade, items are not fully permanent, memory is transitory. Yet the speed of action, the intricacy of trails, the detail of mental pictures, is awe-inspiring beyond all else in nature."*

> — Vannevar Bush, [As We May Think](http://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/), 1945

Here's a rendering of the Memex from *LIFE Magazine*, 1945.

![A rendering of the Memex from *LIFE *magazine, 1945](/images/memex-vannevar-bush.jpeg)

## Preview

Crazy helped me write this post by pulling together information I’d been collecting over the past few days. Here’s a screenshot of the interface:

![](/images/crazy-sherlock-holmes.png)

On the left side is a series of fragments (called *ideas* in Crazy’s parlance). Only ideas that contain the text "crazy intro" are shown in the list thanks to filtering done by the search box. (The project *Research — Information* may contain many more ideas what is shown.) The currently active idea is *Sherlock Holmes’ Index* which occupies the large center area of the screen. Rich text editing is done with a floating toolbar, just like here on Medium. On the right side are details about the idea like when it was updated, how many words it is, and if it can be accessed via a shareable link or not.

The interface is very basic right now because most of the development has focused on internals and features that you can’t see but I assure you are very important :) Like working offline and sync’ing reliably when you come back online. And multi-user collaboration without the risk of overwriting data. And for staying fast and reliable even if you’ve added thousands of ideas. One way to think about Crazy is that it’s a text-editing tool built by a person who is used to working with highly structured computer code. Features like sync, versioning, multi-author collaboration and scalable performance are essential.

But one feature is more important than all of those combined: it should make you feel good about writing. It should invite you into a conversation with knowledge warmly and without friction every time. It should get out of your way and allow you to define your own creative process. It should feel personal and intimate. My mental model is *personalized electronic stationary with superpowers*.
