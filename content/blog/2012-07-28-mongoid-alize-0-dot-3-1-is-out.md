+++
categories = ["Technology"]
date = "2012-07-28T00:00:00Z"
title = "Mongoid Alize 0.3.1 - unified API, polymorphic support, and increased flexibility"

+++

Today I released 0.3.1 of [Mongoid::Alizé](https://github.com/dzello/mongoid_alize).

**This is a breaking API update. I repeat, this is a breaking API update.** Learn about the update and how to upgrade on the github [README](https://github.com/dzello/mongoid_alize#changelog).

Reflections
-----------

This is a *huge* step for mongoid_alize. The unified API made code and concepts more approachable and enables a greater set of future features. At the same time, the exposed metadata and added hooks allow developers to build flexible solutions on top of alize that suit their specific needs. Learm more on the [README](https://github.com/dzello/mongoid_alize#changelog).

Denormalization as architecture
-------------------------------

Many of the changes in 0.3.1 were inspired by real world production usage at [party.io](http://party.io). Denormalization is a hard problem, especially as object graph complexity and application volume increases.

Our goal at party.io is to pull the complete object graph for any page or top-level resource - potentially containing multiple layers of nested models - out of our MongoDB database in just **1** lookup.  (Yes, we're speed freaks.)

Doing this requires that object graphs be fully denormalized within individual documents and kept in sync with the source-of-record of data for any nested denormalized model. The benefit ot this is miniscule read-latency for even complex resources - without requiring complex code, a caching tier, exposure to stale data, or complex/arbitrary-time-based expiry logic. In fact, with alize there's often no additional logic or code at all.

It's this capability that [mongoid_alize](https://github.com/dzello/mongoid_alize) seeks to provide - all while still keeping the API simple and the learning curve low.

Thanks to everyone who has given feedback or opened an issue so far. Keep it coming!
