+++
title = "Migrating from Jekyll to Hugo to create a data-driven static site"
description = "I migrated my personal web site stack from Jekyll to Hugo and am using data files and shortcodes extensively"
date = "2018-03-18"
categories = ["Technology"]
draft = true
+++

I'm happy to say that [dzello.com](https://dzello.com/), my personal site and blog, is now built with [Hugo](https://gohugo.io/). I've always found stories about migrations and stack changes to be useful (and fascinating) and I'll share mine here.

## Why do the migration?

[Jekyll](https://jekyllrb.com/) is a great project and it served me well for a long period of time. But when it came time to expand my personal website into something bigger—a portfolio to help potential developer relations consulting clients get to know me and my work better—I wanted something with a more flexible content model. Jekyll is great for a blog with a few static pages, but for my new site I needed to create list and single-item pages for many different types of content. Hugo is designed for exactly that.

**Content model**: To Hugo, a blog is just another instance of its list + single-based based content model. What is a blog except for an paginated index of posts and a standalone page for each one? That's the Hugo perspective. You can have as many sections as you want, each with many different pieces of content, ordered however you like.

**Speed**: The rumors are true - Hugo is insanely fast. For my site, consisting of 91 pages, it builds in 296 milliseconds. Incremental builds are much shorter. Why do I care? At this speed, you can immediately see your changes reflect in the page as soon as you hit save. For someone who needs to edit a CSS file 50 times before my floats line up right, that's a huge time-saver.

``` shell
dzello-dot-com $ hugo

                   | EN
+------------------+-----+
  Pages            |  91
  Paginator pages  |   8
  Non-page files   |   0
  Static files     | 144
  Processed images |   0
  Aliases          |   6
  Sitemaps         |   1
  Cleaned          |   0

Total in 296 ms
```

For an example with much more content, check out the new [Smashing Magazine](https://next.smashingmagazine.com/) site, purportedly building 60,000 pages in 5 seconds.

**Data files**: Even though static site generators do a great job of separating *content* from *presentation* (i.e. Markdown files for content separate from HTML layouts), they don't always have a great answer for separating *data* from *content*. One thing that is easy to miss when moving from a traditional database-backed backend to a client-only static site is the ability to store rows and columns of data and use them to drive the presentation layer.

Often times, what should be data is treated as content. An example might be contact information that is copied and pasted across the site instead of kept DRY. Another example might be a table in a Markdown file that is frequently added to. Living in Markdown is ok if the data never needs to be queried or rendered in a different way, but once it does the pattern of storing it in Markdown breaks down.

For my new consulting site, I knew that I wanted to re-use content in a few different areas based on tags, so storing that data in Markdown or even in a partial would be too limiting. Hugo has the concept of data files, which I found to be a perfect way to separate data from content and re-use it in different ways across the site.

## What was involved in the migration?

It was a combination of manual work and (thankfully) some tools that helped automate things.

**hugo migrate**
The first thing I did was point Hugo to my existing Jekyll site and run the migration command:

``` shell
hugo migrate dzello-dot-com-jekyll
```

This migrated all of my existing Jekyll blog posts to a new Hugo site and converted their front matter to make them compatible with Hugo. I did still have to change `category` to `categories` in the front matter before Hugo would accept them.

**Choosing a theme**

At that point, I could see content appear on a new site, albeit in a very rudimentary way. I decided to start with a theme instead of going from scratch. I chose [Kiera](https://gohugo.io/themes/kiera) because it had a very small footprint, so I knew it would be easy to customize and not add much performance overhead. It was also responsive and had normalize and FontAwesome baked in.

**Customizing the theme**

Hugo makes it very easy to override files in themes due to an intuitive lookup order. If you have a file in `themes/kiera/layouts/index.html`, you can override it just by placing a file in `layouts/index.html`. If a theme is well-structured and makes use of `define` blocks, it's likely that you can accomplish exactly what you need by overriding just one file with a small amount of contents, rather than have to override a big file that contains nearly the full site.

`define` blocks let you place markup within a named block inside of a layout or partial:

``` html
{{ define "header" }}
  <h1>Hello world!</h1>
{{ end }}
```

And render that block within a `baseof` or other layout file using the `block` statement:

``` html
<body>
  {{ block "header" }}
  ...
</body>
```

Resulting in:

``` html
<body>
  <h1>Hello world!</h1>
  ...
</body>
```

This feature came to Hugo with version 0.xx.x and is very useful for organizing markup and avoiding duplication across layouts.

I ended up a handful of layouts and partials in the Kiera theme (see my [layouts folder](https://github.com/dzello/dzello-dot-com/layouts) to add new meta tags or change the order of content or add content to a layout altogether. But the process was easy and the changes well-contained and easy to compare with the original template.

## What's possible now that wasn't before?

I make heavy usage of two Hugo features—data files and shortcodes—that allow me to take a much more data-driven approach to my site's content than I could before.

**Separating data from content**

Once I had my blog content ported over, the next task was to add new types of pages to reflect the work I've done in the past. I wanted to showcase talks I'd given, articles I'd written around the web, open source projects I'd created and so on. This is the data I didn't want to bake into Markdown templates but store in a structured way that was easy to do lookups on.

With Hugo you can put JSON, YAML or TOML files in a `data` folder, which them becomes accessible inside of layouts, partials and shortcodes via the `$.Site.Data` parameter. I decided to use the TOML format, primarily to learn something new and because it has a nice-looking way to create arrays of objects, which looks like this:

``` toml
[[ instrument ]]
name = "guitar"
family = "strings"

[[ instrument ]]
name = "saxophone"
family = "brass"
```

Given this data in a TOML file placed in `data/instruments.toml`, I can easily render the information about all of the instruments:

``` html
{{ range $.Site.Data.instruments }}
  <li>The {{ .name }} is a member of the {{ .family }} family.</li>
{{ end }}
```

If you look at the [data folder](https://github.com/dzello/dzello-dot-com/data) for this site, you'll find files for my talks, articles, open source projects and more. Some data files I use just once but others I repurpose in different ways across the site. Approaching all of this as data makes that process natural, and it reduces the cognitive overhead of adding/updating/deleting new items. I never need to look at Markdown or HTML, all I have to do is edit a TOML file.

**Keeping Markdown DRY with shortcodes**

Shortcodes allow you to add specific blocks of HTML into your Markdown content without it getting messy. The classic example is embedding a Tweet inside of your content, which requires HTML being added to the page. Thankfully Hugo has a built-in shortcode for tweets, and adding one to a Markdown file is very easy:

``` markdown
People will say anything on twitter:

{\{< tweet 123445667890 >}}

See what I mean? It's crazy!
```

I ended up using shortcodes to render the data I store in the TOML files. I have a shortcode called `work-type-list.html` that is passed a path to the `$.Site.Data` map and a few other optional parameters for tag-matching and styling. Using the data at that location, the shortcode renders a list of all of the elements, with one bit of cleverness - it can use a different partial for rendering for each type of element it encounters in the data file.

Here's an example that shows how this system renders the HTML bit for a conference talk, all the way from the data to the presentation.

Here's the data, all of which can be seen in [data/talks.toml](https://github.com/dzello/dzello-com/data/talks.toml) in the Github repo for this site.

``` toml
[[ talk ]]
title = "From few to some to many — How to scale community support for APIs"
event = "DevXCon"
event_url = "https://2017.devxcon.com/"
date = "2017-05-22"
blog_url = "https://devrel.net/developer-experience/scale-community-support-apis"
video_url = "https://www.youtube.com/watch?v=dhAWeqQc-Xk"
slides_url = "https://speakerdeck.com/dzello/from-few-to-some-to-many-how-to-scale-community-support-for-apis"
tag = "devrel"
abstract = '''
The free tier of many APIs includes “community support”. What does that mean exactly? How involved dojs the company need to be for community support to be effective, and how should that evolve over time?"
'''
```

Here's the Markdown content page where this data is used, found in [content/work/talks.md](https://github.com/dzello/dzello-com/content/work/talks.toml).

``` markdown
+++
title = "Talks and presentations"
+++
{\{< work-type-list list="talks" >}}
```

That's all the *content* required to generate [dzello.com/work/talks](https://dzello.com/work/talks). All of the heavy lifting is offloaded to the shortcode, which is just formatting data from the TOML file.

Best of all, the data can be reused. On my [Hire page](/hire), I wanted to include work I've done in the developer relations context across a multitude of content types including talks, articles and work experience. Rather than duplicate those into a new TOML file, I simply added a `tag` field to the existing TOML files and set `tag=devrel` where the item was related to DevRel:

``` toml
[[ talk ]]
title = "From few to some to many — How to scale community support for APIs"
tag = "devrel"
```

Now, using a previous shortcode with a modification I made to filter by tags, I can grab just the DevRel-related content from each file:

``` markdown
{\{< work-type-list list="talks" tag="devrel" >}}
```

## What should you watch out for?

If you haven't used Hugo before, I would recommend taking a patient read through the documentation up front. A lot of the concepts will be new and learning them up front means you will save yourself the anguish of discovering a better way to do something later on ;)

In particular, it took me a while to get the hang of `list.html` and `single.html` files when it comes to layouts. If you want any of your Markdown to display, you need to have them in place and understand how they work.

## Would I do it again?

Absolutely. I'm very happy with how the new site turned out. Adding new data and content is a breeze. Keeping data separate from content encourages me to think about new ways to display and reuse the content I might have decided were too burdensome before.
