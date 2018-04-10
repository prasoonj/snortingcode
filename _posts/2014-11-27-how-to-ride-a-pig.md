---
layout: post
title: How To Ride A Pig!
date: '2014-11-27T06:49:00+05:30'
tags:
- pig
- hadoop
- apachepig
- pigunit
tumblr_url: http://snortingcode.tumblr.com/post/103716546385/how-to-ride-a-pig
---
I was skeptical about using PIG. I mean, why should I be using a (limited?) set of statements when I can actually do as much (and as little) as I want to do while writing MapReduce jobs with Java! To cut a long story short, I’m a fan of Pig now. It has it’s problems but for most problems that the world has to offer, it works like a charm.
When to use:If you google the phrase “When to use pig over MR” you would get a million perspectives/opinions. The best I found was this flow-chart (don’t remember the source, please point me to it if you can):

Now, that we have the holy grail of all questions about Pig out of our way, let’s explore it a little bit.
InstallationThe installation guide walks you through the process. Personally, I found it exceptionally helpful to have the Pig plugin for eclipse (all it does is highlight my Pig Latin scripts but, even that is great help!) and write the code there. Writing the PigUnit test cases becomes easier then.
Sample Pig scriptHere’s a simple Pig script that does the following:1. Load a file with structured data into an ‘alias’ (think of them as variables that store the schema of the file that is loaded.2. Pickup a few columns from this file and do some manipulation on them.3. Store the result into another file.
--These are single line comments!--Load a file into an aliassample_raw = LOAD ''input.txt'' AS     (name:chararray, age:int, doge_score:int, hipster_score:int) USING PigStorage('','') ;--Do some manipulationssample_man = FOREACH sample_raw GENERATE     name, (doge_score + hipster_score) AS total_score ;--Store the results into a fileSTORE sample_man INTO ''sample_man.csv'' USING PigStorage('','') ; 
Though the script looks embarrassingly simple, a lot is happening under the hoods. Let’s start by defining some terminology:Bag - Think of that as a table in the relational world. It is a collection of tuples.Tuples - These are the individual records that a ''Bag’ contains.Columns - The columns inside a tuple.
One important thing to consider is that Pig interpreter ultimately creates MR jobs and runs them. However, the MR jobs are run only for statements like STORE and DUMP. Before that all that the script does is define schema for the file to be read and all manipulations are done using those schema. No file is read (however, if the file does not exist, your script will throw an exception).
So, the LOAD statement defines a schema for the Bag and stores it into an ''alias’ sample_raw. The part of that statement in “( )” is not required but it is useful so that you can call your fields with names instead of using positional notation like “$0, $1” etc.
The FOREACH statement would run through all the Tuples and manipulate them for us (this is the part that carries the logic that you would otherwise write in a mapper). Important to remember that even here no MR job is actually run till the script encounters a STORE/DUMP statement.
Finally, the STORE statement would run a MR job and store the results into the ''sample_man’ directory (The results file should be something like “sample_man/part-m-00000”).
Easy! Let’s take a look at testing this script now.
PigUnitThe PigUnit test framework is built on JUnit (yes, here you get to write some Java finally!) I would say that it is a work in progress because it comes with a lot of restrictions (as of version 0.13.0) but, it still works for most cases. 
Unit test strategyHere’s what I think is the best way to go about testing a Pig script:1. Have an input file with sample input (most examples show a String[] input/output, I think it defeats the purpose).2. LOAD the input into the alias by using the PigTest.override() method and passing the same query used in the script.3. Use the output file to compare with the alias.
Here’s a piece of sample code for the above script:
List<String> outputList = new ArrayList<String>();File outputFile = new File(PATH_TO_TEST_OUTPUT_FILE);Scanner sc = new Scanner(outputFile);while(sc.hasNext()){    outputList.add(sc.nextLine());}sc.close();String[] output = {};output = outputList.toArray(output);test.assertOutput("producer_raw", input, "producer_clean", output); 
(The PigTest, sadly, has a bunch of flavors of assertOutput but, they are not perfect. There is a method to test an alias against a file but it does not let me assign input to another alias at the same time. The method used above expects the last argument to be a String[]. The PigTest.override() method only takes a query for the second parameter and there is not way to assign an input there to an alias.)
One major advantage of using this approach of testing is that your test scripts remain more or less generic. Just pass the appropriate test input file and a corresponding test output file and you can sit back and watch your pig grunt away to glory!
Gotchas
Be careful with “;” at the end of a %DECLARE statement. It might become a part of the variable that you are declaring!
DEFINE does verbatim substitution. This is just a lexical substitution, the execution of say a UDF DEFINEd in the script would happen only inside the FOREACH. This can lead to problems when you wish to generate a unique value for a column per-file that you process that remain constant for all the records in that file.
Scalar assignment works with %DECLARE
Pig/PigUnit works in two modes - local and MapReduce. By default it runs in MapReduce mode!
The parser is not very intuitive. Test the script with DESCRIBE alias ; if you run into problems.
Accessing tuples inside a bag can vary based on the context - Bag::field_in_tuple, Bag.field_in_tuple.
Avoid copy-paste of column names, etc. from a rich-text editor. One of the worst bugs I encountered were the ones where a freak character was copied by accident into my script! Again, the exceptions that you would get are not very intuitive.
