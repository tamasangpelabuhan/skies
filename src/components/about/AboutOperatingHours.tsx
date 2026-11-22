import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../ui/card';

export const AboutOperatingHours: React.FC = () => {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold font-heading text-[#4A3A85] tracking-tight">
        Jam operasional
      </h2>

      <Card className="rounded-2xl p-4 flex items-center gap-3.5 border-[1.5px] border-[#E7DFFB]">
        <div className="w-10 h-10 rounded-xl bg-[#FFF4CC] border border-[#FFE59A] flex items-center justify-center text-[#2F2552] shrink-0">
          <Clock className="w-5 h-5 stroke-[2]" />
        </div>
        <div>
          <span className="text-xs md:text-sm font-bold font-heading text-[#2F2552] block">
            10.00-22.00 WIB
          </span>
          <span className="text-[11px] text-[#7B6FA3] font-semibold block mt-0.5">
            Waktu Indonesia Barat
          </span>
        </div>
      </Card>
    </div>
  );
};
