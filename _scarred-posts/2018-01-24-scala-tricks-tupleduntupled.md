---
layout: post
title: Scala Tricks - tupled/untupled
date: '2018-01-24T03:42:34+05:30'
tags:
- scala
- functional programming
- fp
- programming
tumblr_url: http://snortingcode.tumblr.com/post/170070102960/scala-tricks-tupleduntupled
path: /posts/scala-tricks-tupled-untupled
category: code
---
[This is part of a series of posts on Scala and Functional Programming:Part 1: Scala Tricks - tupled/untupledPart 2: Higher Order Functions]I started learning functional programming a couple of years ago. Started with this brilliant book called “Learn you a Haskell for Great Good”. I don’t think I can recommend a beginner book on a complex topic like FP more than this beauty. It doesn’t claim to make you an expert in FP or explain the underlying Category Theory as such but it does attempt to make the subject less scary and adds a lot of fun during your initial exploration.The best part about this book, I mentioned, is that it doesn’t try to teach an OOP person how to transition to FP. Instead, it talks about FP in its own right most of the times and it is able to do it because, well, the book is supposed to be fun and possibly not a comprehensive guide to FP (another fun book that changed the way I looked at Python was Why’s “The Poignant Guide to Ruby” - do check it out!)That said, when you start getting into FP with an intention to have it pay your bills eventually, you might have to switch to languages like Scala. The reason that makes Scala a rational choice to start with FP is the same that makes it a bit silly to programmers new to FP - it let’s you do things the OO way as well.With that background, let’s look at a particular trick in Scala and explore some aspects of FP along the way:Functional Programming is all about programming with functions (Duh!) Every other selling point of FP that you hear about is a direct implication of this fact - immutability, code reuse, concise representation of complicated ideas making modeling of the physical world a lot easier. If you keep this as a central idea when you think about a problem, it would help you to write code that works and is efficient. Let’s consider a function that takes 3 arguments from a Tuple (which is an immutable collection of ‘objects’ with equality of two tuples dependent, not just on the contents of the collection but, also on the relative position of each object in the collection) and adds them together to produce a result:def addElements(a: Int, b: Int, c: Int): Int = { ... }
Let’s quickly walk through the syntax here:‘def’ defines a function, the function addElements takes a single list of 3 parameters a, b and c and produces a result. The type of the parameters and the result is given after a “:” following the thing you are providing the types for. (The type system of any FP is very interesting, I’ll write a detailed post on that soon!)Now, a way to call this method would be to take the Tuple apart and pass each of its 3 elements as 3 separate arguments to this function:val tup = (100, 200, 300) //’val’ defines an immutable value, a tuple in this case

addElements(tup.\_1, tup.\_2, tup.\_3)This approach certainly works but, looks like a stinking garbage dump to a Functional programmer. Let’s fix it:val betterAddElements = Function.tupled(addElements \_)

betterAddElements(tup)We used the function “tupled” to convert the addElements function to a function that takes the tuple itself and knows exactly how to extract each element of the tuple and produce the same result that we expect from addElements. (The untupled method does the inverse - given a function that takes a tuple, it converts the function to one that takes individual parameters.) You can think of some sort of a magic wrapper around your method that lets you do this but, this magic wrapper is a direct result of any functional programming language design.There’s a lot of FP magic happening here that I can’t cover in this post because it would make it too long and may confuse the programmer new to FP. The magic can be summed up in a few keywords - higher order functions, partial application, pattern matching (and that curious ‘\_’ passed as an argument to Function.tupled)I’ll write a post about each of them because they require a separate treatment. Stay tuned :)