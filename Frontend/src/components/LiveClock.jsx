import { useEffect, useState } from "react";
import "./LiveClock.css";

function LiveClock() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setTime(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="live-clock">

      <h2>

        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}

      </h2>

      <p>

        {time.toLocaleDateString([], {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}

      </p>

    </div>

  );

}

export default LiveClock;