import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [hours, setHours] = useState("");
  const [occupation, setOccupation] = useState("");
  const [availableHours, setAvailableHours] =useState("");
  const [weekendFree, setWeekendFree] = useState(false);
  const [workDays, setWorkDays] = useState("");
  const [task, setTask] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const navigate = useNavigate();


 const handleSubmit = async (e) => {
  e.preventDefault();

  const taskData = {
    taskName,
    deadline,
    hours,
    occupation,
    availableHours,
    weekendFree,
    workDays,
  };
  console.log("Generate Plan clicked");

  try {

    const response = await axios.post(
      "http://localhost:5000/api/ai/generate-plan",
      taskData
    );

    // console.log(response.data);

   navigate("/schedule",{state:{schedule:response.data.schedule,
    taskId: response.data.taskId,
   },

});
     console.log(response.data.schedule);

  } catch (error) {

    console.log(error);

  }
 
};



  return (
    <div style={{ padding: "20px" }}>
      <h1>Deadline Guardian AI</h1>

      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <br /><br />

      
<label>Deadline</label>
<br/>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <br /><br />
      

      <select
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      >
        <option value="">Select Occupation</option>
        <option value="Student">Student</option>
        <option value="Employee">Employee</option>
        <option value="Freelancer">Freelancer</option>
        <option value="Entrepreneur">Entrepreneur</option>
      </select>

      <br /><br />
     <label>Available Hours Per Day: </label>

<input
  type="number"
  min="1"
  value={availableHours}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "" || value >= 1 && value<=24) {
      setAvailableHours(value);
    }
  }}
/>
<br/><br/>
<label>
  How Many Days Do You Want To Work?
</label>
<br/>

<input
  type="number"
  value={workDays}
  onChange={(e) =>
    setWorkDays(e.target.value)
  }
/>
<br/><br/>


  <label>Are you free on weekends?</label>

 
    <label>

      <input
        type="radio"
        checked={weekendFree === true}
        onChange={() => setWeekendFree(true)}
      />

      Yes

    </label>

    <label>

      <input
        type="radio"
        checked={weekendFree === false}
        onChange={() => setWeekendFree(false)}
      />

      No

    </label>

  
  
<br/><br/>

      <button onClick={handleSubmit}>Generate Plan</button>

 {schedule && (
  <div className="schedule-box">

    <h2>📅 AI Generated Plan</h2>

    <p>
      <strong>Priority:</strong> {schedule.priority}
    </p>

    <p>
      <strong>Deadline Status:</strong> {schedule.deadlineStatus}
    </p>

    <p>
      <strong>Motivation:</strong> {schedule.motivation}
    </p>

    <p>
      <strong>Tip:</strong> {schedule.tip}
    </p>

    <p>
      <strong>Buffer Day:</strong> {schedule.bufferDay}
    </p>

    <h3>Daily Schedule</h3>

    {schedule.schedule.map((item, index) => (
      <div key={index}>

        <p>
          📅 <strong>Day {item.day}</strong>
        </p>

        <p>
          ✅ {item.task}
        </p>

        <p>
          ⏰ {item.hours} Hours
        </p>

        <hr />

      </div>
    ))}

  </div>
)}


    </div>


  );
}

export default Home;