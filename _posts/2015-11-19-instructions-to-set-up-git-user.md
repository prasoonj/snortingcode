---
layout: post
title: Instructions To Set Up GIT User
date: '2015-11-19T03:47:49+05:30'
tags: []
tumblr_url: http://snortingcode.tumblr.com/post/133520136235/instructions-to-set-up-git-user
---
I’m responsible for on-boarding new users to use our local git repositories at work. Each new employee (and a number of times old ones after a system crash!) needs instructions to set up their machines to be able to use the git repos, which requires me to send an email detailing what they need to do.This post is to make that process less cumbersome :)The instructions are for a linux machine and uses some conventions agreed upon by the linux community with respect to ‘what goes where’. Mac users would be able to follow pretty much the same steps. Windows users, well, they are probably using TFS.Create a /home//.ssh directory if it is not already present.
Issue the following command:
This would generate an rsa public/private key pair. Follow instructions on screen and accept defaults unless you wish to change any of those.

Generating public/private rsa key pair.
Enter file in which to save the key (/home/user/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/user/.ssh/id_rsa.
Your public key has been saved in /home/user/.ssh/id_rsa.pub.
The key fingerprint is:
44:d2:8c:d1:4f:85:df:3c:11:4d:22:c3:58:ca:2f:01 email@company.com
The key’s randomart image is:
+–[ RSA 4096]—-+|      ||      .=*.o . .  ||        =- + . . ||       . =o * . .||        S .  = . ||         .          ||                 ||                 |+—————–+Attach the id_rsa.pub in an email and send it across to your GIT repo’s administrator.
Post registration instructionsMake sure your git is configured with the email that you provided for rsa key:cd into the directory of the project$ git config user.email=“youremail@teksystems.com”$ git config user.name=“Your Name”(Avoid using –global here if you are using other git servers with
different configurations, eg. github, bitbucket) You would be given the
project path:$ git remote add origin git@gitserver:/opt/git/project.gitAnd we are done.I’ve created a small shell script that automates this process for you to a certain extent which you can get here (It should not harm your system in any way but it does not come with any guarantee)
