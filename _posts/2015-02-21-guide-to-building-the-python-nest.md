---
layout: post
title: Guide to Building the Python Nest
date: '2015-02-21T05:55:49+05:30'
tags:
- python
- virtualenv
- best-practices
tumblr_url: http://snortingcode.tumblr.com/post/111647489535/guide-to-building-the-python-nest
---
No surprises in this post! This is about one of the things that every person starting with python does wrong and does it right soon after.There are several benefits of having different environments for different python projects - Project X can use version 1.a of a library while Project Y can use version 2.b of the same library - and the best way to go about it is using virtualenv. Here’s the quick and pretty way to get the work environment for your python project in order:$ sudo pig install virtualenv$ sudo pip install virtualenvwrapper$ export WORKON_HOME ~/path/to/store/all/environments/
$ source /usr/local/bin/virtualenvwrapper.sh

And we are done!
Here are some commands that you would end up using on a regular basis:#Creates a new virtual environment called my-cool-project
# which would be a folder inside the WORKON_HOME path provided above.
$ mkvirtualenv my-cool-project

#Activates the vir-environment, essentially changing the PATH variable
# for the session. 
$ workon my-cool-pro[hit tab to get suggestions!]

#Creates a requirements file that would have all the packages that the
# project requires. This helps in easily replicating the work
# environment (or deploy) by using pip -r <requirements.txt> to
# install the packages in the new environment.
$ pip freeze > requirements.txt 
$ pip install -r requirements.txt

#Deactivating a virtual environment on which you have been working
$ deactivate

#Deleting a virtual environment
$ rmvirtualenv my-scrapped-project#Creating a virtualenvironment and a project in it. This creates the#project folder in the PROJECT_HOME location with an isolated python #environment to work on$export PROJECT_HOME=/path/to/where/the/projects/live$mkproject my_awesome_project
