// // src/app/components/Sidebar.tsx
// 'use client';
// import { useState } from 'react';

// const sidebar = () => {
//   const [active, setActive] = useState('pomodoro');

//   const menuItems = [
//     { name: 'Pomodoro', key: 'pomodoro' },
//     { name: 'Stopwatch', key: 'stopwatch' },
//     { name: 'Countdown', key: 'countdown' },
//     { name: 'To-Do', key: 'todo' },
//     { name: 'Stats', key: 'stats' },
//   ];

//   return (
//     <aside className="w-64 min-h-screen bg-white shadow-md p-4 space-y-4">
//       <h2 className="text-2xl font-bold mb-6">🧠 Dashboard</h2>
//       <nav className="space-y-2">
//         {menuItems.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => setActive(item.key)}
//             className={`block w-full text-left px-4 py-2 rounded-md ${
//               active === item.key
//                 ? 'bg-blue-500 text-white'
//                 : 'hover:bg-gray-100 text-gray-700'
//             }`}
//           >
//             {item.name}
//           </button>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default sidebar;





'use client';
import { FaRegClock, FaStopwatch, FaHourglassHalf, FaListAlt, FaChartBar } from 'react-icons/fa';

type Props = {
  active: string;
  setActive: (key: string) => void;
};

const menu = [
  { key: 'pomodoro', icon: <FaRegClock />, label: 'Pomodoro' },
  { key: 'stopwatch', icon: <FaStopwatch />, label: 'Stopwatch' },
  { key: 'countdown', icon: <FaHourglassHalf />, label: 'Countdown' },
  { key: 'todo', icon: <FaListAlt />, label: 'To-Do' },
  { key: 'stats', icon: <FaChartBar />, label: 'Stats' },
];

export default function Sidebar({ active, setActive }: Props) {
  return (
    <aside className="w-16 hover:w-40 transition-all duration-300 bg-zinc-900 text-white flex flex-col items-center py-6 space-y-6 shadow-lg">
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => setActive(item.key)}
          className={`group flex items-center w-full px-4 py-2 space-x-3 rounded-md ${
            active === item.key ? 'bg-gray-600' : 'hover:bg-zinc-700'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="hidden group-hover:inline text-sm">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
