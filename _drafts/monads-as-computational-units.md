---
layout: single
title:  "Monads as Computations"
header:
  teaser: "unsplash-gallery-image-2-th.jpg"
categories:
  - Jekyll
tags:
  - edge case
---
Monads are such an abstract idea that everyone interprets them in their own unique way, shaped by their understanding of the world around them - monads are just modelling the real world after all. The infamous "monadic curse" - one who understands monads loses the ability to explain it to others - is particularly true for that reason. The spiritual idea around that understanding is quite palpable in the FP community as well and I'm not surprised that it is a common theme since monads, just like a spiritual idea, are to be experienced not explained.

With that in mind, I've begun a journey to model the language comprehension/production areas of the human brain - broca and wernikie - using Scala by factoring in what I know about these areas:

  1. Broca is responsible for language production
  2. Wernicke is responsible for language comprehension
  3. Language is "scattered" in the brain as connections between different neurone.
  4. (assumption) Individual syllables are bound together as a single unit based on how often they are `queried` in a particular order.
  5. The "brain network" is essentially a fractal with a constant fractal dimension across the network.

Let's see what that might look like.

Consider searching a (possibly infinite) network of nodes for a solution to a constraint. Let's use some types to model the problem space:

```
type Node
