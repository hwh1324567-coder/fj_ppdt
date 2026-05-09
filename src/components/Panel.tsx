import React from 'react';
import { cn } from '../utils/cn';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ title, children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col overflow-hidden glass-panel hud-glow",
        className
      )}
      {...props}
    >
      {/* Delicate floating corners */}
      <svg className="absolute top-0 left-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
        <path d="M0 12V0H12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute top-0 right-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
        <path d="M0 0H12V12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
        <path d="M12 12H0V0" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-3 h-3 text-[#48cae4] opacity-60 drop-shadow-[0_0_4px_#48cae4]" viewBox="0 0 12 12" fill="none">
        <path d="M0 12H12V0" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Subtle top glow line */}
      <div className="absolute top-0 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#48cae4] to-transparent opacity-30"></div>

      <div className="relative flex flex-col px-5 pt-4 pb-2">
        <div className="flex items-center">
          <span className="text-[#48cae4] mr-3 text-sm leading-none drop-shadow-[0_0_3px_#48cae4] opacity-80">◈</span>
          <h2 
            className="font-bold tracking-[0.1em] text-sm text-white/90 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
          >
            {title}
          </h2>
        </div>
      </div>
      
      <div className="flex-1 px-5 pb-5 pt-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};
