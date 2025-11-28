import { useState, useEffect } from 'react';

const Clock = ({ timeFormat, showSeconds }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (timeFormat === '12h') {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      hours = hours.toString().padStart(2, '0');
    } else {
      hours = hours.toString().padStart(2, '0');
    }

    return { hours, minutes, seconds, ampm };
  };

  const formatDate = (date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayName}, ${month} ${day}, ${year}`;
  };

  const { hours, minutes, seconds, ampm } = formatTime(time);
  const dateString = formatDate(time);

  return (
    <>
      {/* Date */}
      <time
        dateTime={time.toISOString()}
        className="text-white/70 font-normal tracking-[0.1em] uppercase text-base md:text-2xl font-sans"
        aria-label={`Current date: ${dateString}`}
      >
        {dateString}
      </time>

      {/* Main Clock */}
      <div
        className="flex items-baseline gap-4 md:gap-8 font-mono"
        role="timer"
        aria-label={`Current time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      >
        <time
          dateTime={`${hours}:${minutes}:${seconds}`}
          className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white leading-none tracking-[-0.02em] [text-shadow:0_0_40px_rgba(99,102,241,0.5),0_0_80px_rgba(139,92,246,0.3)]"
          aria-label={`${hours} hours`}
        >
          {hours}
        </time>
        <span
          className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white/30 leading-none"
          aria-hidden="true"
        >
          :
        </span>
        <time
          dateTime={`${hours}:${minutes}:${seconds}`}
          className="text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem] font-light text-white leading-none tracking-[-0.02em] [text-shadow:0_0_40px_rgba(99,102,241,0.5),0_0_80px_rgba(139,92,246,0.3)]"
          aria-label={`${minutes} minutes`}
        >
          {minutes}
        </time>
        {showSeconds ? (
          <div className="relative">
            {timeFormat === '12h' && ampm && (
              <span className="absolute bottom-full left-0 text-[1.75rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-white/50 leading-none mb-1">
                {ampm}
              </span>
            )}
            <time
              dateTime={`${hours}:${minutes}:${seconds}`}
              className="text-[1.75rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-white/50 leading-none block"
              aria-label={`${seconds} seconds`}
            >
              {seconds}
            </time>
          </div>
        ) : (
          timeFormat === '12h' &&
          ampm && (
            <span className="text-[1.75rem] sm:text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-light text-white/50 leading-none block">
              {ampm}
            </span>
          )
        )}
      </div>
    </>
  );
};

export default Clock;
