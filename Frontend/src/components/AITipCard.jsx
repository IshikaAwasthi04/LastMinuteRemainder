import "./AITipCard.css";

function AITipCard({ tip }) {

  return (

    <div className="tip-card">

      <h2>

        💡 AI Productivity Tip

      </h2>

      <p>

        {tip}

      </p>

    </div>

  );

}

export default AITipCard;