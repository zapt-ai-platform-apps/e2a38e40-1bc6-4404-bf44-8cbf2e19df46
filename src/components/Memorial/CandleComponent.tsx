import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/browser';

const CandleComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Candle video URL - using a creative commons licensed GIF of a flickering candle
  const candleVideoUrl = 'https://media.giphy.com/media/3o7qDJKIO5rSeyHhvO/giphy.gif';

  useEffect(() => {
    const img = new Image();
    img.src = candleVideoUrl;
    img.onload = () => setLoaded(true);
    img.onerror = (e) => {
      console.error('Failed to load candle image:', e);
      Sentry.captureException(new Error('Failed to load candle image'));
      setError('Failed to load the memorial candle image');
    };
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-amber-200 p-4">
        <div className="text-center mb-4">
          <svg className="w-16 h-16 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-2 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center bg-black overflow-hidden">
      {!loaded && (
        <div className="flex flex-col items-center justify-center text-amber-200">
          <div className="w-12 h-12 border-4 border-t-transparent border-amber-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Lighting candle...</p>
        </div>
      )}
      <img 
        src={candleVideoUrl}
        alt="Flickering memorial candle"
        className={`object-cover max-h-full max-w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
    </div>
  );
};

export default CandleComponent;