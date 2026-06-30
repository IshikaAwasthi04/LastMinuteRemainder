import "./MotivationCard.css";

function MotivationCard({ motivation }) {

    return (

        <section className="motivation-card">

            <div className="motivation-icon">
                💪
            </div>

            <div className="motivation-content">

                <span className="motivation-title">
                    AI Motivation
                </span>

                <p className="motivation-text">
                    {motivation}
                </p>

            </div>

        </section>

    );

}

export default MotivationCard;