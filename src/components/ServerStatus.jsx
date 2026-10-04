import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || '';

export default function ServerStatus() {
  // states: 'idle' | 'checking' | 'waking' | 'ready' | 'error'
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const checkHealth = useCallback(async () => {
    // If VITE_API_URL is missing, treat as server in maintenance
    if (!API_URL) {
      setStatus('error');
      setMessage('The dispatch server is currently undergoing maintenance. Owl post will be back shortly.');
      return;
    }

    setStatus('checking');
    setMessage('Connecting to server...');

    // If it takes more than 2.5s, the free instance on Render is waking up from sleep
    const wakeTimer = setTimeout(() => {
      setStatus('waking');
      setMessage('Waking up server from sleep (Render free tier wakes in ~45s)...');
    }, 2500);

    try {
      const res = await fetch(`${API_URL}/`, { method: 'GET' });
      clearTimeout(wakeTimer);

      if (res.ok) {
        const data = await res.json().catch(() => null);

        // Verify this is actually our backend service, not a generic 200 HTML page
        if (data && data.service === 'send-an-owl') {
          setStatus('ready');
          setMessage(data.message || 'Owl post is online and ready!');

          // Minimize into a small status pill after 4.5 seconds
          setTimeout(() => {
            setIsMinimized(true);
          }, 4500);
        } else {
          setStatus('error');
          setMessage('Server in maintenance. Please check back shortly.');
        }
      } else {
        setStatus('error');
        setMessage('Server in maintenance. Please check back shortly.');
      }
    } catch {
      clearTimeout(wakeTimer);
      setStatus('error');
      setMessage('Server in maintenance. Please check back shortly.');
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  if (status === 'idle') return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-5 sm:bottom-5 z-50 pointer-events-none flex justify-end">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          // Minimized pill
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/85 border border-stone-700/60 shadow-lg backdrop-blur-md text-xs font-sans text-parchment/90 hover:border-sunset-500/50 transition-colors cursor-pointer"
            title="Click to view server status"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'ready'
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                  : 'bg-amber-400'
              }`}
            />
            <span>
              {status === 'ready'
                ? 'Server Ready'
                : status === 'waking'
                ? 'Waking up...'
                : 'Server in maintenance'}
            </span>
          </motion.button>
        ) : (
          // Expanded Toast
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto w-full sm:max-w-sm p-3.5 sm:p-4 rounded-xl bg-stone-950/92 border border-stone-800 shadow-2xl backdrop-blur-md text-parchment"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* Status Dot */}
                <span className="relative flex h-3 w-3 mt-0.5 flex-shrink-0">
                  {status === 'ready' ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </>
                  ) : status === 'waking' || status === 'checking' ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
                  )}
                </span>

                <div>
                  <h4 className="text-sm font-semibold font-serif tracking-wide text-parchment">
                    {status === 'ready'
                      ? 'Owl Post Online'
                      : status === 'waking'
                      ? 'Server Waking Up'
                      : status === 'checking'
                      ? 'Connecting...'
                      : 'Server in maintenance'}
                  </h4>
                  <p className="text-xs text-parchment/70 mt-0.5 leading-relaxed break-words">
                    {message}
                  </p>
                </div>
              </div>

              {/* Close / Minimize button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="text-parchment/40 hover:text-parchment/80 transition-colors p-1 text-xs cursor-pointer flex-shrink-0"
                title="Minimize"
              >
                ✕
              </button>
            </div>

            {/* Progress bar when waking up */}
            {status === 'waking' && (
              <div className="mt-3 w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-amber-500 h-full rounded-full"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'easeInOut',
                  }}
                  style={{ width: '40%' }}
                />
              </div>
            )}

            {status === 'error' && API_URL && (
              <div className="mt-3 pt-2 border-t border-stone-800/80 flex justify-end">
                <button
                  onClick={checkHealth}
                  className="text-xs font-medium text-sunset-400 hover:text-sunset-300 underline cursor-pointer"
                >
                  Retry Connection
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
