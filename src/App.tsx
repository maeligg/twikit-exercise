import React, { useState } from "react";
import "./App.css";

function App() {
  const [timers, setTimers] = useState([
    {
      id: 0,
      creationTime: Date.now(),
      state: "idle",
      seconds: 0,
    },
  ]);
  const [intervalId, setIntervalId] = useState(0);
  const [sortFromOldest, setSortFromOldest] = useState(true);

  const updateTime = (timerId: number): void => {
    const newTimers = [...timers];
    const currentTimer = newTimers.find((timer) => timer.id === timerId);

    if (currentTimer) currentTimer.seconds += 1;
    setTimers(newTimers);
  };

  const startTimer = (timerId: number): void => {
    const newTimers = [...timers];
    const currentTimer = newTimers.find((timer) => timer.id === timerId);

    if (currentTimer?.state === "idle") {
      if (currentTimer) currentTimer.state = "started";
      setIntervalId(window.setInterval(() => updateTime(timerId), 1000));
    }
  };

  const stopTimer = (timerId: number): void => {
    const newTimers = [...timers];
    const currentTimer = newTimers.find((timer) => timer.id === timerId);

    if (currentTimer?.state === "started") {
      clearInterval(intervalId);
      currentTimer.state = "done";

      newTimers.push({
        id: newTimers.length,
        creationTime: Date.now(),
        state: "idle",
        seconds: 0,
      });

      setTimers(newTimers);
    }
  };

  const resetTimers = () => {
    setTimers([
      {
        id: 0,
        creationTime: Date.now(),
        state: "idle",
        seconds: 0,
      },
    ]);
  };

  const sortTimers = () => {
    const doneTimers = timers.filter((timer) => timer.state === "done");
    const otherTimers = timers.filter((timer) => timer.state !== "done");

    if (sortFromOldest) {
      doneTimers.sort((a, b) => b.creationTime - a.creationTime);
      setSortFromOldest(false);
    } else {
      doneTimers.sort((a, b) => a.creationTime - b.creationTime);
      setSortFromOldest(true);
    }

    setTimers([...doneTimers, ...otherTimers]);
  };

  return (
    <div className="container">
      <h1 className="title">Twikit time-it</h1>
      <div className="controls-wrapper">
        {timers.filter((timer) => timer.state === "done").length >= 2 && (
          <button className="control-button" onClick={sortTimers}>
            Sort
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.81425 4.82069L3.57673 3.05821V14.8352C3.57673 15.2384 3.90305 15.5646 4.30609 15.5646C4.70929 15.5646 5.03545 15.2383 5.03545 14.8352V3.05821L6.79793 4.82069C6.94037 4.96313 7.12796 5.03442 7.31353 5.03442C7.49911 5.03442 7.68672 4.96312 7.82914 4.82069C8.11417 4.53566 8.11417 4.0726 7.82914 3.78758L4.82356 0.781994C4.75613 0.714565 4.67354 0.660126 4.58353 0.622545C4.57982 0.620689 4.57611 0.620689 4.57224 0.618833C4.48981 0.585119 4.3998 0.566406 4.30608 0.566406C4.21235 0.566406 4.12234 0.585119 4.03976 0.618833C4.03604 0.620689 4.03233 0.620689 4.02847 0.622545C3.93846 0.659972 3.85602 0.71441 3.78844 0.781994L0.781156 3.78944C0.496125 4.07447 0.496125 4.53753 0.781156 4.82255C1.06619 5.10572 1.52925 5.10572 1.81427 4.82069L1.81425 4.82069Z" />
              <path d="M14.3204 11.3124L12.5579 13.0749V1.29626C12.5579 0.893053 12.2316 0.566895 11.8286 0.566895C11.4254 0.566895 11.0992 0.893219 11.0992 1.29626V13.0733L9.33673 11.3108C9.0517 11.0258 8.5905 11.0258 8.30362 11.3108C8.01859 11.5958 8.01859 12.0589 8.30362 12.3439L11.3109 15.3514C11.3783 15.4188 11.4609 15.4732 11.5509 15.5108C11.5546 15.5127 11.5584 15.5127 11.5622 15.5145C11.6446 15.5482 11.7347 15.5669 11.8284 15.5669C11.9221 15.5669 12.0121 15.5482 12.0947 15.5145C12.0984 15.5127 12.1021 15.5127 12.106 15.5108C12.196 15.4734 12.2784 15.4189 12.346 15.3514L15.3535 12.3439C15.6385 12.0589 15.6385 11.5958 15.3535 11.3108C15.0684 11.0276 14.6054 11.0276 14.3203 11.3125L14.3204 11.3124Z" />
            </svg>
          </button>
        )}
        {timers.some((timer) => timer.state === "done") && (
          <button className="control-button" onClick={resetTimers}>
            Restart
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.209961 7.70996C0.209961 3.55938 3.55938 0.209961 7.70996 0.209961C10.3212 0.209961 12.7821 1.67647 14.1369 3.69538C14.4254 4.12532 14.3107 4.70773 13.8808 4.99624C13.4508 5.28475 12.8684 5.1701 12.5799 4.74016C11.5441 3.19653 9.64556 2.08496 7.70996 2.08496C4.59491 2.08496 2.08496 4.59491 2.08496 7.70996C2.08496 10.825 4.59491 13.335 7.70996 13.335C10.7451 13.335 13.2352 10.9217 13.3355 7.9131C13.3527 7.39562 13.7862 6.9901 14.3037 7.00735C14.8212 7.0246 15.2267 7.45808 15.2094 7.97556C15.0753 11.9982 11.7529 15.21 7.70996 15.21C3.55938 15.21 0.209961 11.8605 0.209961 7.70996Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.5693 0.209961C14.0871 0.209961 14.5068 0.629694 14.5068 1.14746V4.66308C14.5068 5.18085 14.0871 5.60058 13.5693 5.60058H10.0771C9.55938 5.60058 9.13965 5.18085 9.13965 4.66308C9.13965 4.14532 9.55938 3.72558 10.0771 3.72558H12.6318V1.14746C12.6318 0.629694 13.0516 0.209961 13.5693 0.209961Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="timer-wrapper">
        {timers.map((timer) => (
          <div className="timer" key={timer.id}>
            {timer.state === "done" ? (
              <button className="done">
                Done
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.86228 15.1002C6.47202 15.703 7.46929 15.6498 8.0111 14.9848L17.8684 2.89203C18.3754 2.26977 18.2823 1.35381 17.6601 0.846819C17.0378 0.339826 16.1218 0.432958 15.6148 1.05519L6.78387 11.9186L3.43701 8.61334C2.86613 8.04821 1.94528 8.05411 1.38114 8.625C0.816013 9.19587 0.821908 10.1167 1.3928 10.6809L5.86225 15.1006"
                  />
                </svg>
              </button>
            ) : timer.state === "started" ? (
              <button className="active" onClick={() => stopTimer(timer.id)}>
                Stop
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.570312 3.28522C0.570312 1.90443 1.68959 0.785156 3.07038 0.785156H13.0702C14.451 0.785156 15.5703 1.90443 15.5703 3.28522V13.2851C15.5703 14.6659 14.451 15.7852 13.0702 15.7852H3.07038C1.68959 15.7852 0.570312 14.6659 0.570312 13.2851V3.28522Z" />
                </svg>
              </button>
            ) : (
              <button className="idle" onClick={() => startTimer(timer.id)}>
                Start
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.0244141 14.0827C0.0615312 15.5724 1.73035 16.4746 3.19241 15.7654L14.9496 9.66461C15.5899 9.33191 16.0244 8.72236 16.0244 8.00799C16.0244 7.29362 15.5899 6.68388 14.9496 6.35134L3.19241 0.259347C1.73041 -0.449905 0.0615249 0.443546 0.0244141 1.93337V14.0827Z" />
                </svg>
              </button>
            )}
            <div>
              <span className="seconds">{timer.seconds}</span> Sec
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
