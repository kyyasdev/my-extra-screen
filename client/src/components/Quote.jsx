import { useState, useEffect } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getApiUrl } from '../utils/api';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const Quote = () => {
  const [quote, setQuote] = useState({ text: '...', author: null });

  const fetchQuote = async () => {
    try {
      const response = await fetch(getApiUrl('/quote'));
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      console.error('Error fetching quote:', err);
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
        {/* Quote Container */}
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 shadow-xl">
          {/* Quote Mark */}
          <FormatQuoteIcon
            className="absolute top-4 left-4 text-white/50"
            fontSize="large"
          />

          {/* Content */}
          <div className="relative z-10 pl-8 pr-8 md:pl-10">
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
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="absolute top-4 right-2 text-white/40 hover:text-white/80 p-1.5 rounded-lg cursor-pointer"
            aria-label="Refresh quote"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
