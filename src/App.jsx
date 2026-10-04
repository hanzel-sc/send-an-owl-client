import React, { useState, useCallback } from 'react';
import Hero from '@/components/Hero';
import FallingLeaves from '@/components/FallingLeaves';
import CardForm from '@/components/CardForm';
import CardPreview from '@/components/CardPreview';
import SuccessState from '@/components/SuccessState';
import Footer from '@/components/Footer';
import ServerStatus from '@/components/ServerStatus';
import { Loader } from '@/components/ui/loader';

const API_URL = import.meta.env.VITE_API_URL || '';

const INITIAL_CARD = {
  template: '',
  recipientName: '',
  recipientEmail: '',
  senderName: '',
  message: '',
  photo: null,
  photoFile: null,
};

function validate(card) {
  const errors = {};

  if (!card.template) {
    errors.template = 'Please select a template.';
  }
  if (!card.recipientName.trim()) {
    errors.recipientName = 'Recipient name is required.';
  }
  if (!card.recipientEmail.trim()) {
    errors.recipientEmail = 'Recipient email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(card.recipientEmail)) {
    errors.recipientEmail = 'Please enter a valid email address.';
  }
  if (!card.senderName.trim()) {
    errors.senderName = 'Your name is required.';
  }
  if (!card.message.trim()) {
    errors.message = 'Please write a message.';
  } else {
    const wordCount = card.message.trim().split(/\s+/).length;
    if (wordCount > 50) {
      errors.message = 'Message must be 50 words or fewer.';
    }
  }
  if (!card.photoFile) {
    errors.photo = 'Please upload a photo.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export default function App() {
  const [card, setCard] = useState(INITIAL_CARD);
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [mobileTab, setMobileTab] = useState('edit'); // 'edit' | 'preview'

  const handleSubmit = useCallback(async () => {
    setErrors(null);
    setSubmitError('');

    const validationErrors = validate(card);
    if (validationErrors) {
      setErrors(validationErrors);
      setMobileTab('edit'); // Switch to edit view on mobile so user sees the errors
      return;
    }

    setIsSubmitting(true);

    try {
      if (!API_URL) {
        throw new Error('Server in maintenance. Please try again shortly.');
      }

      const formData = new FormData();
      formData.append('template', card.template);
      formData.append('recipientName', card.recipientName);
      formData.append('recipientEmail', card.recipientEmail);
      formData.append('senderName', card.senderName);
      formData.append('message', card.message);
      formData.append('photo', card.photoFile);

      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${response.status})`);
      }

      // Revoke the preview object URL
      if (card.photo) {
        URL.revokeObjectURL(card.photo);
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [card]);

  const handleReset = () => {
    setCard(INITIAL_CARD);
    setErrors(null);
    setSubmitError('');
    setIsSuccess(false);
    setMobileTab('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <FallingLeaves />

      {/* Hero */}
      <Hero />

      {/* Card Creator */}
      <section
        id="create"
        className="relative min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'url(/assets/landing/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
        aria-label="Create your card"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment text-center mb-6 sm:mb-10 lg:mb-14">
            Create your card
          </h2>

          {isSuccess ? (
            <SuccessState onReset={handleReset} />
          ) : isSubmitting ? (
            <div className="flex items-center justify-center py-24 sm:py-32">
              <Loader text="The owl is preparing your card..." />
            </div>
          ) : (
            <>
              {submitError && (
                <div className="max-w-2xl mx-auto mb-6 sm:mb-8 p-3.5 sm:p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-300 text-xs sm:text-sm text-center">
                  {submitError}
                </div>
              )}

              {/* Mobile / Tablet Segmented Toggle (hidden on desktop lg) */}
              <div className="flex lg:hidden justify-center mb-6">
                <div className="inline-flex p-1 rounded-xl bg-stone-900/85 border border-parchment/15 backdrop-blur-md shadow-lg">
                  <button
                    type="button"
                    onClick={() => setMobileTab('edit')}
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      mobileTab === 'edit'
                        ? 'bg-sunset-600 text-white shadow-sm'
                        : 'text-parchment/60 hover:text-parchment'
                    }`}
                  >
                    Edit details
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab('preview')}
                    className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                      mobileTab === 'preview'
                        ? 'bg-sunset-600 text-white shadow-sm'
                        : 'text-parchment/60 hover:text-parchment'
                    }`}
                  >
                    <span>Card preview</span>
                    {card.template && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                {/* Form Column */}
                <div className={mobileTab === 'edit' ? 'block' : 'hidden lg:block'}>
                  <CardForm
                    card={card}
                    setCard={setCard}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    onViewPreview={() => setMobileTab('preview')}
                  />
                </div>

                {/* Preview Column */}
                <div
                  className={`lg:sticky lg:top-8 ${
                    mobileTab === 'preview' ? 'block' : 'hidden lg:block'
                  }`}
                >
                  <CardPreview
                    card={card}
                    onEdit={() => setMobileTab('edit')}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Server Status Toast */}
      <ServerStatus />

      {/* Footer */}
      <Footer />
    </>
  );
}
