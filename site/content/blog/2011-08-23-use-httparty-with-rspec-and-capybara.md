+++
categories = ["Technology"]
date = "2011-08-23T00:00:00Z"
title = "Use httparty with rspec and capybara"

+++

<p>httparty can be a useful supplement to Capybara drivers for use in a <a href="https://github.com/jnicklas/capybara">Capybara</a> test suite. Take the example of an <a href="http://dzello.com/easiest-possible-rspec-performance-test-w-sce">rspec-based load test</a>.</p>

<p>For this purpose Selenium&rsquo;s <a href="http://rubygems.org/gems/selenium-webdriver">WebDriver</a> is too slow, rack-test doesn&rsquo;t work remotely, and <a href="https://github.com/jeroenvandijk/capybara-mechanize">capybara-mechanize</a> doesn&rsquo;t work well with pages that rely on AJAX or JavaScript to create elements (although otherwise it&rsquo;s quite well suited to this purpose).</p>

<p>Sometimes a good old-fashioned GET or POST is all you need. See the gist below for how to wire up a simple httparty example within your test suite. Admittedly, I didn&rsquo;t roll this into an actual Capybara driver, though I might be interested in doing so if that&rsquo;d be helpful for anyone.</p>

<p><script src="https://gist.github.com/1166060.js"></script></p>
