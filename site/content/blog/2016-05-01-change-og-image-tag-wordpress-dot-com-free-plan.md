+++
categories = ["Technology"]
date = "2016-05-01T00:00:00Z"
image = "blog/estelle-murail-2016.jpg"
imageCaption = "My wife, the Victorian scholar"
title = "How to change the og:image tag on the wordpress.com free plan"

+++

The wordpress.com free plan doesn't give you control over which image becomes the og:image
[Open Graph](http://ogp.me/) meta tag on the pages and posts you've created. The tag is important because it's used to show a preview image
for your page when it's shared on social networks like Facebook and Twitter. If the image is wrong
it will confuse the people who want to share your page.

To see what the default preview image is for any Wordpress page or post you've created you can
paste its URL into the [Facebook debugging tool](https://developers.facebook.com/tools/debug/).

If the image isn't the one you want, there's a workaround to change it but stay on the free plan.
Disclaimer: this workaround is based on trail and error from editing the Victorian Persistence blog's [team page](https://victorianpersistence.wordpress.com/team/)
and could change at any time.

The solution is to re-upload the image you want to be the og:image but make sure that
its file name is alphabetically and numerically before any other images on the page. This is because
the og:image selection works something like this: if you have two images **IMG_1911.png** and **IMG_1916.png**, the **IMG_1911.png** image will be
chosen as the og:image because lexicographically **IMG_1911.png** is before **IMG_1916.png**.

If you want **IMG_1916.png** to become the og:image instead, re-upload it as **IMG_1910.png**,
or with any file name that's lexicographically before **IMG_1911.png**. Then make sure
to update the reference in the page/post to point to the new file. Publish
your changes and then check the results with the [Facebook debug tool](https://developers.facebook.com/tools/debug/).

This worked for me after trying many other strategies including changing
image sizes, captions, order, CSS, etc. and I hope it will work for you.
