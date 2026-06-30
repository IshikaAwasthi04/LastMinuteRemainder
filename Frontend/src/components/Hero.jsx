import "./Hero.css";
import TodayGoal from "./TodayGoal";

function Hero({schedule}) {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          🚀 AI Powered Productivity Assistant
        </span>

        <h1>
          Never Miss
          <br />
          Another
          <span className="gradient-text">
            {" "}Deadline
          </span>
        </h1>

        <p>
          Generate smart AI study schedules, track your daily progress,
          recreate plans automatically if you fall behind, and finish
          every task before the deadline.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn"
          onClick={()=>{
document
.getElementById("task-form")
.scrollIntoView({
behavior:"smooth"
});
}}>
            ✨ Generate Schedule
          </button>

          <button className="secondary-btn"
          onClick={()=>{
document
.getElementById("features")
.scrollIntoView({
behavior:"smooth"
});
}}>
            Learn More
          </button>

        </div>

      </div>
      <div className="hero-right">

    <TodayGoal schedule={schedule}/>

</div>

      {/* <div className="hero-right">

        <div className="glass-card">

          <h2>Today's Goal 🎯</h2>

          <div className="goal-box">
            📚 Complete DBMS Revision
          </div>

          <div className="goal-box">
            ⏳ AI predicts 92% completion
          </div>

          <div className="goal-box">
            🔥 Current Streak : 6 Days
          </div>

        </div>

      </div> */}

    </section>
  );
}

export default Hero;