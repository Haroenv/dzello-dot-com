+++
categories = ["Technology"]
date = "2011-06-24T00:00:00Z"
title = "Nginx, gzip, and the Accept-Encoding header"

+++

<p>To get gzip configured for nginx, first make sure the flag is set when you compile, or that the binary you&rsquo;ve installed was compiled with it on (seems to be the default). The flag is in the source at the path:</p>

<div class="CodeRay">
  <div class="code"><pre>/auto/options</pre></div>
</div>


<p>Set it as follows:</p>

<div class="CodeRay">
  <div class="code"><pre>HTTP_GZIP=YES</pre></div>
</div>


<p>Once you&rsquo;ve built nginx, you&rsquo;ll need to turn gzip on in your nginx configuration, by default in nginx.conf.</p>

<div class="CodeRay">
  <div class="code"><pre>gzip  on;</pre></div>
</div>


<p>There are some optional settings; we&rsquo;ll get to those in a second. For now, let&rsquo;s use curl with some request headers to test out our setup.</p>

<div class="CodeRay">
  <div class="code"><pre>~$ curl --silent &quot;http://localhost&quot; -H &quot;Accept-Encoding:gzip&quot; -D headers.txt &gt;&gt; out.out &amp;&amp; cat headers.txt | grep Content-Encoding
Content-Encoding: gzip</pre></div>
</div>


<p>Sure enough, if we curl localhost with the right Accept-Encoding header, we get a gzipped response with the accompanying Content-Encoding header as proof.</p>

<p>Let&rsquo;s try the negative case. We&rsquo;ll avoid sending the Accept-Encoding request header.</p>

<div class="CodeRay">
  <div class="code"><pre>~$ curl --silent &quot;http://localhost&quot; -D headers.txt &gt;&gt; out.out &amp;&amp; cat headers.txt | grep Content-Encoding
~$</pre></div>
</div>


<p>Sure enough, no Content-Encoding response header to be found. Nginx is making sure it doesn&rsquo;t send out gzipped content to clients that don&rsquo;t accept it.</p>

<p>Nginx also provides an option to test the User Agent against a regular expression to further avoid gzipping
content for clients known not to support it, but who may still send inappropriate accept headers. For example, to turn off gzipping for Internet Explorer 6, add the following to your nginx.conf.</p>

<div class="CodeRay">
  <div class="code"><pre>gzip_disable &quot;msie&quot;;</pre></div>
</div>


<p>Let&rsquo;s try it out. Note you&rsquo;ll need to restart nginx to have configuration changes applied.</p>

<div class="CodeRay">
  <div class="code"><pre>~$ curl --silent &quot;http://localhost&quot; -H &quot;Accept-Encoding:gzip&quot; -A &quot;msie&quot; -D headers.txt &gt;&gt; out.out &amp;&amp; cat headers.txt | grep Content-Encoding
~$</pre></div>
</div>


<p>Ta da. Even thought Accept-Encoding:gzip was sent, the result was not gzipped, thanks to gzip_disable.</p>

<p>Learn more about nginx&rsquo;s HttpGzipModule <a href="http://wiki.nginx.org/HttpGzipModule">here</a>.</p>
