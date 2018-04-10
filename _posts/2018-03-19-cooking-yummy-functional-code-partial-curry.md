---
layout: post
title: Cooking yummy Functional code - (partial, curry, compose)!
date: '2018-03-19T05:30:45+05:30'
tags:
- functional programming
- Scala
- currying
- partial function
- function composition
tumblr_url: http://snortingcode.tumblr.com/post/172028241525/cooking-yummy-functional-code-partial-curry
---
[This is part of a series of posts on Scala and Functional Programming:
Part 1: Scala Tricks - tupled/untupled

Part 2: Higher Order Functions

Part 3: Cooking yummy Functional code - (partial, curry, compose)!

For a basic introduction to Scala, syntax, etc. you can check out Scala Fast Lane
]

I don’t intend to turn this post into a click-bait article but, I find these 3 Functional Programming principles to be fundamental to understanding FP it well. Without them, you would write imperative code in your favorite functional programming language!

You would notice that they weave into each other and produce some rather beautiful imagery about FP.


>Partial Functions


Let’s begin with Partial functions. The idea is neat, if you have a function that takes several arguments, you can convert it into a function that that takes fewer arguments. You produce this magic by creating a function that fills-in the rest of the argument values and returning the same function.

In the example below, we’ll take a function ` f: (A, B) => C ` (takes 2 arguments of types A and B and returns a type C) and convert it into a partial function that takes the value for the first argument and returns a function that just needs the second argument to produce the C that you needed!

```
scala> def partial[A,B,C](a: A, f: (A,B) => C): B => C = (b:B) => f(a, b)
partial: [A, B, C](a: A, f: (A, B) => C)B => C

```
[If the parameterised type signature looks scary to you, you should read more about it and come back here. It is there for a reason. It emphasises the need for functions like these!]


> Currying


Next, let’s look at currying. A (rather silly) analogy to understand currying is to think of yourself as an indian housewife making a great indian curry for your family in the evening! The number of ingredients that you would need can be intimidating so there are 2 things you do -

Combine few ingredients together so that they are easier to handle (the typical off-the-shelf sambar poweder!).
Add them one after the other till you get the curry your family loves!
Currying converts a function that takes N arguments into a function that takes one argument. This new function returns another function. If we go back to our analogy, each ‘step’ in this currying process is a function application that takes you closer to your goal - the yummy result of a function that needs a ton of arguments.

```
scala> def curry[A,B,C](f: (A, B) => C): A => (B => C) = (a: A) => (b: B) => f(a, b)
curry: [A, B, C](f: (A, B) => C)A => (B => C)

```
There are reasons to confuse currying and partial functions. Here’s some insight that might help:

Look at the type signatures of the two:
```
partial: [A, B, C](a: A, f: (A, B) => C)B => C
```
vs
```
curry: [A, B, C](f: (A, B) => C)A => (B => C)
```

In partial, you are “applying” one of the arguments so the returned function is free of A. Its job is done! But, in curry, you get a function that needs just one of the arguments and passes the buck to the function that it then returns!

Think of a partial application as “forgetful” and currying as, well, like I said, the curry recipe will always be able to tell you how you reached there!

>  Function Composition


The last piece of the puzzle here is function composition. Well, TBH, I’m rather certain that you are already quite familiar with function composition so, I’ll include it here just for completeness (in some shallow sense :D )

The only analogy you need here is the idea of pipes from your terminal/shell! You “pipe” the output of one function as input to another function and you have function composition.

```
scala> def compose[A, B, C](f: B => C, g: A => B): A => C = (a: A) => f(g(a))
compose: [A, B, C](f: B => C, g: A => B)A => C
```

This is the same as: `g compose f or f andThen g`, where `compose` and `andThen` are utility functions provided by scala, which might make you notice that we did not use any magic function to explain what partial and curry were all about! Well, the magic of FP is probably hidden in the fact that there is no magic. We could use the elementary idea of higher order functions and build everything from there!
