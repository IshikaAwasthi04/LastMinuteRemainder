import "./StatsCard.css";

function StatsCard({

    icon,

    title,

    value,

    subtitle

}){

    return(

        <div className="stats-card">

            <div className="stats-icon">

                {icon}

            </div>

            <div>

                <h4>{title}</h4>

                <h2>{value}</h2>

                <small>{subtitle}</small>

            </div>

        </div>

    );

}

export default StatsCard;