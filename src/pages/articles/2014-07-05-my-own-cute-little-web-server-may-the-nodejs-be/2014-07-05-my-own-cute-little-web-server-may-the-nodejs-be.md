---
layout: post
title: My Own Cute Little Web-Server (May The Node[JS] Be With You)
date: '2014-07-05T08:25:21+05:30'
tags:
- nodejs
tumblr_url: http://snortingcode.tumblr.com/post/90844043935/my-own-cute-little-web-server-may-the-nodejs-be
draft: false
path: /posts/my-own-cute-little-web-server-may-the-nodejs-be
category: code
description:

---
I have only recently started exploring NodeJS (I know terribly late it is!). This post can be considered a very basic introduction to NodeJS and its capabilities. And, judging from the topic of this post you should be convinced that the capabilities are massively impressive! Let’s dig in.
NodeJS is basically a runtime (utilizing Google’s V8 VM javascript runtime) and a bunch of libraries rolled into one awesome package that you can install with a simple:
$ apt-get install nodejs
Caution: There is a utility called ‘node’ in debian that might interfere with your node experience (you would not be able to execute nodeJS scripts with just:
$ node myAwesomeNodeScript.js
if it is installed already. There is a workaround however!)
The apt might have an old version of nodeJS. This might help you setup your system with the latest nodeJS and npm versions!
npm is the all powerful node package manager which (almost astonishingly strangely) manages the nodeJS packages on your machine.
Time for a quick test. In your favorite editor write this piece of code and save it in a file helloworld.js:
console.log("Hello World!");
From your terminal issue:
$ node helloworld.js
and you’ll see a brilliant shiny new “Hello World!” printed in solid gold for you on your terminal. Simple stuff. Now let’s move on to doing things that the article promised - building a web-server!
Open your favorite editor and type out the following lines in a file called httpServer.js and call it with node:
var http = require("http");

function perRequest(request, response) {
{% highlight javascript %}
response.writeHead(200, {"Content-Type":"text/plain"});
response.write("Hello from nodeJS!");
{% endhighlight %}
}

http.createServer(perRequest).listen(8000);
console.log("Server started. Listening on port 8000 ...");
Pretty much straight forward, self-explanatory piece of code. Let’s dig a little deep and see what nodeJS can and cannot do for us.
If you observe the above code, you’ll see that only a single instance of the server is created that is listening on the given port. On each request, the perRequest function is called but, the server does not wait for it to return in stead, it listens to other incoming requests and callback function operates behind the scenes to process each request. In a typical multi-threaded paradigm, the server would spawn a thread to handle the request, here things are different. NodeJS uses non-blocking, asynchronous I/O to process the request. 
If you were reading between the lines, you’d know that nodeJS is perfect for a fast I/O ecosystem. Typically, consider a check-in app like Foursquare (which uses NodeJS) built on top of a horizontal scale-able back-end like MongoDB (which again is a specialist in fast reads-writes) which could be handling millions of request but each request would not require any substantial processing. NodeJS is your best bet in such a scenario! Another typical use-case of nodeJS is a chat application.
If the use-case requires heavy processing, stick with a more traditional multi-threaded environments like JVM or better something like Erlang.
All modern apps are using nodeJS extensively and it makes sense to give it a good few weeks and see what it makes of you. No silver bullet to rid you of all your worries but, nodeJS is certainly worth a serious effort. May the node be with you!
