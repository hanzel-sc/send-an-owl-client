import React from 'react';
import ClassicTemplate from '@/templates/classic/template.jsx';

const templateComponents = {
  classic: ClassicTemplate,
};

export default function CardPreview({ card }) {
  const TemplateComponent = templateComponents[card.template];

  if (!TemplateComponent) {
    return (
      <div className="w-full aspect-[3/4] bg-bark/50 rounded-lg flex items-center justify-center text-parchment/40 font-serif text-lg">
        Select a template
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden shadow-2xl shadow-black/40">
        <TemplateComponent card={card} />
      </div>
      <p className="text-center text-parchment/40 text-xs mt-3 font-sans">
        Live preview
      </p>
    </div>
  );
}
