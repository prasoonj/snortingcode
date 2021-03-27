---
layout: post
title: Dropwizard Upgrade 0.6 to 0.9
date: '2017-01-12T05:22:23+05:30'
draft: false
path: "/posts/dropwizard-upgrade-06-to-09/"
category: code
tags:
- dropwizard
- upgrade
- java
description: "Upgrading from Dropwizard version 0.6 to 0.9 was not a very smooth process for me. But, in the end, things turned out well :) "
tumblr_url: http://snortingcode.tumblr.com/post/155758413285/dropwizard-upgrade-06-to-09
---

Even some popular libraries make upgrade to recent versions such a difficult task that if there are not major security fixes most people drag the older versions along with the product till such a time that incompatibilities with other projects emerge or use of new features necessitates such a move.We upgraded one of the core libraries of one of our projects recently - Dropwizard - from 0.6 to 0.9 and as luck would have it, 0.6 to 0.7 a whole world changed for Dropwizard!Here’s a guide that provided a lot of valuable information that I see no reason to reproduce:https://intentmedia.com/upgrading-dropwizard-0-6-to-0-7/

Here are a few other things that were not covered or well defined in the guide that, along with the guide, should be sufficient to help you upgrade to a more recent version of Dropwizard -Server configuration:If you have been using the same port for application and admin endpoints in the previous versions, with the upgrade you would get a Bind exception. In the earlier version if the same port is given Dropwizard would automatically use the same for admin endpoints and expose them at /admin. The documentation around this is not very clear but in such a case you would need to use the “simple” server type which would take just a single port.Views:If your application uses Dropwizard views, after upgrade you would need to include a dropwizard-views-freemarker dependency which was previously included in the core artifacts. Failing to include this would just give a vague “Template Error” and not stacktrace.
