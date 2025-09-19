'use client';
import { useState, useEffect, useRef } from 'react';

const PomodoroTimer = () => {
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const modeDurations = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60)
      .toString()
      .padStart(2, '0')}`;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            switch (mode) {
              case 'work':
                setMode('short');
                return modeDurations.short;
              case 'short':
                setMode('long');
                return modeDurations.long;
              case 'long':
              default:
                setMode('work');
                return modeDurations.work;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, mode]);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(modeDurations[mode]);
  };

  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer - {mode}</h2>
      <p className="text-6xl font-mono mb-6">{formatTime(secondsLeft)}</p>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => {
            setMode('work');
            setSecondsLeft(modeDurations.work);
            setIsRunning(false);
          }}
          className="text-sm px-3 py-1 bg-red-200 hover:bg-red-300 rounded"
        >
          Pomodoro
        </button>
        <button
          onClick={() => {
            setMode('short');
            setSecondsLeft(modeDurations.short);
            setIsRunning(false);
          }}
          className="text-sm px-3 py-1 bg-green-200 hover:bg-green-300 rounded"
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setMode('long');
            setSecondsLeft(modeDurations.long);
            setIsRunning(false);
          }}
          className="text-sm px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded"
        >
          Long Break
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <PomodoroTimer />
    </main>
  );
}
