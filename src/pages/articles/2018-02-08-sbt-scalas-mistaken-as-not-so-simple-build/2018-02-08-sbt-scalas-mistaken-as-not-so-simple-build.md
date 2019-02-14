---
layout: post
title: SBT - Scala’s ((mistaken as) NOT SO) Simple Build Tool
date: '2018-02-08T04:33:08+05:30'
tags:
- sbt
- Scala
- functional programming
- build tool
tumblr_url: http://snortingcode.tumblr.com/post/170642999820/sbt-scalas-mistaken-as-not-so-simple-build
path: /posts/sbt-basic-introduction
category: code
---
The first thing that one notices when jumping into Scala development is its utterly complicated build tool. Complications arise due to several reasons (and reasons different for different people, I’m sure) but, a consistent gripe that people seems to have is the syntax used in the build definition file (typically build.sbt although, any \*.sbt would work at the root of the project) for people not very familiar with some operators/constructors that the Scala community heavily relies on and, the monstrous amount of time it takes to get the first build started. The syntax seems strange at times even for Scala developers not familiar with sbt, that is because sbt is a DSL (Domain Specific Language). Let’s dive in to understand the essential basics![When I first ran “sbt run”, I wasn’t sure if things were even working at all, stared into the terminal for few 10s of minutes for several hours and nothing showed up. Google searches showed that it was a common problem! Although, in my case it was a conflict between the versions of Scala and sbt that were individually installed on my machine!]With that welcoming note, let’s dive into the sbt world - it is bound to make your life easier if you know what you are doing. And it is an extremely powerful build tool.I highly recommend that you read the sbt getting started guide completely before starting your project (this post is not a replacement as there are several details that are important and won’t be discussed here). I’m assuming that you’ve installed a recent version of sbt already. I’m writing this to provide a quick start (which might be a lot quicker than the “Quick Start Guide” that sbt documentation provides.)Getting Started With “sbt new”The recent versions of sbt (later than 0.13) provide a quick way to kick start your Scala projects  -$ sbt new sbt/scala-seed.g8sbt uses g8 templates to create the basic structure of your project. There are tons of useful ones available and you can create your own as well. If you come from the Java world, think of these as Maven archetypes of sorts. The command above would ask you for some project details like the project name, my project’s name is: Whipp. (For reasons unknown to humanity!)The previous command should set up a simple Scala project for you with a directory structure that resembles that used by Maven: src/[main, test]/[scala, java, resources] $ tree -L 2.├── build.sbt├── project│   ├── Dependencies.scala│   ├── build.properties│   ├── plugins.sbt│   ├── project│   └── target├── src│   ├── main│   └── test└── target    ├── scala-2.12    └── streams9 directories, 4 filesThe file that would the focus of our discussion in this post is the build.sbt file - the build definition.(Don’t forget to add target/ to your .gitignore before you make your initial commit.)Running the project:Building and running the project is simple:$ sbt #takes you to the sbt shell from where you can issue commands like run

[info] sbt server started at 127.0.0.1:5522

sbt:Whipp> run #The task we wish to execute. This would compile the project files and start the project. This could take a while if you are running your first project. Patience trumps hate!Some cool things about the sbt shell are its tab-completion feature and history. It essentially behaves like your terminal’s shell. Pretty cool huh?You could also provide tasks in a “batch mode” like this:#takes

sbt:Whipp> clean compile runsbt provides a continuous build option. Append a task with ~ and sbt would watch for changes in your files, auto compile them and, execute the task - for instance, ~run would add efficiency to your development setup!Here’s a list of all the commands available for you to use: https://www.scala-sbt.org/1.x/docs/Command-Line-Reference.htmlThe build definition - build.sbtThis is the most important and interesting section of this post so grab your coffee and read on! The key element in understanding the build.sbt file is that it is not just a properties file but, valid Scala code (well, valid sbt DSL code to be precise but, you get the drift!) Read the generated *.sbt file with that perspective first and see what you can gather from it:import Dependencies._lazy val root = (project in file(".")).  settings(    inThisBuild(List(      organization := “com.snortingcode”,      scalaVersion := "2.12.3",      version      := "0.1.0-SNAPSHOT"    )),    name := “Whipp”,    libraryDependencies ++= Seq(      scalaTest % Test)  )

(Depending on which seed project you start with, this might look a little different. Hold on for a while and it would make a lot of sense to you!)Let’s first look at what the below line is all about:“lazy val root = (project in file(“.”))”

