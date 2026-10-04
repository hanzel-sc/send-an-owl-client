import React from 'react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="text-6xl mb-6" aria-hidden="true">🦉</div>
      <h2 className="font-serif text-3xl sm:text-4xl text-parchment mb-4">
        Your card is on its way.
      </h2>
      <p className="text-parchment/60 font-sans text-base max-w-md mb-10">
        The owl has taken flight. Your recipient will receive their birthday card by email shortly.
      </p>
      <HoverBorderGradient onClick={onReset} aria-label="Create another card">
        <span className="text-white font-sans text-base tracking-wide">
          Send another card
        </span>
      </HoverBorderGradient>
    </div>
  );
}
