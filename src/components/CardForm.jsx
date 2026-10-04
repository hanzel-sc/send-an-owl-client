import React, { useRef } from 'react';
import { FocusCards } from '@/components/ui/focus-cards';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import templates from '@/data/templates';

const MAX_WORDS = 50;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function countWords(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export default function CardForm({
  card,
  setCard,
  onSubmit,
  isSubmitting,
  errors,
  onViewPreview,
}) {
  const fileInputRef = useRef(null);

  const selectedTemplateIndex = templates.findIndex((t) => t.id === card.template);

  const handleTemplateSelect = (index) => {
    setCard((prev) => ({ ...prev, template: templates[index].id }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert('Please upload a JPEG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      alert('Image must be under 5 MB.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    // Revoke previous preview URL
    if (card.photo) {
      URL.revokeObjectURL(card.photo);
    }

    setCard((prev) => ({
      ...prev,
      photo: objectUrl,
      photoFile: file,
    }));
  };

  const handleRemovePhoto = () => {
    if (card.photo) {
      URL.revokeObjectURL(card.photo);
    }
    setCard((prev) => ({ ...prev, photo: null, photoFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const wordCount = countWords(card.message);
  const wordsRemaining = MAX_WORDS - wordCount;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Template Selection */}
      <fieldset>
        <legend className="font-serif text-xl sm:text-2xl text-parchment mb-3 sm:mb-4">
          Choose a template
        </legend>
        <FocusCards
          cards={templates}
          selectedIndex={selectedTemplateIndex}
          onSelect={handleTemplateSelect}
        />
        {errors?.template && (
          <p className="text-red-400 text-sm mt-2">{errors.template}</p>
        )}
      </fieldset>

      {/* Photo Upload */}
      <div>
        <label
          htmlFor="photo-upload"
          className="block font-serif text-base sm:text-lg text-parchment mb-2"
        >
          Upload a photo
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <input
            ref={fileInputRef}
            id="photo-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handlePhotoChange}
            disabled={isSubmitting}
            className="block w-full text-xs sm:text-sm text-parchment/60
              file:mr-3 sm:file:mr-4 file:py-2 file:px-3.5 sm:file:px-4
              file:rounded-full file:border-0
              file:text-xs sm:file:text-sm file:font-medium
              file:bg-sunset-900/40 file:text-parchment
              hover:file:bg-sunset-900/60
              file:cursor-pointer file:transition-colors
              disabled:opacity-50"
          />
          {card.photo && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="text-xs sm:text-sm text-red-400 hover:text-red-300 transition-colors whitespace-nowrap self-start sm:self-auto py-1 px-2 rounded hover:bg-red-950/30"
              disabled={isSubmitting}
            >
              Remove photo
            </button>
          )}
        </div>
        {errors?.photo && (
          <p className="text-red-400 text-sm mt-2">{errors.photo}</p>
        )}
      </div>

      {/* Recipient Name */}
      <div>
        <label
          htmlFor="recipient-name"
          className="block font-serif text-base sm:text-lg text-parchment mb-2"
        >
          Recipient's name
        </label>
        <input
          id="recipient-name"
          type="text"
          value={card.recipientName}
          onChange={(e) => setCard((prev) => ({ ...prev, recipientName: e.target.value }))}
          placeholder="e.g. Hans Elkan"
          disabled={isSubmitting}
          maxLength={60}
          className="w-full bg-bark/40 border border-parchment/10 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3
            text-base text-parchment placeholder:text-parchment/30
            focus:outline-none focus:ring-2 focus:ring-sunset-500/50 focus:border-transparent
            transition-all disabled:opacity-50"
        />
        {errors?.recipientName && (
          <p className="text-red-400 text-sm mt-2">{errors.recipientName}</p>
        )}
      </div>

      {/* Recipient Email */}
      <div>
        <label
          htmlFor="recipient-email"
          className="block font-serif text-base sm:text-lg text-parchment mb-2"
        >
          Recipient's email
        </label>
        <input
          id="recipient-email"
          type="email"
          value={card.recipientEmail}
          onChange={(e) => setCard((prev) => ({ ...prev, recipientEmail: e.target.value }))}
          placeholder="e.g. hans@example.com"
          disabled={isSubmitting}
          className="w-full bg-bark/40 border border-parchment/10 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3
            text-base text-parchment placeholder:text-parchment/30
            focus:outline-none focus:ring-2 focus:ring-sunset-500/50 focus:border-transparent
            transition-all disabled:opacity-50"
        />
        {errors?.recipientEmail && (
          <p className="text-red-400 text-sm mt-2">{errors.recipientEmail}</p>
        )}
      </div>

      {/* Sender Name */}
      <div>
        <label
          htmlFor="sender-name"
          className="block font-serif text-base sm:text-lg text-parchment mb-2"
        >
          Your name
        </label>
        <input
          id="sender-name"
          type="text"
          value={card.senderName}
          onChange={(e) => setCard((prev) => ({ ...prev, senderName: e.target.value }))}
          placeholder="e.g. Sam"
          disabled={isSubmitting}
          maxLength={60}
          className="w-full bg-bark/40 border border-parchment/10 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3
            text-base text-parchment placeholder:text-parchment/30
            focus:outline-none focus:ring-2 focus:ring-sunset-500/50 focus:border-transparent
            transition-all disabled:opacity-50"
        />
        {errors?.senderName && (
          <p className="text-red-400 text-sm mt-2">{errors.senderName}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-serif text-base sm:text-lg text-parchment mb-2"
        >
          Your message
        </label>
        <textarea
          id="message"
          value={card.message}
          onChange={(e) => setCard((prev) => ({ ...prev, message: e.target.value }))}
          placeholder="Write something heartfelt..."
          disabled={isSubmitting}
          rows={4}
          className="w-full bg-bark/40 border border-parchment/10 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3
            text-base text-parchment placeholder:text-parchment/30
            focus:outline-none focus:ring-2 focus:ring-sunset-500/50 focus:border-transparent
            transition-all resize-none disabled:opacity-50"
        />
        <p className={`text-xs mt-1 text-right ${wordsRemaining < 0 ? 'text-red-400 font-semibold' : 'text-parchment/40'}`}>
          {wordCount}/{MAX_WORDS} words
        </p>
        {errors?.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
        <HoverBorderGradient
          onClick={onSubmit}
          disabled={isSubmitting}
          aria-label="Send birthday card"
          containerClassName="w-full sm:w-auto"
          className="w-full text-center"
        >
          <span className="text-white font-sans text-sm sm:text-base tracking-wide font-medium">
            {isSubmitting ? 'Sending...' : 'Dispatch the owl'}
          </span>
        </HoverBorderGradient>

        {onViewPreview && (
          <button
            type="button"
            onClick={onViewPreview}
            className="lg:hidden px-4 py-2.5 rounded-full border border-parchment/20 text-parchment/80 hover:text-white hover:border-parchment/40 text-sm font-sans transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Preview card</span>
          </button>
        )}
      </div>
    </div>
  );
}
