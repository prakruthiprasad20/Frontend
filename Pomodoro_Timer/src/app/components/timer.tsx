// 'use client';
// import { useState, useEffect, useRef } from 'react';

// const timer = () => {
//   const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
//   const [secondsLeft, setSecondsLeft] = useState(25 * 60);
//   const [isRunning, setIsRunning] = useState(false);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const durations = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };

//   const formatTime = (s: number) =>
//     `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60)
//       .toString()
//       .padStart(2, '0')}`;

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setSecondsLeft((prev) => {
//           if (prev === 0) {
//             const next = mode === 'work' ? 'short' : mode === 'short' ? 'long' : 'work';
//             setMode(next as 'work' | 'short' | 'long');
//             return durations[next as keyof typeof durations];
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }   
//     return () => clearInterval(intervalRef.current!);
//   }, [isRunning, mode]);

//   const reset = () => {
//     setIsRunning(false);
//     setSecondsLeft(durations[mode]);
//   };

//   return (
//     // <div className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg max-w-xl mx-auto text-center">

//     //   <div className="flex flex-col items-center justify-center">

//     <div className="flex flex-col items-center justify-center w-full h-full">


//     {/* <div className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center"> */}


//  <div
//   className={`transition-colors duration-300 text-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center
//     ${
//       mode === 'work'
//         ? 'bg-red-900'
//         : mode === 'short'
//         ? 'bg-green-900'
//         : 'bg-blue-900'
//     }
//   `}
// >




//       <h2 className="text-5xl font-bold mb-4 capitalize">{mode} session</h2>
//       <p className="text-8xl font-mono mb-6">{formatTime(secondsLeft)}</p>
//       <div className="flex justify-center gap-4 mb-4">
//         <button
//           className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-base"
//           onClick={() => setIsRunning(!isRunning)}
//         >
//           {isRunning ? 'Pause' : 'Start'}
//         </button>
//         <button className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-base" onClick={reset}>
//           Reset
//         </button>
//       </div>
//       <div className="flex justify-center gap-2 text-base">
//         {(['work', 'short', 'long'] as const).map((type) => (
//           <button
//             key={type}
//             onClick={() => {
//               setMode(type);
//               setSecondsLeft(durations[type]);
//               setIsRunning(false);
//             }}
//             className={`px-3 py-1 rounded ${
//               mode === type ? 'bg-blue-500' : 'bg-zinc-600 hover:bg-zinc-700'
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>
//     </div>
// <p className="mt-6 text-center text-lg italic text-gray-400">
//       “Small steps every day.”
//     </p>
//   </div>
    
//   );
// };

// export default timer;




'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  mode: 'work' | 'short' | 'long';
  setMode: (m: 'work' | 'short' | 'long') => void;
};

const PomodoroTimer = ({ mode, setMode }: Props) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const durations = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  useEffect(() => {
    setSecondsLeft(durations[mode]); // reset timer when mode changes
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            const next = mode === 'work' ? 'short' : mode === 'short' ? 'long' : 'work';
            setMode(next);
            return durations[next];
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current!);
  }, [isRunning, mode, setMode]);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(durations[mode]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className={`transition-colors duration-300 text-white p-6 rounded-xl shadow-lg w-full max-w-xl text-center
          ${
            mode === 'work'
              ? 'bg-red-900'
              : mode === 'short'
              ? 'bg-green-900'
              : 'bg-blue-900'
          }
        `}
      >
        <h2 className="text-5xl font-bold mb-4 capitalize">{mode} session</h2>
        <p className="text-8xl font-mono mb-6">{formatTime(secondsLeft)}</p>
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="px-4 py-2 rounded bg-transparent hover:text-gray-400 text-base"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-4 py-2 rounded bg-transparent hover:text-gray-400 text-base"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        <div className="flex justify-center gap-2 text-base">
          {(['work', 'short', 'long'] as const).map((type) => (
            <button
              key={type}
              onClick={() => {
                setMode(type);
                setSecondsLeft(durations[type]);
                setIsRunning(false);
              }}
              className={`px-3 py-1 rounded ${
                mode === type ? 'bg-0' : 'bg-0 hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ✨ Inspiring Quote */}
      <p className="mt-6 text-center text-lg italic text-gray-400">
        “Small steps every day.”
      </p>
    </div>
  );
};

export default PomodoroTimer;
