import React from 'react';
import { Skeleton } from './ui/skeleton';
import {
  NetflixIcon,
  SpotifyIcon,
  GeminiStarIcon,
  CapCutIcon,
  YoutubeLogoIcon,
  DuolingoLogoIcon,
} from './icons/AppIcons';

interface AppLogoProps {
  type: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-10 h-10 rounded-xl text-xs',
  md: 'w-16 h-16 rounded-2xl text-sm',
  lg: 'w-full aspect-square rounded-2xl text-base',
  xl: 'w-24 h-24 rounded-3xl text-lg',
};

export const AppLogo: React.FC<AppLogoProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const containerClasses = `relative flex items-center justify-center overflow-hidden ${SIZE_CLASSES[size]} ${className}`;

  if (!type || !type.trim()) {
    return (
      <div className={containerClasses}>
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (type.startsWith('data:') || type.startsWith('http') || type.startsWith('/')) {
    return (
      <div className={`bg-zinc-950 ${containerClasses}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={type} alt="App Logo" className="w-full h-full object-cover" />
      </div>
    );
  }

  switch (type) {
    case 'netflix':
      return (
        <div className={`bg-black shadow-inner ${containerClasses}`}>
          <NetflixIcon />
        </div>
      );

    case 'hbomax':
      return (
        <div className={`bg-gradient-to-b from-[#1b0838] via-[#0b031b] to-black text-white border border-purple-900/40 shadow-inner flex-col ${containerClasses}`}>
          <div className="flex items-baseline gap-1 tracking-tighter">
            <span className="text-2xl font-black text-white tracking-tight">HBO</span>
            <span className="text-sm font-extrabold text-purple-400 lowercase tracking-normal">max</span>
          </div>
        </div>
      );

    case 'duolingo':
      return (
        <div className={`bg-[#58CC02] text-white flex-col shadow-inner ${containerClasses}`}>
          <DuolingoLogoIcon />
          <span className="text-[10px] font-black tracking-tight uppercase drop-shadow-xs">duolingo</span>
          <span className="text-[8px] font-extrabold bg-white text-[#58CC02] px-1 rounded-xs -mt-0.5">SUPER</span>
        </div>
      );

    case 'gemini':
      return (
        <div className={`bg-white border border-zinc-100 text-zinc-900 shadow-xs flex-col ${containerClasses}`}>
          <span className="absolute top-1 right-1 bg-blue-600 text-white font-extrabold text-[8px] px-1 rounded-xs shadow-2xs">18 Mo</span>
          <GeminiStarIcon />
          <span className="text-[11px] font-black text-zinc-900 tracking-tight mt-0.5">
            Gemini <span className="text-blue-600">Pro</span>
          </span>
          <span className="text-[8px] font-semibold text-zinc-400 -mt-0.5">Google 2 TB</span>
        </div>
      );

    case 'spotify':
      return (
        <div className={`bg-[#1DB954] text-black shadow-inner flex-col ${containerClasses}`}>
          <SpotifyIcon />
          <span className="text-[10px] font-black tracking-tight mt-0.5 text-black">Premium</span>
        </div>
      );

    case 'youtube':
      return (
        <div className={`bg-[#171717] text-white shadow-inner flex-col ${containerClasses}`}>
          <YoutubeLogoIcon />
          <span className="text-[10px] font-black tracking-tight mt-1 text-white">YouTube</span>
        </div>
      );

    case 'canva':
      return (
        <div className={`bg-gradient-to-tr from-[#00C4CC] via-[#5B34EA] to-[#7D2AE8] text-white font-bold shadow-inner ${containerClasses}`}>
          <span className="text-2xl font-black italic tracking-tighter drop-shadow-md">Canva</span>
        </div>
      );

    case 'capcut':
      return (
        <div className={`bg-white border border-zinc-100 text-zinc-900 shadow-xs flex-col ${containerClasses}`}>
          <CapCutIcon />
          <span className="text-[10px] font-black tracking-tight text-zinc-900 -mt-1">CapCut</span>
        </div>
      );

    case 'disney':
      return (
        <div className={`bg-[#071330] text-white border border-blue-900 shadow-inner flex-col ${containerClasses}`}>
          <span className="text-base font-black italic tracking-wider text-blue-400">Disney+</span>
          <span className="text-[8px] font-semibold tracking-widest text-zinc-300 -mt-1">HOTSTAR</span>
        </div>
      );

    case 'chatgpt':
      return (
        <div className={`bg-[#10A37F] text-white shadow-inner flex-col ${containerClasses}`}>
          <span className="text-lg font-black tracking-tight">ChatGPT</span>
          <span className="text-[9px] bg-white text-[#10A37F] font-bold px-1.5 py-0.2 rounded-full -mt-0.5">Plus</span>
        </div>
      );

    default:
      return (
        <div className={containerClasses}>
          <Skeleton className="w-full h-full" />
        </div>
      );
  }
};
