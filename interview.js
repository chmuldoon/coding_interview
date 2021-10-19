const usersList = require("./users.json");
const eventsList = require("./events.json");

// Helper Functions

// Parse days or times from start_time/end_times from events

const parseDate = date => date.slice(0,10)
const parseTime = date => date.slice(11)

// takes in an object with a start_time and end_time attributes and returns a string formated
// like 2021-07-06 14:30:00-15:00:00

const parseFreeTime = event => {
  return `${parseDate(event.start_time)} ${parseTime(event.start_time)}-${parseTime(event.end_time)}`
}

// sorts a list of events by start time asecnding

const sortEvents = eventList => eventList.sort((a,b) => a.start_time > b.start_time ? 1 : -1);

//  finds the user ids of users mentioned in initial input

const convertUserNameListToIds = userNameList => {
  let userIdList = [];
  for (let i = 0; i < usersList.length; i++) {
    currUser = usersList[i];
    if(userNameList.includes(currUser.name)) userIdList.push(currUser.id)  
  }
  return userIdList;
}

// takes a list of user ids as input and returns a list of the users' respective events

const findUserEvents = (userIdList) => {
  let output = [];
  for (let i = 0; i < eventsList.length; i++) {
    const currEvent = eventsList[i];
    if(userIdList.includes(currEvent["user_id"])) output.push(currEvent)
  }
  return output;
}

// take a sorted list of events and returns a 2d array of lists of events separated by date

const separateDays = sortedList => {
  let output = [[sortedList[0]]]
  let outPutIdx = 0
  let lastDay = parseDate(sortedList[0].start_time)
  for (let i = 1; i < sortedList.length; i++) {
    const event = sortedList[i];
    if(event.start_time.includes(lastDay)){
      output[outPutIdx].push(event)
    }else{
      output.push([event])
      lastDay = parseDate(event.start_time)
      outPutIdx++
    }
  }
  return output;
}

// takes a list of user names as an input
// utilizes previously defined functions to return a 2d array of 
// the respective users' events sorted and separated by day

const getSortedEventsFromUserNames = userNameList => {
  const ids = convertUserNameListToIds(userNameList);
  const userEvents = findUserEvents(ids);
  const sortedEventList = sortEvents(userEvents);
  return separateDays(sortedEventList);
}

// takes in a list of sorted events sharing the same day as an input
// returns a list of objects with start_time and end_times corresponding
// to times in which there are no events from the list taking place

const findOpeningsInDay = (
  dayOfEvents,
  startTime="13:00:00",
  endTime="21:00:00"
  ) => {
  // saves important date data to variables for easy access down the line
  const day = parseDate(dayOfEvents[0].start_time);
  const startOfDay = day + "T" + startTime;
  const endOfDay =  day + "T" + endTime;

  let freeTimeBlocks = [];

  let currentTime = startOfDay;

  // iterates through a list sorted events
  for (let i = 0; i < dayOfEvents.length; i++) {
    const { start_time, end_time } = dayOfEvents[i];

    if(currentTime === endOfDay) break;
    // If there is time between the currentTime and the start of the current event
    // that range is event free and an object will be made and pushed to our output
    if (currentTime < start_time) freeTimeBlocks.push({
      start_time: currentTime,
      end_time: start_time
    });
    
    // with our free time slot already accounted for
    // we can compare our currentTime with the end time of the event
    // if our currentTime is before the end time we will reassign it to the events end time
    if(currentTime < end_time) currentTime = end_time;


    // clean up for the edge case of when the day's events end before
    // the end of the day
    if(i === dayOfEvents.length - 1 && currentTime < endOfDay) {
      freeTimeBlocks.push({
        start_time: currentTime,
        end_time: endOfDay
      });
    }
  }

  return freeTimeBlocks;
}


// Takes in a list of user names
// Returns a 2d array of lists of free times separated by day

const findCommonTimesBetweenUsers = userNameList => {
  const dayOfEvents = getSortedEventsFromUserNames(userNameList);
  const openings = dayOfEvents.map(day => findOpeningsInDay(day))
  return openings;
}

// Optional Function that formats the output of findCommonTimesBetweenUsers
// for console
const formatResultForConsole = commonTimes => {
  console.log("Available Times:")
  console.log("----------------------------");
  commonTimes.forEach(day => {
    if(day.length > 0) {
      day.forEach(time => {
        console.log(parseFreeTime(time));
      })
      console.log("----------------------------");
    }
   
  })
  return;
}

/*
Format of Results: 

Available Times:
----------------------------
2021-07-05 15:30:00-19:00:00
2021-07-05 19:30:00-20:00:00
----------------------------
2021-07-06 14:30:00-15:00:00
2021-07-06 19:00:00-19:30:00
----------------------------
2021-07-07 15:00:00-15:15:00
2021-07-07 15:45:00-16:00:00
2021-07-07 18:30:00-19:00:00
2021-07-07 19:30:00-20:00:00
----------------------------
*/

// Examples

console.log("Times for Maggie, Joe and Jordan");
formatResultForConsole (
  findCommonTimesBetweenUsers(["Maggie",  "Joe", "Jordan"])
)

console.log("Times for Emily, Joe, John, Nick and Jordan");
formatResultForConsole (
  findCommonTimesBetweenUsers(["Emily",  "Joe", "John", "Nick", "Jordan"])
)

console.log("Times for Everyone");
formatResultForConsole (
  findCommonTimesBetweenUsers(["Jane", "John", "Maggie", "Nick", "Emily", "Joe", "Jordan"])
)