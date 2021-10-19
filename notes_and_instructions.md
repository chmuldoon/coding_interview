
# Instructions 

To run the script run the following in your terminal while within the repository 

```
npm run start
```


# Notes

I opted to use JavaScript for this challenge as its what I work with most of the time. I took a functional approach to the problem.

The steps are fairly simple:

1. Find the users whose names are in the input list.

2. Find the events of the users from the input list by indetifying them by their user_id

3. Sort our new found events by start time

4. From our list of events, find the time ranges where there is no event going on.

5. Return a list of free time slots 

I opted to separate the sorted events into separate lists of events for each day this allowed for a much cleaner and concise function for finding the available time blocks in the day. 

The most challenging part to write was the the findOpeningsInDay function. When I narrowed the scope of the function down to just a day it helped me simplify my though process. I knew iterating through the list of events while comparing the current time to the event's ranges, if the current time was before the beginning of the range then that would signify a free block, free blocks would be saved to the output. An additional condition was needed to change the current time to be able to handle additional events with earlier endtimes, so when the curren time is before the events end, the current time is then set to the end of the current event before the next iteration. By keeping track of this I was able to identify these free blocks of time in linear time.






