import { useEffect } from "react";

function Reminder(){

useEffect(()=>{

const interval = setInterval(()=>{

const data = localStorage.getItem("currentSchedule");

if(!data) return;

const schedule = JSON.parse(data);

const todayTask = schedule.schedule.find(

task=>!task.completed

);

if(!todayTask) return;

const now = new Date();

const hour = now.getHours();

const minute = now.getMinutes();

/*
For demo

Suppose current time is
7:24

Change this to

hour===7 && minute===25

Then after one minute notification appears.
*/

if(hour===9 && minute===0){

new Notification(

"Deadline Guardian AI",

{

body:`Today's Goal

${todayTask.task}

${todayTask.hours} Hours`

}

);

}

},60000);

return ()=>clearInterval(interval);

},[]);

return null;

}

export default Reminder;