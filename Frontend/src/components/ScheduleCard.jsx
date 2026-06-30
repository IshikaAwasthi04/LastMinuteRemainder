import { useState } from "react";
import "./ScheduleCard.css";
import axios from "axios";
import { showNotification } from "../utils/notification";

function ScheduleCard({ day, taskId, schedule, setSchedule }) {

  const [completed, setCompleted] = useState(day.completed || false);

  const handleCheck = async () => {

    try {

      await axios.put(
        `https://lastminuteremainder.onrender.com/api/tasks/${taskId}/day/${day.day}`,
        {
          completed: !completed
        }
      );

      // update local UI state
      setCompleted(!completed);

      // update schedule in memory (safe check added)
      const updated = schedule.schedule.map((item) => {

        if (item.day === day.day) {

          return {
            ...item,
            completed: !completed
          };

        }

        return item;

      });

      const newScheduleObj = {
        ...schedule,
        schedule: updated
      };

      // update parent state
      setSchedule(newScheduleObj);

      // sync localStorage (IMPORTANT for notifications)
      localStorage.setItem(
        "currentSchedule",
        JSON.stringify(newScheduleObj)
      );
// Find the next incomplete task
const nextTask = newScheduleObj.schedule.find(
  (item) => !item.completed
);

// If there is another task, notify the user
if (nextTask) {
  showNotification(
    "📌 Next Task",
    `Complete ${nextTask.day}: ${nextTask.task}`
  );
} else {
  showNotification(
    "🎉 Congratulations!",
    "You have completed all scheduled tasks."
  );
}
    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div className={`schedule-card ${completed ? "completed-card" : ""}`}>

      <div className="schedule-top">

        <span className="day-badge">
          📅 Day {day.day}
        </span>

        {completed ? (
          <span className="status completed">
            ✅ Completed
          </span>
        ) : (
          <span className="status pending">
            ⏳ Pending
          </span>
        )}

      </div>

      <h2 className={`task-title ${completed ? "completed-text" : ""}`}>
        📚 {day.task}
      </h2>

      <div className="task-info">

        <div className="info-box">
          ⏰ <span>{day.hours} Hours</span>
        </div>

        {day.time && (
          <div className="info-box">
            🕒 <span>{day.time}</span>
          </div>
        )}

      </div>

      <div className="checkbox-section">

        <label className="checkbox-container">

          <input
            type="checkbox"
            checked={completed}
            onChange={handleCheck}
          />

          <span className="checkmark"></span>

          Mark as Completed

        </label>

      </div>

      {completed && (
        <div className="completed-message">
          🎉 Excellent! You're one step closer to your deadline.
        </div>
      )}

    </div>

  );

}

export default ScheduleCard;