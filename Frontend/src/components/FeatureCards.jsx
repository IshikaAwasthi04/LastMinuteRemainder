import "./FeatureCards.css";

function FeatureCards() {

  const features = [

    {
      icon: "🤖",
      title: "AI Schedule",
      desc: "Creates personalized plans based on your deadline and availability."
    },

    {
      icon: "📈",
      title: "Track Progress",
      desc: "Mark daily tasks complete and visualize your productivity."
    },

    {
      icon: "🔄",
      title: "Adaptive Planning",
      desc: "Regenerates your schedule automatically if you fall behind."
    },

    {
      icon: "⏰",
      title: "Smart Reminders",
      desc: "Never forget important deadlines and daily tasks."
    }

  ];

  return (

    <section className="features-section" id="features">

      <h2>Why Choose Deadline Guardian?</h2>

      <div className="features-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default FeatureCards;