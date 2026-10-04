"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FocusCards({ cards, onSelect, selectedIndex }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          selected={selectedIndex === index}
          onSelect={() => onSelect?.(index)}
        />
      ))}
    </div>
  );
}

function Card({ card, index, hovered, setHovered, selected, onSelect }) {
  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onSelect}
      className={cn(
        "rounded-xl relative bg-stone-900 overflow-hidden h-52 sm:h-60 md:h-72 w-full max-w-sm sm:max-w-none cursor-pointer transition-all duration-300 ease-out border border-parchment/10 group",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        selected && "ring-2 ring-sunset-500 ring-offset-2 ring-offset-[#0f0a06]"
      )}
      role="button"
      tabIndex={0}
      aria-label={`Select ${card.title} template`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end py-3 px-4 sm:py-4 transition-opacity duration-300",
          hovered === index || selected ? "opacity-100" : "opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
        )}
      >
        <div>
          <div className="text-base sm:text-lg md:text-xl font-medium text-white font-serif">
            {card.title}
          </div>
          {card.description && (
            <div className="text-xs text-parchment/70 font-sans mt-0.5 line-clamp-1">
              {card.description}
            </div>
          )}
        </div>
      </div>
      {selected && (
        <div className="absolute top-3 right-3 bg-sunset-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
          ✓
        </div>
      )}
    </motion.div>
  );
}
