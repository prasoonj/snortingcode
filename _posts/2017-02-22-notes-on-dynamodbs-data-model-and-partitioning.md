---
layout: post
title: Notes on DynamoDB’s data model and partitioning strategy
date: '2017-02-22T06:56:41+05:30'
tags:
- dynamodb
- nosql
- aws
- software design
tumblr_url: http://snortingcode.tumblr.com/post/157566677605/notes-on-dynamodbs-data-model-and-partitioning
---
DynamoDB is a fast, scaleable, managed document store from Amazon Web Services. Be sure to check it out if you have not done so already before starting with this post.

Designing a schema for a document store is remarkably different from a traditional relational data store. Most document/NoSQL persistence solutions sell their product with a tag line that often says - _“Store anything in any schema”_ but, the truth is a lot different. While a NoSQL document store does not expect you to follow a particular structure for each record (beyond the presence of a primary key), the reality is that if you don’t think through the design of your tables and the documents stored in them, you won’t be ale to go beyond a trivial =>
```
{“message” : “Hello World”}
```

Within the humble scope of this blog, I won’t be able to cover all design aspects of a document store. Let’s limit our coverage to trying to achieve an understanding of the DynamoDB’s data model and, how the schema design would affect the service availability and cost for your application.

Let’s look at how DynamoDB distributes the throughput that you assign to each of your tables:
>If you allocate throughput T to a table (which is what you pay for!) it would be divided evenly over all the partitions that the table has.

DyanmoDB is a managed service that promises a robust ‘scale-out’ mechanism to handle increased data load which means that the number of partitions would keep increasing as your table grows to accommodate more data. Each record for a given table has to have a primary key: a combination of a `hashKey` or `partitionKey` and an optional `rangeKey` or `sortKey`. The partitionKey (PK) is given to the dynamoDB’s hashing function that decides which partition it would be a part of (and consequently where to look for a particular record). Records with the same PK but a different RangeKey (RK) sit in the same partition in an order defined by the natural ordering of the RK.The hashing function of DyanmoDB tries to ensure that the records are evenly distributed across all partitions of the table.

In designing your DynamoDB schema, a rule of thumb is:
>Data access should be as evenly spread across all partitions as possible!

Let’s consider 2 scenarios:

* Scenario 1:
You are storing user details for a social networking website where all users are equally likely to request for the user resource over their lifetime of usage of the service. A perfectly valid choice for a PK in this case would be the userId. The hashing function would ensure that users are evenly spread across all partitions and the nature of your application and this particular data has a similar access pattern making your design rather simple.

* Scenario 2:
You want to store user history which would be used to pick the most recent user interactions to be displayed in a ticker. If we use the same strategy and persist the records with userId as PK, we would end up with a lot of ‘historical’ partitions that are very rarely or never accessed. Can’t be very bad, you’d say.Let’s look at what happens to the throughput of the table. As we saw earlier, the total throughput assigned to a table is evenly divided between all the partitions - restricting the maximum throughput to T/n on each partition
>(T := total_throughput, n := total_number_of_partitions).

You are essentially wasting a lot of dollars on throughput that you would never use! Your dynamoDB access would show throttling even though you see a lot of unused throughput for your table!

For such ‘time-series’ data a good strategy is to age out old data in tables with limited throughput and provide more throughput to ‘hot data’ that’s contained in time sensitive tables -  create new tables with higher throughput for hot data!

Here’s a quick recap and some important considerations:Throughput should be spread ONLY across frequently accessed data.A good way to show that the design has inherent weaknesses is to look for ‘scan’ operations over ‘query’. If your design requires a scan, there’s something wrong!DynamoDB automatically adds more partitions to your table as the data size grows, dividing the total throughput evenly across all of them.There might be a need to breakdown requests into smaller sizes - a query/scan that returns a massive response is bound to consume a major chunk of the allotted throughput and as a result throttle the database for other queries.

>TL;DR
Be very careful when designing a schema for storing time-series data in dynamoDB. Ensure that the assigned throughput is spread across all partitions containing ‘hot-data’ and is not wasted on partitions that are rarely used. Ensure that the data access pattern matches the hashing function - access should be evenly distributed over all partitions of the table.Create new tables with higher throughput in case of data that has a decline in usage as it ages.
