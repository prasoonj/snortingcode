---
layout: post
title: Hadoop Installation Guide.
date: '2015-01-27T01:54:00+05:30'
tags:
- hadoop
- installation
- configuration
- mapreduce
tumblr_url: http://snortingcode.tumblr.com/post/109281232440/hadoop-installation-guide
---
This is the third machine I’m setting up with a pseudo-hadoop cluster and each time I have to look up different tutorials to get everything right. High time I wrote it all down (neatly) in my own little corner of the Internet as a refresher for the next time I have to do the same (will try to create –and test– a shell script that makes that as simple as executing a script).
$ sudo addgroup hadoop$ sudo adduser hduser(provide password and other details)
Quite clearly not a mandatory step but it would help to keep the system wide things out of the way of hadoop. Also, this is a good way to simulate the production environment - with no root permissions, and elevated priviledges, etc.
$ su - hduser$ ssh-keygen -t rsa -P ""
Switch to the ‘hduser’ user and generate a public/private rsa key pair. Hadoop uses SSH to connect with other nodes, make sure to use no password while creating the key pair. Accept defaults to save the key at ~/.ssh/id_rsa 
Add the newly created key to the authorized_keys:
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys$ ssh localhost
Add ''localhost’ permanetly to the list of ''known_hosts’.
Download the latest stable release of Hadoop 2 (make sure that the ''hduser’ is in the list of sudoers or do these tasks by switching to another user and later give proper permissions to hduser):
$ sudo mkdir -p /opt/hadoop2.6$ wget http://mirrors.gigenet.com/apache/hadoop/common/hadoop-2.6.0/hadoop-2.6.0.tar.gz -P /opt/hadoop2.6$ cd /opt/hadoop2.6$ sudo tar xzf hadoop-2.6.0.tar.gz
fileNow may be a good time to set a few environment variable so that we don’t have to type the entire path to use hadoop. Open your ~/.bashrc file and add these lines at the end (as indicated in this guide):
export HADOOP_PREFIX=/opt/hadoop2.6/hadoop-2.6.0export HADOOP_HOME=$HADOOP_PREFIXexport HADOOP_COMMON_HOME=$HADOOP_PREFIX
export HADOOP_CONF_DIR=$HADOOP_PREFIX/etc/hadoop
export HADOOP_HDFS_HOME=$HADOOP_PREFIX
export HADOOP_MAPRED_HOME=$HADOOP_PREFIX
export HADOOP_YARN_HOME=$HADOOP_PREFIX
Next, it’s time to tell hadoop which java to use. This is the only required configuration that you need to do according to the hadoop official documentation. Add the $JAVA_HOME to the $HADOOP_HOME/etc/hadoop/hadoop-env.sh file.
There are a bunch of configuration files under $HADOOP_HOME/etc/hadoop and it is a good idea to understand what each of it does, not because you would be needing all of them in order to get started but, it might save you some time later when you are trying to figure out how, for instance, the replication factor can be changed for the cluster.
The important ones are -
# in the file core-site.xml
<configuration>
{% highlight python %}
    <name>fs.defaultFS</name>
    <value>hdfs://localhost:9000</value>
{% endhighlight %}
</configuration># in the hdfs-site.xml
<configuration>
{% highlight python %}
    <name>dfs.replication</name>
    <value>1</value>
{% endhighlight %}
</configuration>
It’s time now to format the file-system:
$ $HADOOP_HOME/bin/hdfs namenode -format
We are nearly there! Start the deamons required for hadoop and create directories required to run M/R jobs:
$ HADOOP_HOME/sbin/start-dfs.sh$ hadoop fs -mkdir -p /user/hduser 
This will start the ''NameNode’, ''DataNode’ and ''SecondaryNameNode’ on your pseudo-cluster. Use the utility ''jps’ to see if they are started properly.
[TODO: Will add the yarn specific configuration steps to this soon.]
