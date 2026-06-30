import { useLocation } from "react-router-dom";
import { useState,useEffect} from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import TodayGoal from "../components/TodayGoal";
import StatsCard from "../components/StatsCard";
import ProgressBar from "../components/ProgressBar";
import MotivationCard from "../components/MotivationCard";
import ScheduleCard from "../components/ScheduleCard";
import AITipCard from "../components/AITipCard";
import RecreateButton from "../components/RecreateButton";
import { showNotification } from "../utils/notification";
 

import "./SchedulePage.css";

function SchedulePage() {

    const location = useLocation();

    const [schedule, setSchedule] = useState(location.state?.schedule);
    
    const taskId = location.state?.taskId;

useEffect(() => {

    if(schedule){

        localStorage.setItem(

            "currentSchedule",

            JSON.stringify(schedule)

        );

    }

},[schedule]);

useEffect(() => {

    if (!schedule) return;

    const nextTask = schedule.schedule.find(
        (item) => !item.completed
    );

    if (nextTask) {
        showNotification(
            "📌 Today's Task",
            nextTask.task
        );
    }

}, [schedule]);

useEffect(() => {

    if (!schedule) return;

    const deadline = new Date(schedule.deadline);
    const today = new Date();

    const daysLeft = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
    );

    const pendingTasks = schedule.schedule.filter(
        (item) => !item.completed
    ).length;

    if (daysLeft <= 2 && pendingTasks > 1) {

        showNotification(
            "⚠️ Deadline Alert",
            `Only ${daysLeft} day(s) left and ${pendingTasks} tasks are still pending!`
        );

    }

}, [schedule]);
useEffect(() => {

    const timer = setTimeout(() => {

        showNotification(

            "⏰ Reminder",

            "Don't forget today's scheduled task!"

        );

    },10000);

    return ()=>clearTimeout(timer);

},[]);

    if (!schedule) {
        return (
            <div className="empty-page">
                <h2>No Schedule Found 😢</h2>
            </div>
        );
    }

    const completedDays = schedule.schedule.filter(
        (item) => item.completed
    ).length;

    const totalDays = schedule.schedule.length;

    const handleRecreate = async () => {

        try {

            const response = await axios.post(

                "https://lastminuteremainder.onrender.com/api/ai/recreate-plan",

                {
                    taskId
                }

            );

            setSchedule(response.data.schedule);
         showNotification(
    "🔄 Schedule Updated",
    "AI has regenerated your schedule."
);
        }

        catch (error) {

            console.log(error);

        }

    };
   

useEffect(() => {
    showNotification(
        "🎉 Notifications Working!",
        "Your browser notifications are enabled."
    );
}, []);

    return (

        <>

            <Navbar />

            <div className="schedule-page">

                <div className="dashboard-section">

                    <DashboardHeader
                     />

                    <div className="stats-grid">

                        <StatsCard
                            icon="🔥"
                            title="Streak"
                            value="0"
                            subtitle="Keep Going"
                        />

                        <StatsCard
                            icon="⭐"
                            title="XP"
                            value={completedDays * 10}
                            subtitle="Earn More"
                        />

                        <StatsCard
                            icon="📅"
                            title="Days Left"
                            value={totalDays - completedDays}
                            subtitle="Remaining"
                        />

                        <StatsCard
                            icon="🎯"
                            title="Priority"
                            value={schedule.priority}
                            subtitle="AI Prediction"
                        />

                    </div>

                    <ProgressBar

                        completed={completedDays}

                        total={totalDays}
                       
    


                    />

                    <TodayGoal

                        schedule={schedule}
                        
    

                    />

                    <MotivationCard

                        motivation={schedule.motivation}
                     

                    />

                    <div className="schedule-container">

                        {

                            schedule.schedule.map((day, index) => (

                               <ScheduleCard
    key={day._id || index}
    day={day}
    taskId={taskId}
    schedule={schedule}
    setSchedule={setSchedule}
/>
                            ))

                        }

                    </div>

                    <AITipCard

                        tip={schedule.tip}
                        

                    />

                    <RecreateButton

                        onClick={handleRecreate}

                    />

                </div>

            </div>

        </>

    );

}

export default SchedulePage;