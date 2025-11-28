import { useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

const Quote = () => {
  // Default quotes - will be replaced with API later
  const defaultQuotes = [
    {
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
    },
    {
      text: 'Innovation distinguishes between a leader and a follower.',
      author: 'Steve Jobs',
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: 'John Lennon',
    },
    {
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
    },
    {
      text: 'It is during our darkest moments that we must focus to see the light.',
      author: 'Aristotle',
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleRefresh = () => {
    // For now, cycle through default quotes
    // Later this will call the API
    setCurrentQuoteIndex((prev) => (prev + 1) % defaultQuotes.length);
  };

  const currentQuote = defaultQuotes[currentQuoteIndex];

  return (
    <div className="w-full max-w-4xl px-4">
      <div className="flex items-start gap-4">
        {/* Quote Text */}
        <div className="flex-1 text-center">
          <p className="text-white/80 text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed">
            "{currentQuote.text}"
          </p>
          {currentQuote.author && (
            <p className="text-white/50 text-sm md:text-base mt-4 font-normal">
              — {currentQuote.author}
            </p>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="text-white/50 hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-lg flex-shrink-0"
          aria-label="Refresh quote"
        >
          <RefreshIcon className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Quote;
