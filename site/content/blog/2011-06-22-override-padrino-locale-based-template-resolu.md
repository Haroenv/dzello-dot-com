+++
categories = ["Technology"]
date = "2011-06-22T00:00:00Z"
title = "Serve mobile-specific templates easily with Padrino & Sinatra"

+++

<p><a href="http://www.padrinorb.com/">Padrino</a>&nbsp;provides support to&nbsp;render templates dynamically (e.g. foo.js vs. foo.haml) based on request content type formats and also locales (e.g. en, fr, es).</p>
<p>If you're not making use of the locales, you can use that mechanism for other purposes with just a simple override. When you need to render dynamic templates across your application, this may be a better alternative than patching out Padrino's entire render method (it's quite long) or writing a separate rendering function that all actions would need to be aware of.</p>
<p>The example in the gist is for serving mobile-specific templates across a whole app. Should a request come in from an iphone, I'd like to serve foo.mobile.haml instead of foo.haml. I use <a href="https://github.com/talison/rack-mobile-detect">rack-mobile-detect</a> to set a header if a request was deemed mobile, and then I check that header by patching out Padrino::Rendering's locale method.</p>
<p><script src="https://gist.github.com/1039277.js"></script></p>
<p>Note that you could use this simple override of the locale method to render dynamically based on most criteria you can think of.&nbsp;</p>
<p>&nbsp;</p>
