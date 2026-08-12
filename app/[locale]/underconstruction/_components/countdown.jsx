"use client"

import { useEffect, useState } from 'react';

const Countdown = ({ targetDate, labelDays, labelHours, labelMinutes }) => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let time = {};

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    setTimeLeft(time);
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-[36px] md:text-[42px] xl:text-[56px] text-[#0A1B28] flex gap-[60px] justify-center">
      <div className="flex flex-col">
        <span className="font-bold text-primary">{timeLeft.days || "00"}</span>
        <span className="text-base">{labelDays}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-primary">{timeLeft.hours || "00"}</span>
        <span className="text-base">{labelHours}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-primary">{timeLeft.minutes || "00"}</span>
        <span className="text-base">{labelMinutes}</span>
      </div>
    </div>
  );
};

export default Countdown;
