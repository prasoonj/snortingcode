---
layout: post
title: 'NGINX Tryout - '
date: '2014-08-26T03:25:46+05:30'
tags:
- nginx
- installation
- configuration
- nube
tumblr_url: http://snortingcode.tumblr.com/post/95807770520/nginx-tryout-live-blog
draft: false
path: /posts/nginx-tryout-live-blog
category: code
description:

---
Today I will try to work out a basic installation of nginx to serve some static pages (with some javascript/angularJs magic) and hopefully get everything to work and without major problems. I shall document the steps and the issues here:
Some background: nginx (pronounced engine-x) is a web-server based on an event driven (asynchronous) architecture that scales fast and has amazing performance according to the > 12% of the active sites that use it (some major names there like netflix, hulu, github, etc.).
Installation: I will try to install it on my Ubuntu 12.04 box. The default packages supplied by Cannonical are quite old. I’m using the info on this page to execute the following:
sudo -s
nginx=stable # use nginx=development for latest development version
add-apt-repository ppa:nginx/$nginx
apt-get update 
apt-get install nginx
The installation gave no issues whatsoever. One surprise though - the server was started right after installation which wasted few minutes in trying to figure out why starting the server complained about the port being in use. The server executable would be in either of these locations: 
/usr/sbin/nginx or /usr/local/bin/nginx
Navigate to http://localhost and see a “It works!” page.
Configuration:
The first step is to edit your hosts file (on linux) to be able to set up more than one project on a single developer machine.Open /etc/hosts files with super user privileges and add your project’s domain name to the line that maps localhost to 127.0.0.1$ sudo vim /etc/hosts127.0.0.1 localhost example.dev
Copy the contents of your app to a convenient location, example:/var/www/example.dev/html 
$ sudo cp /etc/nginx/sites_available/default /etc/nginx/sites_available/example.dev
Change the ‘server’ configuration for the above file. The items need to be edited are ''root’ (to start with). Point the ''root’ to the location of your websiteserver {    root /var/www/example.dev/html    index …}
Create a soft link in the sites_enabled directory:$ sudo ln -s /etc/nginx/sites-available/example.dev /etc/nginx/sites_enabled/
Restart your server:$ sudo service nginx restart