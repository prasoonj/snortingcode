---
layout: post
title: Higher Order Functions
date: '2018-01-24T07:59:12+05:30'
tags:
- functional programming
- scala
- fp
- programming
- higher order function
tumblr_url: http://snortingcode.tumblr.com/post/170074666785/higher-order-functions
path: /posts/higher-order-functiona
category: code
---
[This is part of a series of posts on Scala and Functional Programming:
Part 1: Scala Tricks - tupled/untupled

Part 2: Higher Order Functions

Part 3: Cooking yummy Functional code - (partial, curry, compose)!

For a basic introduction to Scala, syntax, etc. you can check out Scala Fast Lane
]]

Unless you’ve been living under a rock, you’ve heard about Higher Order Functions already. You might have even used them in your favorite programming languages. Hopefully, I’ll give some insights here that would cement your understanding of HOFs and motivate you to try a Functional Programming language that does a lot more with HOFs than your favorite programming language can do.

Quite simply, a Higher Order Function is one that takes another function as a parameter or returns another function as a result. But, let’s take a couple of steps back and look at what we mean by a “function”. The best way to understand this is to forget all you know about functions from a programming perspective and think of that old friend, Mathematics.

So, in mathematics, functions define a mapping between a domain and a co-domain. For instance, let’s consider a function that takes two number and returns the product of the two numbers:

scala> def mult(x: Int, y: Int): Int = x * y

mult: (x: Int, y: Int)Int

This should be fairly simple to understand but, let me add a quick explanation just to add rigor to the post: the function “mult” takes 2 Integer arguments in a single argument list (yes, we can have multiple argument lists to a function which, as it turns out, is very useful and we’ll explore it in a future post) - x and y, and returns another Integer that is the product of the two - x*y. (Yes, the return type should not be Int but, we’ll use this ‘problem’ to illustrate an important point in a future post - Scala types and pattern matching).

So, this stuff is easy. Running this code in a scala Repl would give you a function object that has a type: (Int, Int) => Int
Meaning, it takes two Integers and returns another Integer. Simple stuff so far.

Functions are just that, a relationship that converts one type to another using some defined transformations. Since, these functions are only defining the relationships that exists between two different ‘types’, we have a sense of “purity” when we talk about such functions - they don’t change over time and/or with parameters passed to them. The pure functions are like a Knight with a clear conscience - they always produce the same result for the same set of parameters!

There are 2 intuitions that might help in understanding “Pure Functions”:

Functions are relationships (also called “Morphisms” or simply “arrows” in Category Theory) between two types.
Functions try to define “what things are” not “how to perform a task”.
With that, let’s talk about functions in an imperative language like Java. In a language like Java/Python, etc. the programmer needs to define what to do with each parameter and how to produce the result. Functional Programming takes a different (better!) approach, it defines what things are and how to “make one given the other” and how to compose bigger ideas from smaller ideas.

Since a function, thus defined, is just an abstraction over a Type, we can tinker with it the way we like without disturbing its identity, by composing/decomposing functions together that don’t violate the restrictions that the Types impose on them (It is these restrictions that the functions must honor that give the teeth to these types!)

So, a good way to look at functions is by visualizing the whole code-base as a network where, contrary to a similar analogy in other languages, the functions are the edges of the graph and, the data (Types) flow via these edges from one Type to the other (or same like in our example above) bringing about the necessary transformations. This analogy, I think, is a great way to look at functional code and helps to design bigger, complicated systems.

Let’s look at how a higher order function would fit into this understanding. We know that functions can exist on their own (functions are first-class citizens in a functional programming language) or be part of an Object, in which case they are called methods (There’s a neat trick that converts a method to a function that we’ll talk about in a bit - lifting).

The compose-ability of pure functions (and the way they preserve the type system by definition) is what gives rise to the need (and use) of HOFs. Let’s expand on our tiny example a bit:

Let’s assume that the function mult (Int, Int) => Int is not just multiplying 2 Integers, but these Integers mean something. Let’s just say that this function mult defines the relationship between variables of a term in a linear equation:

def hypothesis(A, X) = ∑ (a*x) , for a in A and x in X

Here, A is a Vector of coefficients and X is a Vector representing some variables. More precisely, let’s define a few Types here to help the intuition we are trying to build:

scala> type A = Int
defined type alias A

scala> type B = Int
defined type alias B

scala> def hypothesis(a: Seq[A], x: Seq[X]) = ???
hypothesis: (a: A, b: B)Int



We’ve just defined some type alias. We can now use A, B for Int. Simple.

Our hypothesis(Seq[A], Seq[X]) is now a valid Scala function. We’ve not defined the implementation of this function yet, but, this is valid since function definitions are evaluated when they are called (every time they are called!)

Let’s try to implement this function and see how things go. We’ll start in a (mostly) imperative way and try to improve as we go along:

```

scala> def hypothesis(a: Seq[A], x: Seq[X]): Int =

```

This might look a bit disturbing if you come from an imperative world (which you most likely do) but, try spending a few minutes reading the code and see if it makes any sense to you before reading further.

The function hypothesis takes two Sequences as parameters (Think of Seq for now as a collection with an Iterator and Order between elements), zips them together forming a collection that has pairs (tuples), each of which has the first element from ‘a’ and the second element from ‘b’.

scala> val a = Seq(1, 2, 3, 4)
a: Seq[Int] = List(1, 2, 3, 4)

scala> val x = Seq(1, 2, 3, 4)
x: Seq[Int] = List(1, 2, 3, 4)

scala> a zip x
res12: Seq[(Int, Int)] = List((1,1), (2,2), (3,3), (4,4))
 

Alright, neat!

The construct:

for (e <- elems) yield (doSomething(e))

takes elements from ‘elems’ one at a time as ‘e’ and do something with that (any functional transformation, etc.) This would work well and is fairly easy to read and expressive enough to be understood in a shared code-base. The function ‘sum’ chained at the end would give us the summation that we required.

Let’s say the relationship between A and X changes and is not defined by a simple product but, some other function complexProd. This change would require us to re-write the definition of the hypothesis function and would lead to code duplication and in general would be a nasty thing to do! This is where HOFs would come to our rescue. Let’s see how:

scala> def betterHypo(a: Seq[A], x: Seq[X], f(a: A, x: X): Int): Int =
     | (for ((a, x) <- (a zip x)) yield f(a, x)).sum
betterHypo: (a: Seq[A], b: Seq[B], f: (Int, Int) => Int)Int


We’ve passed a function, ‘f(a: A, x: X): Int’ to this betterHypo function so that the way we define the relationship between A and X is abstracted out of the function. We can stretch this idea and think of functions that return functions that can later be applied to some parameters in another higher order function.

Just think of functions as an immutable system of arrows from one Type to the other which doesn’t care to say much about the individual elements of the Types alone but, about the Type itself. This is a good intuition to build and a nice parallel emerging from Category Theory.

In the next installment of these set of posts on Scala/FP, I would talk more about Partial Functions, partial application of functions and Currying. Go functional :)
