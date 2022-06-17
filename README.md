# Bot Variables (env/content) Comparator Tool

[Document Link](https://docs.google.com/document/d/1MMZb3HgrJxNG72WBoOBRCGBCvw8qvRcpeqX1gtOYpqc/edit?usp=sharing)

## Overview
This utility allow us to compare the bots content and environment variables from different environments like QA, Dev and Prod. Ideally in most of the bots we are storing message text in the content variables instead of hardcoding in the message / entity node. And when we change these variables value during client demo or POC and if we have more than 50 or 100 variables than its hard to remember that for which variables we changed the value.

## Why we need this ?
To identify the content or env  variables which have different / same values in different environments, we can use this utility. Suppose we are working for client X and we have two bots X_Dev and X_QA for Dev and QA environment respectively. Now if someone makes changes for couple of variables in X_QA bot only and now we need to keep the same content variables in X_Dev bot as well. So it is difficult to check for which variable value has been changed. Now we have only one way to check the differences that is we need to visit each varibales of X_Dev and X_QA bot manually. This comparator tool will remove this manual effort and this will provide the list of variables which have different values in dev and qa environment. We can also get the variables which have same value in both the bot variables by changing the configuration in the utility. 

## How to use ?
First we need to set the below configuration in config.json file.

* “**file_one**” => path fo the exported bot variables json file for a bot.
* “**file_two**” => path fo the exported bot variables json  file for another bot.
* “**variableType**” => (content or locale) / env
* “**filterType**” => “diff” or “same”, here “diff” will return the variables which have different values in both Dev and QA files. “same” will return the variables which have similar values in both Dev and QA files.
 
Once you done with the configuration you need to execute index.js file in terminal using below command
> node inexe.js

If you want to store the execution result in a text file, use below command. This will store your execution result in output.txt file.
> node index.js > output.txt
  
