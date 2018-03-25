+++
categories = ["Technology"]
date = "2011-12-26T00:00:00Z"
title = "Get hamlc syntax highlighting in vim"

+++

If you've used [haml-coffee](https://github.com/9elements/haml-coffee) templates, you might be amazed by much they look like Ruby Haml templates.

After all, Haml is Haml, and Ruby and Coffescript share some syntax - notably the use of `@` to refer to instance variables.

As a result, Vim syntax highlighting for .haml templates works great with .hamlc templates.

To get the highlighting, just tell Vim to treat `.hamlc` as `.haml`. Here's the snippet to add to your .vimrc:

```
au BufRead,BufNewFile *.hamlc set ft=haml
```

Now you'll get syntax highlighting that looks just like this:

<img src='/images/hamlc.jpg' />

Yep, that's Coffeescript in a Javascript Template. In this example it's very similar to what a Ruby, server-side counterpart would look like.

Among other things, these templates make it easy to mentally switch between server-side and client-side templates.
