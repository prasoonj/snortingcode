---
layout: post
title: Getting the data-types right or terribly wrong
date: '2017-12-08T00:09:10+05:30'
tags:
- data types
- data modeling
- types
tumblr_url: http://snortingcode.tumblr.com/post/168313491610/getting-the-data-types-right-or-terribly-wrong
---
As I explore the world of Functional Programming more, I can see myself getting obsessed with getting the Type system right for any app that I’m working on. While it is more natural and a lot easier to get the data types right when you work with pure code, it is not impossible to do so in the Object Oriented world either.Start with defining a ubiquitous language for the domain, design your models based on the domain of the problem you are trying to solve and don’t shy away from refactoring your code if it doesn’t make sense to you after a week of writing it!Let’s look at some examples of data-types that are easy to get wrong:      phone_number : Number
         book_ISBN : Number
        start_date : String
         area_code : Number
 record_identifier : Number
       temperature : Number

(The temperature as Number is a bit tricky, since while you can compare 2 different temperature measure, adding them does not make much sense. I would typically create a type alias for such a field.)Here are some simple rules that are good to keep in mind:Always assign data-type based on the operations allowed on the values.Use alias to make things more intuitive, eg. first_name + last_name has no meaning so, define a data-type as suchdata Name = StringThis would be a clever thing to do. Most functional languages have a clean way of defining such alias. Doing this for simple data-types in an Object Oriented language might feel like a pain though.Rule of thumb: Categorical data is never a Number! (caution: 0/1 can be both quantitative data or categorical data.)Rule of thumb: Look at what the aggregates on the data are possible - classification, averages, nothing. This is a good way to begin to understand what the data-type should be.If you are working on designing a model after looking at the raw data, do yourself a favor and ask for the meta-data instead. The meta on the data would tell you a lot more about it than the data itself (who would’ve thunk!)
