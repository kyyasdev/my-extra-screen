import { useState } from 'react';

const UserCounter = () => {
  // Default value - will be replaced with API call later
  const [userCount, setUserCount] = useState(5296);

  // Phrases to choose from - impressive alternatives
  const phrases = [
    'productive',
    'staying focused',
    'maximizing productivity',
    'achieving their goals',
    'making progress',
    'staying on track',
  ];

  // Select a random phrase once on mount
  const [currentPhrase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  });

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <p className="text-white/60 text-sm md:text-base text-center font-light">
        Right now there are{' '}
        <span className="text-white/80 font-medium">
          {formatNumber(userCount)}
        </span>{' '}
        people {currentPhrase} all around the world.
      </p>
    </div>
  );
};

export default UserCounter;
