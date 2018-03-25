+++
categories = ["Technology"]
date = "2011-08-12T00:00:00Z"
title = "Use an HTTP Proxy with Capybara Mechanize"

+++

<p>Hooray for your awesomely fast and invisible <a href="https://github.com/jeroenvandijk/capybara-mechanize">capybara-mechanize</a> HTTP-based acceptance tests! Aren&rsquo;t they great? Well &ndash; until they break and you need to know just what in the Helper is going on back there.</p>

<p>Running your traffic through a proxy is a good start to debug this, as part of a process which typically will also involve logic, reasoning, and facepalm.</p>

<p>At least the first step is painless. Setup your capybara proxy as follows from within your spec_helper:</p>

<div class="CodeRay">
  <div class="code"><pre><span class="constant">Capybara</span>.configure <span class="keyword">do</span> |config|
  config.default_driver = <span class="symbol">:mechanize</span>
  <span class="keyword">if</span> proxy = <span class="predefined-constant">ENV</span>[<span class="string"><span class="delimiter">'</span><span class="content">PROXY</span><span class="delimiter">'</span></span>]
    proxy = <span class="constant">URI</span>.parse(proxy)
    <span class="constant">Capybara</span>.current_session.driver.browser.agent.set_proxy(proxy.host, proxy.port)
  <span class="keyword">end</span>
<span class="keyword">end</span></pre></div>
</div>


<p>I prefer to pass my intent to proxy on the command line, hence the ENV[&lsquo;PROXY&rsquo;]. But you should do what works best for you.</p>

<p>Note: This differs from the way it <a href="http://fineshambles.wordpress.com/2010/11/05/mechanize-capybara-and-a-http-proxy">used to work</a>, wherein the agent property was on driver, not driver.browser. Thanks to lmmcoy for publishing this general strategy.</p>
