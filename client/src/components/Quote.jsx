import { useState, useEffect } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getApiUrl } from '../utils/api';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl('/quote'));
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
  };

  return (
    <div className="w-full max-w-3xl px-4">
      <div className="relative">
        {/* Beautiful Quote Container */}
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 shadow-xl">
          {/* Decorative Quote Mark */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/10"
            >
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                fill="currentColor"
              />
              <path
                d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 pl-8 pr-8 md:pl-10">
            {isLoading ? (
              <div className="text-center py-3">
                <p className="text-white/50 text-base md:text-lg font-light italic">
                  Loading quote...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-3">
                <p className="text-white/50 text-base md:text-lg font-light italic">
                  Failed to load quote
                </p>
              </div>
            ) : quote ? (
              <div className="text-center">
                <blockquote className="text-white/90 text-base md:text-lg lg:text-xl font-light italic leading-relaxed mb-3">
                  {quote.text}
                </blockquote>
                {quote.author && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px w-8 bg-white/20"></div>
                    <p className="text-white/60 text-xs md:text-sm font-medium tracking-wide">
                      {quote.author}
                    </p>
                    <div className="h-px w-8 bg-white/20"></div>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="absolute top-2 right-2 text-white/40 hover:text-white/80 p-1.5 rounded-lg flex-shrink-0"
            aria-label="Refresh quote"
          >
            <RefreshIcon className="text-lg md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
