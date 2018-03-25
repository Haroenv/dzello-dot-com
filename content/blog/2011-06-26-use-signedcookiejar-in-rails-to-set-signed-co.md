+++
categories = ["Technology"]
date = "2011-06-26T00:00:00Z"
title = "Use SignedCookieJar in Rails to set signed cookies"

+++

<p>My Rails 3 application&rsquo;s use case &ndash; set a tamper-proof cookie other than the default session cookie (which your Rails app is probably already signing.) Maybe your application does this to track analytics, persistent information for logged out users, etc. Anyhow, it turns out it&rsquo;s really use to do this using the mechanism Rails itself uses for session cookies.</p>

<div class="CodeRay">
  <div class="code"><pre><span class="comment">#small helper method within application controller</span>
<span class="keyword">def</span> <span class="function">secure_cookies</span>
  request.cookie_jar.signed
<span class="keyword">end</span>
<span class="comment">#then to set a secure cookie...</span>
secure_cookies[<span class="string"><span class="delimiter">'</span><span class="content">analytics</span><span class="delimiter">'</span></span>] = <span class="string"><span class="delimiter">&quot;</span><span class="content">last_visit=12/01/2000</span><span class="delimiter">&quot;</span></span>
<span class="comment">#and retrieve it on the next request</span>
analytics_info = secure_cookies[<span class="string"><span class="delimiter">'</span><span class="content">analytics</span><span class="delimiter">'</span></span>]</pre></div>
</div>


<p>It took a few minutes of reading through source code to see how &lsquo;signed&rsquo; works and how to use it (it creates a new cookie jar with the non-signed cookie jar as a &lsquo;parent&rsquo;). I was happy to see how easy it was in the end, however, and hope this post saves you some time.</p>
