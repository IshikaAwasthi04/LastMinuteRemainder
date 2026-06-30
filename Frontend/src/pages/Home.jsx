//form
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Hero from "../components/Hero";
import FeatureCards from "../components/FeatureCards";
import TaskForm from "../components/TaskForm";
import Footer from "../components/Footer";
import LoadingOverlay from "../components/LoadingOverlay";
import NotificationPermission from "../components/NotificationPermission";
import Reminder from "../components/Reminder";
import "./Home.css";


function Home() {

const navigate=useNavigate();

const [taskName,setTaskName]=useState("");

const [deadline,setDeadline]=useState("");

const [hours,setHours]=useState("");

const [occupation,setOccupation]=useState("");

const [availableHours,setAvailableHours]=useState("");

const [weekendFree,setWeekendFree]=useState(false);
const [schedule, setSchedule] = useState(null);

const [workDays,setWorkDays]=useState("");

const [loading,setLoading]=useState(false);
//handleSubmit

const handleSubmit=async(e)=>{

e.preventDefault();

setLoading(true);

try{

const response=await axios.post(

"https://lastminuteremainder.onrender.com/api/ai/generate-plan",

{

taskName,

deadline,

hours,

occupation,

availableHours,

weekendFree,

workDays

}

);
setSchedule(response.data.schedule);

navigate(

"/schedule",

{

state:{

schedule:response.data.schedule,

taskId:response.data.taskId

}

}

);

}

catch(error){

    if(error.response){

        alert(error.response.data.message);

    }

    else{

        alert("Something went wrong.");

    }

}

finally{

setLoading(false);

}

};

return(

<>
<Reminder/>
<Background/>
<NotificationPermission />

<Navbar/>

<Hero schedule={schedule}/>

<FeatureCards/>

<TaskForm

taskName={taskName}

setTaskName={setTaskName}

deadline={deadline}

setDeadline={setDeadline}

hours={hours}

setHours={setHours}

occupation={occupation}

setOccupation={setOccupation}

availableHours={availableHours}

setAvailableHours={setAvailableHours}

workDays={workDays}

setWorkDays={setWorkDays}

weekendFree={weekendFree}

setWeekendFree={setWeekendFree}

handleSubmit={handleSubmit}

loading={loading}

/>

<Footer/>

{

loading&&

<LoadingOverlay/>

}

</>

);

}

export default Home;