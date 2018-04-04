+++
layout = "single"
menu = "main"
menuTitle = "API"
meta = "false"
title = "dzello.com API documentation"
weight = "45"

+++

{{< title >}}

The [Work](/work) page on this site and its subpages are built from data that I've assembled about talks I've given, articles I've written, code I've committed and more. The data lives in [Hugo data templates](https://gohugo.io/templates/data-templates/) and is formatted in [TOML](https://github.com/toml-lang/toml). Here's an example from [data/work/stats.toml](https://github.com/dzello/dzello-dot-com/site/data/work/stats.toml):

```toml
[[ github ]]
commits = 1030
year = "2017"

[[ github ]]
commits = 822
year = "2016"
```

The dzello.com API makes this data freely available in JSON format, without asking any boring questions about why someone would ever want to use it.

# API Overview

The API accepts HTTP GET requests and returns JSON.

## Authentication

There is none.

## Pagination

You won't need it.

<br>

# API Reference

## Work resource

```curl
GET https://dzello.com/work/index.json
```

The [work resource](/work/index.json) returns a JSON document that contains a key for each type of work that is available, e.g. `articles` or `talks`. Inside of each key, there is an array of items for that work type.

```json
{
  "activities": { ... },
  "articles": { ... },
  "jobs": { ... },
  "mentions": { ... },
  "podcasts": { ... },
  "projects": { ... },
  "stats": { ... },
  "talks": { ... }
}
```

## Work type resource

```curl
GET https://dzello.com/work/{work-type}/index.json
```

Each work type resource returns a JSON document that contains a key for that type of work, like `article` or `talk`. Inside of each key, there is an array of items for that work type.

```json
{
  "article": [{
    "date": "2017-03-01",
    "image_url": "/images/articles/algolia-elasticsearch-latency.png",
    "location": "StackShare",
    "location_url": "https://stackshare.io/",
    "title": "How Algolia Reduces Latency For 21B Searches Per Month",
    "url": "https://stackshare.io/algolia/how-algolia-reduces-latency-for-21b-searches-per-month"
  }]
}
```

Here's a table with each work type and information about its API endpoint:

{{< work-types-table >}}

{{< spacing-icon "wrench" >}}