We are declaring a lazy value ‘root’ which happens to be everything followed by “lazy val root” in this case. Your build file is composed of several “val” and/or “lazy val”, these would typically fall under these 3 categories:SettingKey[T]TaskKey[T]InputKey[T]In fact, if you take a look at the config-classes under the target/ directory, you would find a cache file that has all the lazy val and val that you defined in your build.sbt file. You can also use the sbt shell to see what these keys are.With that in mind, if you look at the build.sbt again, you’d see that we have a lazy val called root that contains the settings for each “project” in the current directory [project in file(“.”)]Some of these are generic properties like the name of the project, organisation, etc. These are unlikely to change (it is a common practice to extract them out to a val and add it to the project.settings.)In that sense, most of the build definition is just a bunch of key-value pairs => some help define things, some do interesting stuff. The value “name” is an example of a key that defines something. A quick digression: If you try to assign a non-String value to “name”, you would get a typeMismatch error. The key “name” (which we did not define ourselves) comes along with the implied imports => sbt._, Keys._Let’s try to add some interesting key that does something. Naturally, we would turn to a TaskKey[T]. Add these lines to your build definition:lazy val doSomething = taskKey[Unit](“I do something cool!”)

Now, add this key to your settings. The updated build.sbt might look something like this:import Dependencies._lazy val root = (project in file(".")).  settings(    inThisBuild(List(      organization := “com.snortingcode”,      scalaVersion := "2.12.3",      version      := "0.1.0-SNAPSHOT"    )),    name := “Whipp”,    libraryDependencies ++= Seq(      scalaTest % Test),    doSomething := {println(“Look what I did!”)}  )lazy val doSomething = taskKey[Unit](“I do something cool!”)

We defined a TaskKey[Unit] named doSomething using the method in the sbt DSL - taskKey[T]. Once you enter the sbt console (by restarting the sbt shell), you would notice that you can call this new task from the shell, simply by typing the task’s name - doSomething.sbt:Whipp> doSomethingLook what I did![success] Total time: 1 s, completed 8 Feb, 2018 1:59:01 PM

You can thus, create a DAG (Directed Acyclic Graph) using these tasks and create a workflow for your project! Sweet!A neat way to see what a task is doing is to “inspect” it:sbt:Whipp>inspect compile[info] Task: xsbti.compile.CompileAnalysis[info] Description:[info] 	Compiles sources.[info] Provided by:[info] 	{file:/Users/prasoonjoshi/code/whipp/whipp/}root/compile:compile

(The actual output is rather long, so I’ve truncated it. Each [info] tells you important information about that task. (Try this out with the doSomething task you created just now and see if everything makes sense!)We talked about the SettingKey[T] and TaskKey[T] a little bit, what is this InputKey[T] all about? Well, for now, you can just think of the InputKey as a method to take input from the user to create tasks on the fly (simple and powerful - we’ll talk about this in a future post soon!)Let’s jump to the libraryDependencies Yes, you know what they are! The essential information about this section of your build definition’s settings are: += is a method to append the provided dependency to the old libraryDependencies and return the new one!libraryDependencies ++= Seq[<your list of dependencies>] is another way you’ll see the dependencies often defined in the build definition. (This is what our example build definition has.)sbt uses Ivy for dependency resolution. The % that you see in the syntax below are sbt DSL’s methods that construct the Ivy module Id.To define a new libraryDependency, you need to define the dependency first, then add it to the list of dependencies.Here’s an example that adds mongo awesomeness to your project:val mongo = "org.reactivemongo" %% "reactivemongo" % "0.12.6"libraryDependencies += mongo#
# This line is part of my plugins.sbt file under the project directory. addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.6.7")libraryDependencies += ws

Of course, you can add the val directly to the settings without declaring it first. See what works best for you!I promised earlier that everything in your build definition is just a key (SettingKey, TaskKey, InputKey). See what the libraryDependencies key shows you on the sbt shell and see if that makes sense :)A final note on the evaluation order in your build definition file: Since the build definition is just a DAG which is interspersed with “lazy val”, you should expect a sequential processing, with lazy val(s) evaluated only when they are required.A point to keep in mind is that the SettingKeys are evaluated once, TaskKeys are evaluated each time the task is executed (these would usually have side-effects as you can see).There are several beautiful aspects of sbt that we can’t explore here in this quick guide. I would encourage you to check out the documentation and Josh Suereth’s great talk on YouTube.[Please do reach out to suggest improvements or corrections to this post :) ]