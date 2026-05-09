import React, { useState, useEffect } from 'react';
import { LeftColumn } from './components/LeftColumn';
import { MiddleColumn } from './components/MiddleColumn';
import { RightColumn } from './components/RightColumn';
import { Shield } from 'lucide-react';
import { BackgroundEffects } from './components/BackgroundEffects';

const App: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="w-screen h-screen bg-[#020617] overflow-hidden flex flex-col relative text-white"
    >
      <BackgroundEffects />
      
      {/* Header */}
      <header className="h-[80px] flex items-center justify-center relative z-10 shrink-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://files.catbox.moe/k2y04b.png')] bg-no-repeat bg-center bg-cover opacity-20 pointer-events-none"></div>
          
          {/* Decorative lines */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#48cae4] to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-[#48cae4] shadow-[0_0_15px_#48cae4]"></div>
          
          <div className="flex items-center gap-4">
            <Shield size={36} className="text-[#48cae4] drop-shadow-[0_0_10px_rgba(72,202,228,0.8)]" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#48cae4] tracking-[0.2em] drop-shadow-[0_0_10px_rgba(72,202,228,0.5)]">
              福建品牌地图
            </h1>
          </div>

          {/* Time display */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[#48cae4] font-mono text-lg tracking-wider drop-shadow-[0_0_5px_rgba(72,202,228,0.5)]">
            {currentTime.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex px-6 pb-6 pt-4 gap-6 relative z-10 min-h-0">
          <LeftColumn activeCity={activeCity} />
          <MiddleColumn 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
            activeCity={activeCity}
            setActiveCity={setActiveCity}
          />
          <RightColumn activeCity={activeCity} activeFilter={activeFilter} />
        </div>
    </div>
  );
};

export default App;
