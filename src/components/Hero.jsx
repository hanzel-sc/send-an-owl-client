import React from 'react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

export default function Hero() {
  const scrollToCreator = () => {
    document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      aria-label="Welcome"
    >
      {/* Background artwork */}
      <img
        src="/assets/landing/hero.png"
        alt="A majestic owl perched on a tree branch at sunset"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Hero content — positioned in the upper right, left-aligned to match the design */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 h-full flex justify-end pt-[13vh] sm:pt-[15vh] lg:pt-[17vh]">
        <div className="text-left max-w-lg -mr-4 sm:-mr-8 lg:-mr-32">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal text-white text-left space-y-6 sm:space-y-8 select-none tracking-normal">
            <span className="block">Pick a template.</span>
            <span className="block">Personalize your message.</span>
            <span className="block">Dispatch the owl.</span>
          </h1>

          <div className="mt-8 sm:mt-10 flex justify-start">
            <HoverBorderGradient
              onClick={scrollToCreator}
              aria-label="Get started — scroll to card creator"
            >
              <span className="text-white font-sans text-base tracking-wide">
                Get started ↗
              </span>
            </HoverBorderGradient>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToCreator}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator text-white/80 hover:text-white transition-opacity cursor-pointer p-2 focus:outline-none"
        aria-label="Scroll to card creator"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </section>
  );
}
