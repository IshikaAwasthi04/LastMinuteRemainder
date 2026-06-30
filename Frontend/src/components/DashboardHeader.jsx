import "./DashboardHeader.css";

function DashboardHeader() {

    return (

        <section className="dashboard-header">

            <div className="dashboard-content">

                <span className="dashboard-tag">

                    🚀 AI Productivity Dashboard

                </span>

                <h1>

                    Stay Ahead Of
                    <span className="highlight">
                        {" "}Every Deadline
                    </span>

                </h1>

                <p>

                    Your AI-powered planner keeps track of your daily progress,
                    motivates you to stay consistent, and helps you finish every
                    task before the deadline.

                </p>

            </div>

        </section>

    );

}

export default DashboardHeader;