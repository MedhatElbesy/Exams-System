import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, handleSubmit }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(new Event("submit"));
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  return null;
};

export default Timer;
