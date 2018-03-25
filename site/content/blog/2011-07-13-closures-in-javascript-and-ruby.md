+++
categories = ["Technology"]
date = "2011-07-13T00:00:00Z"
title = "Jumping between JavaScript and Ruby Closures"

+++

<p>These days I find myself constantly jumping between Ruby and Javascript when creating web applications. Some days I feel like <a href="http://en.wikipedia.org/wiki/Snow_Crash">Hiro Protagonist</a>, with these languages as my twin katanas.</p>

<p>Except&hellip; that they&rsquo;re obviously not twins. And when switching back and forth constantly it&rsquo;s easy to forget the individual subtleties of features that these languages share in concept but not in implementation.</p>

<p>It&rsquo;s not so much the syntax that trips me up, but rather the design aspect. I&rsquo;ll sometimes come under a temporary <a href="http://en.wikipedia.org/wiki/Cognitive_bias">cognitive bias</a> after working with one language &ndash; causing its patterns to surreptitiously leak into the design of software in the other language.</p>

<p>After writing JavaScript for a few hours, I&rsquo;m more likely to unwittingly solve a Ruby problem via a JavaScript-y technique &ndash; perhaps by [over]using closures. In an app that&rsquo;s written in a mostly imperative style, tossing in functional programming elements can be confusing.</p>

<p>As of now, I&rsquo;ve made a special mental note to take a deep breath when switching and let the brain get properly back into context. For heading back to Ruby when working with closures I find reviewing this guide, <a href="http://innig.net/software/ruby/closures-in-ruby.rb">Closures in Ruby</a>, to be a helpful reminder of the available patterns.</p>

<p>Also, syntactically it&rsquo;s not a bad idea to glance over Proc, lambda, and function:</p>

<div class="CodeRay">
  <div class="code"><pre><span class="comment">#in ruby</span>
p = <span class="constant">Proc</span>.new {|n| <span class="keyword">return</span> n; }
other_p(p)    <span class="comment">#ok</span>
p(<span class="integer">1</span>)          <span class="comment">#ok</span>
p.call(<span class="integer">1</span>)     <span class="comment">#error! unexpected return    </span>

p = <span class="constant">Proc</span>.new {|n| n }
p.call(<span class="integer">1</span>)     <span class="comment">#ok, returns 1</span>

<span class="comment">#this is ok too</span>
<span class="keyword">def</span> <span class="function">j</span>(i)
  p = <span class="constant">Proc</span>.new {|n| <span class="keyword">return</span> n; }
  p.call(i)
<span class="keyword">end</span>
j(<span class="integer">1</span>)          <span class="comment">#ok - returns 1</span>

<span class="comment">#and ok with lambda</span>
p = lambda {|n| <span class="keyword">return</span> n; }
p(<span class="integer">1</span>)          <span class="comment">#ok, lambda lets caller stay in control</span></pre></div>
</div>


<p>That&rsquo;s because of <a href="http://samdanielson.com/2007/3/19/proc-new-vs-lambda-in-ruby">this whole business</a>. Correspondingly in JavaScript,</p>

<div class="CodeRay">
  <div class="code"><pre><span class="comment">//in javascript</span>
<span class="keyword">var</span> <span class="function">f</span> = <span class="keyword">function</span>(n) { <span class="keyword">return</span> n; }    
otherF(f)        <span class="comment">//ok</span>
f.call(<span class="integer">1</span>)        <span class="comment">//ok</span>
f(<span class="integer">1</span>)             <span class="comment">//ok</span></pre></div>
</div>
