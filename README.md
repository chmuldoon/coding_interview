
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

# Background

Most calendar applications provide some kind of "meet with" feature where the user
can input a list of coworkers with whom they want to meet, and the calendar will
output a list of times where all the coworkers are available.

For example, say that we want to schedule a meeting with Jane, John, and Mary on Monday.

- Jane is busy from 9am - 10am, 12pm - 1pm, and 4pm - 5pm.
- John is busy from 9:30am - 11:00am and 3pm - 4pm
- Mary is busy from 3:30pm - 5pm.

Based on that information, our calendar app should tell us that everyone is available:
- 11:00am - 12:00pm
- 1pm - 3pm

We can then schedule a meeting during any of those available times.


# Instructions

Given the data in `events.json` and `users.json`, build a script that displays available times
for a given set of users. For example, your script might be executed like this:

```
python availability.py Maggie,Joe,Jordan
```

and would output something like this:

```
2021-07-05 13:30 - 16:00
2021-07-05 17:00 - 19:00
2021-07-05 20:00 - 21:00

2021-07-06 14:30 - 15:00
2021-07-06 16:00 - 18:00
2021-07-06 19:00 - 19:30
2021-07-06 20:00 - 20:30

2021-07-07 14:00 - 15:00
2021-07-07 16:00 - 16:15
```


For the purposes of this exercise, you should restrict your search between `2021-07-05` and `2021-07-07`,
which are the three days covered in the `events.json` file. You can also assume working hours between
`13:00` and `21:00` UTC, which is 9-5 Eastern (don't worry about any time zone conversion, just work in
UTC). Optionally, you could make your program support configured working hours, but this is not necessary.


## Data files

### `users.json`

A list of users that our system is aware of. You can assume all the names are unique (in the real world, maybe
they would be input as email addresses).

`id`: An integer unique to the user

`name`: The display name of the user - your program should accept these names as input.

### `events.json`

A dataset of all events on the calendars of all our users.

`id`: An integer unique to the event

`user_id`: A foreign key reference to a user

`start_time`: The time the event begins

`end_time`: The time the event ends


# Notes

- Feel free to use whatever language you feel most comfortable working with
- Please provide instructions for execution of your program
- Please include a description of your approach to the problem, as well as any documentation about
  key parts of your code.
- You'll notice that all our events start and end on 15 minute blocks. However, this is not a strict
  requirement. Events may start or end on any minute (for example, you may have an event from 13:26 - 13:54).
