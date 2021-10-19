
// This was my initial code for findOpeningsInADay
// While initially writing this logic made sense ans still does
// Through logging the routes events took through the conditions
// I realized a most lines were redundant 

// I switched a  variable from an object which I called a timeBlock
// to a string called currentTime, I did not need to keep track of a start
// and end but rather just a single time and it's respective range to
// the events start and end 

const findOpeningsInDay = dayOfEvents => {
  const day = parseDate(dayOfEvents[0].start_time)
  const startOfDay = day + "T" + "13:00:00"
  const endOfDay =  day + "T" + "21:00:00"
  let output = []
  let timeBlock = {
    start_time: startOfDay,
    end_time: startOfDay
  }
  for (let i = 0; i < dayOfEvents.length; i++) {
    const event  = dayOfEvents[i];
    if(timeBlock["end_time"] === endOfDay) break


    if(timeBlock["end_time"] < event["start_time"]){
      timeBlock["end_time"] = event["start_time"]
   
    }else { 
      
      if (event["end_time"] > timeBlock["end_time"]){
        timeBlock["start_time"] = event["end_time"];
        timeBlock["end_time"] = event["end_time"];
      }
    }

    if(timeBlock["start_time"] !== timeBlock["end_time"]){
      output.push(Object.assign({}, timeBlock))
      if (event["end_time"] > timeBlock["end_time"]){
        timeBlock["start_time"] = event["end_time"];
        timeBlock["end_time"] = event["end_time"];
      }
    }

    if(i === dayOfEvents.length - 1 && timeBlock["end_time"] < endOfDay){
      timeBlock["start_time"] = timeBlock["end_time"]
      timeBlock["end_time"] = endOfDay
      output.push(Object.assign({}, timeBlock))
    }
  }
  return output;

}