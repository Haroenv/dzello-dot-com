+++
categories = ["Technology"]
date = "2011-07-15T00:00:00Z"
title = "Using New Relic to monitor a Padrino Application"

+++

<p>Getting New Relic hooked into your Padrino application isn&rsquo;t too hard &ndash; there are a just a few gotchas.</p>

<p>(Before starting, make sure you have a valid config/new_relic.yml configuration file in place.)</p>

<p>If you&rsquo;ve tried this already, you may have run into this error:</p>

<div class="CodeRay">
  <div class="code"><pre>TypeError - can't convert String into Integer:
.../newrelic_rpm-3.1.0/lib/new_relic/agent/instrumentation/sinatra.rb:36:in `[]'</pre></div>
</div>


<p>The padrino-rpm gem fixes the bug that causes this error. Which brings us to step 1 &ndash; install or bundle <a href="https://github.com/Asquera/padrino-rpm">padrino-rpm from github</a>.</p>

<div class="CodeRay">
  <div class="code"><pre>gem <span class="string"><span class="delimiter">'</span><span class="content">padrino</span><span class="delimiter">'</span></span> <span class="comment"># Padrino needs to be loaded first!</span>
gem <span class="string"><span class="delimiter">'</span><span class="content">padrino-rpm</span><span class="delimiter">'</span></span>, <span class="symbol">:git</span> =&gt; <span class="string"><span class="delimiter">'</span><span class="content">https://github.com/Asquera/padrino-rpm.git</span><span class="delimiter">'</span></span></pre></div>
</div>


<p>Require the gems in order within your app or apps.rb:</p>

<div class="CodeRay">
  <div class="code"><pre>require <span class="string"><span class="delimiter">'</span><span class="content">padrino</span><span class="delimiter">'</span></span>
require <span class="string"><span class="delimiter">'</span><span class="content">padrino-rpm</span><span class="delimiter">'</span></span>
require <span class="string"><span class="delimiter">'</span><span class="content">newrelic_rpm</span><span class="delimiter">'</span></span></pre></div>
</div>


<p>The padrino_rpm gem relies on before_load and after_load hooks to add its instrumentation. So, make sure your Padrino application initializes using</p>

<div class="CodeRay">
  <div class="code"><pre><span class="constant">Padrino</span>.load!</pre></div>
</div>


<p>or else the instrumentation won&rsquo;t take effect.</p>

<p>Once these changes are in place, restart your server and tail log/newrelic_agent.log. You should now see New Relic reporting and your pages working.</p>

<p>Here a link to New Relic support that may contain more information:</p>

<p><a href="https://support.newrelic.com/help/discussions/support/7034-newrelic-sinatra-instrumentation-does-not-work-with-padrino">https://support.newrelic.com/help/discussions/support/7034-newrelic-sinatra-i...</a></p>

<h3>Bonus Points</h3>

<p>New Relic now supports end-user monitoring via the injection of JavaScript into your page&rsquo;s layout. By default this doesn&rsquo;t take effect within Sinatra/Padrino (or at least I dont think). You can still get it to work by placing these calls in the appropriate places of your layout.</p>

<p>With the head tag:</p>

<div class="CodeRay">
  <div class="code"><pre>= <span class="constant">NewRelic</span>::<span class="constant">Agent</span>.browser_timing_header</pre></div>
</div>


<p>And just before the end of your body tag:</p>

<div class="CodeRay">
  <div class="code"><pre>= <span class="constant">NewRelic</span>::<span class="constant">Agent</span>.browser_timing_footer</pre></div>
</div>


<p>Load up a page using the layout and make sure you see that both JavaScript tags are outputted into your HTML.</p>

<p>After a few minutes head over to New Relic and you should find some neat browser metrics about DOM Performance and Page Rendering.</p>

<h3>Update</h3>

<p>Find the Rubygem <a href="http://rubygems.org/gems/padrino-rpm">here</a>. Many thanks to <a href="http://twitter.com/#!/Argorak">@Argorak</a>.</p>
