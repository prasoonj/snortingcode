---
layout: post
title: Lagom scala facebook messenger webhook giter8 template
date: '2018-04-09T23:41:30+05:30'
tags:
- giter8
- facebook
- lagom
- scala
---

Setting up the Facebook messenger's webhook (to be able to receive messages from the Facebook Messenger API) is a one time task that all your FB apps would need to do. Essentially, Facebook would need a `verification` endpoint on your webserver to verify your webhook after which it would post the messages that you subscribe to. If you are using Lagom's ( *almost magical* ) webservices framework, you might want to start with this `giter8` template to [get a working webhook out of the box](url:https://github.com/prasoonj/lagom-fbmessenger-webhook.g8).

# Usage

```
$ sbt new prasoonj/lagom-fbmessenger-webhook.g8
[info] Set current project to test (in build file:/Users/prasoonjoshi/code/test/)

The next big ChatBot.

name [Hello]: chatbot  
organization [com.example]:
version [1.0-SNAPSHOT]:
package [com.example.chatbot]:
facebookVerificationToken [somecomplicatedtoken]: secrettoken

Template applied in ./chatbot

$ tree -L 3
.
├── chatbot
│   ├── build.sbt
│   ├── project
│   │   ├── build.properties
│   │   └── plugins.sbt
│   ├── webhooks-api
│   │   └── src
│   └── webhooks-impl
│       └── src
└── target
    └── streams
        └── $global

9 directories, 3 files

$ cd chatbot
$ sbt runAll

$ curl -X GET \
  'http://localhost:9000/api/v1/fbwebhook?hub.challenge=asdf&hub.mode=subscribe&hub.verify_token=somecomplicatedtoken'

```

# WIP

There is really not much to the `verification` endpoint! On the `POST` side of things, the `case classes` used to model the Facebook Messages need a lot of improvements. I would modify them as I get more time to work on this. Please send PRs if you think this might speed your development and you decide to contribute :)
