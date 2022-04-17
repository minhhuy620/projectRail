import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { dbstore } from "../../Firebase/firebase";
export const CountDownTime = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  let history = useHistory()
  const startTimer = () => {
    dbstore.collection("Ticket")
      .doc(localStorage.getItem("TicketID"))
      .onSnapshot((res) => {
        const countdownDate = new Date(res.data().Schedule.Route.DepartureTime.seconds * 1000).getTime();
        interval = setInterval(() => {
          const now = new Date().getTime();
          const distance = countdownDate - now;
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          if (distance < 0) {
            localStorage.setItem('distance', 'go');
            clearInterval(interval.current);
          } else {
            setTimerDays(days);
            setTimerHours(hours);
            setTimerMinutes(minutes);
            setTimerSeconds(seconds);
          }
        }, 1000);
      })

  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  const goMap = () => {
    return history.push("/maps");
  }
  return (
    <div className="container1">
      <h1 className="headline-1">Countdown to departure time:</h1>
      <div>
        <ul>
          <li className="time-countdown"><span>{timerDays}</span>days</li>
          <li className="time-countdown"><span>{timerHours}</span>Hours</li>
          <li className="time-countdown"><span>{timerMinutes}</span>Minutes</li>
          <li className="time-countdown"><span>{timerSeconds}</span>Seconds</li>
        </ul>
      </div>
      <button className="col-xl-3 col-lg-3 col-sm-3 btn btn-success mt-5 mb-10" onClick={goMap}>Go Map</button>
    </div>
  );
};
