'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { taskWhitePaws, taskBlum } from '@/images';

const TasksTab = () => {
  const [activeTab, setActiveTab] = useState<'in-game' | 'partners' | 'limited'>('in-game');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const inGameTasks = [
    { id: 'task1', title: 'Put 🕷 in your name', reward: 5000, link: '', image: 'daST.png' },
    { id: 'task2', title: 'Follow Youtube NATOI', reward: 2000, link: 'https://youtube.com/@NATOI_tpg?si=sDLzGdTK1t8I7c1N', image: 'youtube.6cd3c9a8.png' },
    { id: 'task3', title: 'Boost NATOI channel', reward: 2500, link: 'https://t.me/boost/Rabbit_coinR', image: 'bost.png' },
  ];

  const partnerTasks = [
    { id: 'partner1', title: 'Join Binance', reward: 10000, link: 'https://www.binance.com', image: 'binance-logo.png' },
    { id: 'partner2', title: 'Join Whale Chanel', reward: 10000, link: 'https://t.me/WhAlE_ChAnEl', image: 'telegram.d70bd4ea.png' },
  ];

  const limitedTasks = [
    { id: 'limited1', title: 'Play Paws', reward: 15000, link: 'https://t.me/PAWSOG_bot/PAWS?startapp=eHsemNn8', image: 'paws.png' },
    { id: 'limited2', title: 'Play Buzzit', reward: 20000, link: 'https://t.me/buzzit1_bot/buzzit?startapp=1725757055', image: 'Buzzit.png' },
    { id: 'limited3', title: 'Play Not Coin', reward: 25000, link: 'https://t.me/notcoin_bot?start=er_11170585', image: 'not.png' },
  ];

  useEffect(() => {
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    const savedPoints = parseInt(localStorage.getItem('totalPoints') || '0');
    setCompletedTasks(savedCompletedTasks);
    setTotalPoints(savedPoints);
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    localStorage.setItem('totalPoints', totalPoints.toString());
  }, [completedTasks, totalPoints]);

  const handleStart = (taskId: string, reward: number, link: string) => {
    if (completedTasks.includes(taskId)) return;

    // Start a timer for 5 seconds
    setTimers((prev) => ({
      ...prev,
      [taskId]: 5,
    }));

    const timerInterval = setInterval(() => {
      setTimers((prev) => {
        const newTimers = { ...prev };
        if (newTimers[taskId] > 0) {
          newTimers[taskId] -= 1;
        } else {
          clearInterval(timerInterval);
          setCompletedTasks((prev) => [...prev, taskId]);
          setTotalPoints((prev) => prev + reward);
        }
        return newTimers;
      });
    }, 1000);

    window.open(link, '_blank');
  };

  const formatPoints = (points: number) => {
    return points >= 1000 ? `${(points / 1000).toFixed(1)}K NATOI` : `${points} NATOI`;
  };

  const currentTasks = activeTab === 'in-game' ? inGameTasks : activeTab === 'partners' ? partnerTasks : limitedTasks;

  return (
    <div className="quests-tab-con px-4 transition-all duration-300">

<div className="pt-8">
  <h1 className="text-3xl font-bold mb-2">TASKS</h1>
  <div className="flex items-center">
    <span className="text-xl font-semibold">GET REWARDS </span>
    <span className="text-xl text-gray-500">FOR</span>
    <div className="ml-2 bg-blue-700 text-white px-4 py-2 rounded-lg text-lg font-semibold">
      {formatPoints(totalPoints)}
    </div>
  </div>
  <div className="text-xl text-gray-500">COMPLETING QUESTS</div>
</div>



      <div className="flex gap-0 mt-6">
        <button onClick={() => setActiveTab('in-game')} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${activeTab === 'in-game' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}>In-game</button>
        <button onClick={() => setActiveTab('partners')} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${activeTab === 'partners' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}>Partners</button>
        <button onClick={() => setActiveTab('limited')} className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${activeTab === 'limited' ? 'bg-white text-black' : 'bg-[#151515] text-white'}`}>Limited</button>
      </div>

      <div className="mt-4 mb-20 bg-[#151516] rounded-xl">
        {currentTasks.map((task) => (
          <div key={task.id} className="flex items-center">
            <div className="w-[50px] flex justify-center">
            <Image 
            src={`/images/${task.image}`} 
            alt={task.title} 
            width={30} 
            height={30} 
            className="object-contain" 
            />
            </div>
            <div className="flex items-center justify-between w-full py-4 pr-4 border-t border-[#222622]">
              <div>
                <div className="text-[17px]">{task.title}</div>
                <div className="text-gray-400 text-[14px]">+ {task.reward} NATOI</div>
              </div>
              {completedTasks.includes(task.id) ? (
                <span className="text-green-500 font-bold">Complete</span>
              ) : (
                <button
                  className="h-8 bg-white text-black px-4 rounded-full text-sm font-medium"
                  onClick={() => handleStart(task.id, task.reward, task.link)}
                >
                  {timers[task.id] > 0 ? `${timers[task.id]}s` : 'Start'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksTab;
