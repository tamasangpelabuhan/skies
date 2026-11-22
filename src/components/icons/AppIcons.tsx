import React from 'react';

export const NetflixIcon: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-[62%] h-[62%]" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 10V90H36V10H22Z" fill="#B81D24" />
    <path d="M64 10V90H78V10H64Z" fill="#B81D24" />
    <path d="M22 10L68 90H78L32 10H22Z" fill="#E50914" />
  </svg>
);

export const SpotifyIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-black" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.792-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.809-.87 7.076-.496 9.721 1.115.295.18.387.563.207.855zm1.225-2.724c-.226.368-.71.485-1.077.26-2.69-1.653-6.79-2.133-9.97-1.168-.413.125-.853-.112-.978-.525-.125-.413.112-.853.525-.978 3.633-1.103 8.147-.568 11.24 1.334.367.226.484.71.26 1.077zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.494.15-1.018-.129-1.168-.623-.15-.495.13-1.019.624-1.169 3.532-1.072 9.404-.866 13.115 1.338.445.264.59.842.327 1.287-.264.446-.843.59-1.278.322z" />
  </svg>
);

export const GeminiStarIcon: React.FC = () => (
  <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A73E8" />
        <stop offset="50%" stopColor="#8AB4F8" />
        <stop offset="100%" stopColor="#D93025" />
      </linearGradient>
    </defs>
    <path
      d="M24 4C24 15.0457 15.0457 24 4 24C15.0457 24 24 32.9543 24 44C24 32.9543 32.9543 24 44 24C32.9543 24 24 15.0457 24 4Z"
      fill="url(#geminiGrad)"
    />
  </svg>
);

export const CapCutIcon: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 fill-zinc-950" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 32L50 50L25 68C22 70 18 69 16 66C14 63 15 59 18 57L35 45L18 33C15 31 14 27 16 24C18 21 22 20 25 22L25 32Z" />
    <path d="M75 32L50 50L75 68C78 70 82 69 84 66C86 63 85 59 82 57L65 45L82 33C85 31 86 27 84 24C82 21 78 20 75 22L75 32Z" />
  </svg>
);

export const YoutubeLogoIcon: React.FC = () => (
  <div className="w-10 h-7 rounded-xl bg-[#FF0000] flex items-center justify-center shadow-md">
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  </div>
);

export const DuolingoLogoIcon: React.FC = () => (
  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative mb-0.5">
    <div className="flex items-center gap-1.5">
      <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-zinc-900" />
      </div>
      <div className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-zinc-900" />
      </div>
    </div>
    <div className="absolute bottom-1 w-2.5 h-2 bg-amber-400 rounded-b-md" />
  </div>
);
