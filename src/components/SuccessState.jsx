import React from 'react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 px-4 sm:px-6">
      <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 select-none" aria-hidden="true">🦉</div>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment mb-3 sm:mb-4">
        Your card is on its way.
      </h2>
      <p className="text-parchment/60 font-sans text-sm sm:text-base max-w-md mb-8 sm:mb-10 leading-relaxed">
        The owl has taken flight. Your recipient will receive their personalized birthday card by email shortly.
      </p>
      <HoverBorderGradient
        onClick={onReset}
        aria-label="Create another card"
        containerClassName="w-full sm:w-auto"
        className="w-full text-center"
      >
        <span className="text-white font-sans text-sm sm:text-base tracking-wide font-medium">
          Send another card
        </span>
      </HoverBorderGradient>
    </div>
  );
}
