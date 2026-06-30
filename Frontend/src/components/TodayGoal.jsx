import "./TodayGoal.css";

function TodayGoal({ schedule }) {

  
    if (!schedule || !schedule.schedule) {
        return (
            <div className="today-goal-card">

                <h2>🎯 Today's Goal</h2>

                <p>No schedule generated yet.</p>

                <button
                    className="goal-btn"
                    onClick={() =>
                        document
                            .getElementById("task-form")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Generate Schedule
                </button>

            </div>
        );
    }

    const todayTask = schedule.schedule.find(
        (item) => !item.completed
    );

    if (!todayTask) {
        return (
            <div className="today-goal-card">

                <h2>🎉 Congratulations!</h2>

                <p>You completed every task.</p>

            </div>
        );
    }

    return (

        <div className="today-goal-card">

            <div className="goal-header">

                <h2>🎯 Today's Goal</h2>

                <span>Day {todayTask.day}</span>

            </div>

            <h3>{todayTask.task}</h3>

            <p>⏰ {todayTask.hours} Hours</p>

        </div>

    );

}

export default TodayGoal;