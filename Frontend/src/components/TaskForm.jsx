import "./TaskForm.css";
import GenerateButton from "./GenerateButton";

function TaskForm({

    taskName,
    setTaskName,

    deadline,
    setDeadline,

    occupation,
    setOccupation,

    availableHours,
    setAvailableHours,

    workDays,
    setWorkDays,

    weekendFree,
    setWeekendFree,

    handleSubmit,

    loading

}) {

    return (

        <section id="task-form" className="task-form-section">

            <form
                className="task-form"
                onSubmit={handleSubmit}
            >

                <h2>✨ Create Your AI Schedule</h2>

                <p>
                    Tell us about your task and let AI build the perfect study plan.
                </p>

                <div className="form-grid">

                    <div className="input-box">

                        <input
                            type="text"
                            required
                            value={taskName}
                            onChange={(e)=>setTaskName(e.target.value)}
                        />

                        <label>
                            📝 Task Name
                        </label>

                    </div>

                    <div className="input-box">

                        <select
                            required
                            value={occupation}
                            onChange={(e)=>setOccupation(e.target.value)}
                        >

                            <option value=""></option>

                            <option value="Student">
                                Student
                            </option>

                            <option value="Employee">
                                Employee
                            </option>

                            <option value="Freelancer">
                                Freelancer
                            </option>

                            <option value="Entrepreneur">
                                Entrepreneur
                            </option>

                        </select>

                        <label>
                            👨‍💻 Occupation
                        </label>

                    </div>

                    <div className="form-group">

    <label>

        📅 Deadline

    </label>

    <input
        type="date"
        value={deadline}
        onChange={(e)=>setDeadline(e.target.value)}
        required
    />

</div>

                    <div className="input-box">

                        <input
                            type="number"
                            min="1"
                            max="24"
                            required
                            value={availableHours}
                            onChange={(e)=>setAvailableHours(e.target.value)}
                        />

                        <label>
                            🕒 Available Hours / Day
                        </label>

                    </div>

                    <div className="input-box">

                        <input
                            type="number"
                            min="1"
                            required
                            value={workDays}
                            onChange={(e)=>setWorkDays(e.target.value)}
                        />

                        <label>
                            📆 Working Days
                        </label>

                    </div>

                </div>

                <div className="weekend-box">

                    <h3>
                        🌴 Weekend Availability
                    </h3>

                    <div className="radio-group">

                        <label>

                            <input
                                type="radio"
                                checked={weekendFree===true}
                                onChange={()=>setWeekendFree(true)}
                            />

                            Yes

                        </label>

                        <label>

                            <input
                                type="radio"
                                checked={weekendFree===false}
                                onChange={()=>setWeekendFree(false)}
                            />

                            No

                        </label>

                    </div>

                </div>

                <GenerateButton loading={loading}/>

            </form>

        </section>

    );

}

export default TaskForm;