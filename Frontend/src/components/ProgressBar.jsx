import "./ProgressBar.css";

function ProgressBar({ completed, total }) {

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return (

        <section className="progress-section">

            <div className="progress-heading">

                <h2>Overall Progress</h2>

                <span>{percentage}%</span>

            </div>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{ width: `${percentage}%` }}

                ></div>

            </div>

            <p>

                {completed} of {total} Days Completed

            </p>

        </section>

    );

}

export default ProgressBar;