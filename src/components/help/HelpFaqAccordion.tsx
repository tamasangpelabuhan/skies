'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/card';

interface FaqItem {
  question: string;
  answer: string;
}

interface HelpFaqAccordionProps {
  faqs: FaqItem[];
}

export const HelpFaqAccordion: React.FC<HelpFaqAccordionProps> = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div id="faq-section" className="space-y-3">
      <h2 className="text-base md:text-lg font-bold text-zinc-950 tracking-tight">
        Pertanyaan umum
      </h2>

      <Card className="rounded-[26px] md:rounded-[32px] overflow-hidden divide-y divide-zinc-50">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div key={idx} className="transition-all">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-3 text-xs md:text-sm font-bold text-zinc-900 hover:bg-zinc-50/50 cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-900' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 md:px-5 pb-5 pt-0 text-xs md:text-sm text-zinc-500 leading-relaxed animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};
