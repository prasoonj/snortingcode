---
layout: post
title: Weekend Hack - Face Recognition based Access Control System with Python, OpenCV
  and Rekognition
date: '2017-03-06T08:56:05+05:30'
tags:
- OpenCV
- python
- rekognition
- aws
- aws rekognition
tumblr_url: http://snortingcode.tumblr.com/post/158067120425/weekend-hack-face-recognition-based-access
draft: false
path: /posts/weekend-hack-face-recognition-based-access
category: code
description:
---
My current interest in ML has triggered an urge to revive my Python skills. A good start, I thought, could be experimenting with some Image Processing - mostly to understand the limitations and challenges of tasks like these. The last time I worked with Image Processing was as part of a PoC for Hadoop. I used HIPI to do the heavy lifting of creating image bundles and preparing them for the underlying HDFS with OpenCV’s java bindings to detect faces using Haar cascades.The problem statement for this hack extends my experiment with HIPI. 

#Problem Statement:
Detect human faces on a video feed and compare the captured faces against an image dataset to suggest probable matches to provide access control.

#Technology/Tool/Environment Stack:
Python 2.7.x
opencv python
OSX Sierra
AWS Rekocnition

Installation of OpenCV is a major pain! Especially if you wish to work with Videos on Sierra. Most of my time was spent in preparing the workstation with a reliable installation of OpenCV (unsuccessful attempts included installing a pip package that claimed to provide OpenCV but was compiled without ffmpeg). As of now this post[link missing] is the most reliable source of instructions to install OpenCV on Sierra (and incredibly detailed). I would not reproduce any steps from that guide to avoid redundancy.
You might want to check this[link missing] guide out if you are new to setting up virtualenv for python development:.

#Solution:
The solution revolves around breaking the problem down into smaller tasks that are more or less self contained:
- Capture frames of a video (in my case this was a video feed from my internal facetime camera).
- Detect human faces in the captured frame.
- Have a datastore of known faces (this involves mapping a person with a set of features extracted from their face).
- Match the captured frame against the face datastore to grant access or deny it.

##Capturing frames from a video feed:
Doing this with python is quite straight forward. OpenCV has `VideoCapture( )` that gives you a handle on the video. It takes one argument - the identifier for the camera - if you have a single camera, as was my case, just pass a 0.

##Detecting human faces in the captured frame:
For the purpose of this exercise I was not interested in training the classifier. There are very efficient Haar cascade classifiers that give great accuracy. OpenCV comes equipped with trained classifiers that we would leverage (there are some cool ones that let you identify cats in images too!)The Haar cascade classifier that I used was:opencv/data/haarcascades/haarcascade_frontalface_default.xml
Working with gray-scale images is faster so we convert the captured frame to gray, create a classifier that can identify a human face in an image (you might have to tweak the classifier to suite your case) and, pass the gray-scale image to it which would return a list of faces it identifies.I did have to tweak the parameters based on the distance of the camera from the subject, etc. but, it worked well for most parts. It indicated positive results even when the subject was moving fast in front of the camera - it pointed the blurred human face in that case (might not always be what you want - my app breaks in such situations as of now!).

##Face datastore:
Enter AWS Rekognition!Rekognition lets you create a Collection of faces that you can match against. The API is straight forward. One important point to note is that AWS does not store the actual image bytes just an incredibly rich set of features that it associates with the face by giving it a faceId. You can keep adding new faces to this collection by calling the rekognitionClient.index_faces( ) API (I’m using the python sdk - boto3).You would need to map the returned faceId (and other face metadata) to the actual image of the person or some other identifier for the person and persist it.Match captured face against the face datastore:Rekognition has a face matching API that takes the CollectionId and image frame and returns the metadata associated with the matched face from the collection (or a no match). A list of matched faces with confidence level is returned in decreasing order of confidence.If more than one face is detected in the input image, only the largest face is matched.So there you have it! It is ridiculously easy to build this solution as a PoC. Taking this to production should still not be a very daunting task, it would just take more time to visualize all failure scenarios and account for them.Here’s the code produced as part of this short hack exercise:https://github.com/prasoonj/tzukuruPlaces 
where I was lazy:- The project structure could be a lot better.- I’m using Mac’s ‘say “Hello World”’ terminal command to announce the name of the person matched (also to produce some delay giving better user interaction). This can certainly be done in a much better way.- There are a lot of scenarios where the app fails right now. No exception handling is done.- Unit tests!
