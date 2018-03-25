+++
categories = ["Technology"]
date = "2011-06-26T00:00:00Z"
title = "Generate a random, friendly confirmation code in pure Ruby"

+++

<p>Here&rsquo;s a really handy trick for generating a pseudo-random alphanumeric code in pure Ruby &ndash; no gems or dependencies needed.</p>

<div class="CodeRay">
  <div class="code"><pre>&gt;&gt; rand(<span class="integer">36</span>**<span class="integer">6</span>).to_s(<span class="integer">36</span>)
=&gt; <span class="string"><span class="delimiter">&quot;</span><span class="content">a7yr8r</span><span class="delimiter">&quot;</span></span></pre></div>
</div>


<p>Note that 36**6 = 2,176,782,336 = or about 2 Billion combinations. Depending on your needs that may or may not be sufficiently large to avoid collisions.</p>

<p>Should you need it, generating longer combinations is trivial by simply changing the exponent.</p>

<div class="CodeRay">
  <div class="code"><pre>&gt;&gt; rand(<span class="integer">36</span>**<span class="integer">24</span>).to_s(<span class="integer">36</span>)
=&gt; <span class="string"><span class="delimiter">&quot;</span><span class="content">yrt4ols2ke1jm44w9bxvvp9l</span><span class="delimiter">&quot;</span></span></pre></div>
</div>


<p>So, what does the .to_s(36) do? I&rsquo;ll give you a hint &ndash; 36 is called the radix, and you can read more about it <a href="http://en.wikipedia.org/wiki/Radix">here</a>.</p>
