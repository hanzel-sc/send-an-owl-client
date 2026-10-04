import React from 'react';
import templateBg from './template.png';
import './template.css';

export default function ClassicTemplate({ card }) {
  const { recipientName, senderName, message, photo } = card;

  return (
    <div
      className="classic-card"
      style={{ backgroundImage: `url(${templateBg})` }}
    >
      <div className="classic-card__photo-frame">
        {photo ? (
          <img src={photo} alt="Uploaded photo" />
        ) : (
          <div className="classic-card__photo-placeholder">
            Your photo here
          </div>
        )}
      </div>

      <div className="classic-card__greeting">Happy Birthday</div>

      <div className="classic-card__name">
        {recipientName || 'Recipient'}
      </div>

      <div className="classic-card__message">
        {message || 'Your message will appear here'}
      </div>

      <div className="classic-card__sender">
        — {senderName || 'Sender'}
      </div>
    </div>
  );
}
