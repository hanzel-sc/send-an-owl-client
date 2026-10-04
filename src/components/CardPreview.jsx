import React from 'react';
import ClassicTemplate from '@/templates/classic/template.jsx';

const templateComponents = {
  classic: ClassicTemplate,
};

export default function CardPreview({ card, onEdit, onSubmit, isSubmitting }) {
  const TemplateComponent = templateComponents[card.template];

  if (!TemplateComponent) {
    return (
      <div className="w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] bg-bark/40 border border-dashed border-parchment/20 rounded-xl flex flex-col items-center justify-center p-6 text-center text-parchment/40 font-serif">
        <span className="text-3xl mb-3">📜</span>
        <span className="text-base sm:text-lg text-parchment/70">Select a template</span>
        <span className="text-xs font-sans text-parchment/40 mt-1 max-w-[220px]">
          Choose a card design above to see a live preview
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto">
      <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-parchment/10">
        <TemplateComponent card={card} />
      </div>
      <div className="flex items-center justify-between text-parchment/40 text-xs mt-3 px-1 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          Live preview
        </span>
        <span>A5 Printable Format</span>
      </div>

      {/* Mobile action bar when previewing on mobile */}
      {(onEdit || onSubmit) && (
        <div className="mt-6 flex lg:hidden items-center gap-3">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex-1 py-2.5 px-4 rounded-xl border border-parchment/20 text-parchment text-sm font-medium hover:bg-white/5 transition-colors"
            >
              ← Edit details
            </button>
          )}
          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-sunset-600 hover:bg-sunset-500 text-white text-sm font-medium shadow-md transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Dispatch owl ↗'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
