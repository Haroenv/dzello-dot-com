+++
categories = ["Technology"]
date = "2011-09-27T00:00:00Z"
title = "Preview your Github README.md locally"

+++

<p>A good README.md is an essential tool to educate developers about your Github-hosted project.</p>

<blockquote class="posterous_short_quote"><p>Documentation is like sex: when it is good, it is very, very good; and when it is bad, it is better than nothing.</p></blockquote>

<p>Often times, you&rsquo;ll want to preview or iterate on your README before you publish it.</p>

<p>While Github is the only place you&rsquo;ll get a perfect preview (github uses <a href="http://github.github.com/github-flavored-markdown">github flavored markdown</a>, it&rsquo;s a tedious process to commit, push, check, and repeat. This triggers hooks, adds to your repository, something about kittens, etc &ndash; all stuff you don&rsquo;t want.</p>

<p>A better solution is to iterate and preview locally. You might not get all of the Github markdown goodness, but you&rsquo;ll be close.</p>

<p>Here&rsquo;s a gist that&rsquo;ll help you set up a simple README.html in your repository that reads right from from your README.md and displays it. (Bonus: It also includes hotlinked Github CSS (like a boss) so you can get an even better feel for how it&rsquo;ll look for your Github audience.)</p>

<p><script src="https://gist.github.com/1246525.js"></script></p>

<p>Update:</p>

<p>Here&rsquo;s a small repository I created to illustrate this concept. You can clone it, stick it under your web server, and hit README.html to see it in action.</p>

<p><a href="https://github.com/dzello/preview_markdown_locally">https://github.com/dzello/preview_markdown_locally</a></p>
