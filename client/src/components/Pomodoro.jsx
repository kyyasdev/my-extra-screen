import { useState, useEffect, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';

const Pomodoro = ({ workTime, restTime }) => {
  const [timeLeft, setTimeLeft] = useState(workTime * 60); // Convert to seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const prevWorkTimeRef = useRef(workTime);
  const prevRestTimeRef = useRef(restTime);

  // Update timeLeft when workTime or restTime changes (only if settings actually changed)
  useEffect(() => {
    const workTimeChanged = prevWorkTimeRef.current !== workTime;
    const restTimeChanged = prevRestTimeRef.current !== restTime;

    if (workTimeChanged || restTimeChanged) {
      // Only reset if timer is not running and we're in the corresponding session
      if (!isRunning) {
        if (isWorkSession && workTimeChanged) {
          setTimeLeft(workTime * 60);
        } else if (!isWorkSession && restTimeChanged) {
          setTimeLeft(restTime * 60);
        }
      }
      prevWorkTimeRef.current = workTime;
      prevRestTimeRef.current = restTime;
    }
  }, [workTime, restTime, isWorkSession, isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Session completed - stop the timer
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  // Handle session completion and auto-start next session
  useEffect(() => {
    if (timeLeft === 0 && isCompleted && !isRunning) {
      // Switch to rest if work session completed, or back to work if rest completed
      const newSessionType = !isWorkSession;
      setIsWorkSession(newSessionType);
      // Set new session time
      const newTime = (newSessionType ? workTime : restTime) * 60;
      setTimeLeft(newTime);
      // Auto-start the new session after a brief delay
      setTimeout(() => {
        setIsRunning(true);
        setIsCompleted(false);
      }, 500);
    }
  }, [timeLeft, isCompleted, isRunning, isWorkSession, workTime, restTime]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeft((isWorkSession ? workTime : restTime) * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progress = isWorkSession
    ? ((workTime * 60 - timeLeft) / (workTime * 60)) * 100
    : ((restTime * 60 - timeLeft) / (restTime * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Timer Display */}
      <div className="relative">
        {/* Circular Progress */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg
            className="transform -rotate-90 w-full h-full"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={isWorkSession ? '#6366f1' : '#10b981'}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl md:text-7xl font-light text-white font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      {/* Session Type */}
      <div className="align-middle">
        <div
          className={`text-2xl md:text-3xl font-semibold mb-2 ${
            isWorkSession ? 'text-indigo-400' : 'text-green-400'
          }`}
        >
          {isWorkSession ? 'Work Session' : 'Rest Session'}
        </div>
        {isCompleted && (
          <p className="text-white/70 text-sm">Session completed!</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleStartPause}
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 transition-colors"
          aria-label={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? (
            <PauseIcon className="text-3xl" />
          ) : (
            <PlayArrowIcon className="text-3xl" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          aria-label="Reset"
        >
          <RefreshIcon className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
