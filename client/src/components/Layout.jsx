import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsModal from './SettingsModal';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import Quote from './Quote';
import Clock from './Clock';

const Layout = ({
  showProductivePeople,
  onShowProductivePeopleChange,
  UserCounterComponent,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Check if any modal is open
  const isAnyModalOpen = isSettingsOpen || isContactOpen || isAboutOpen;
  const [timeFormat, setTimeFormat] = useState(() => {
    // Load from localStorage or default to 24h
    const saved = localStorage.getItem('timeFormat');
    return saved || '24h';
  });
  const [showSeconds, setShowSeconds] = useState(() => {
    // Load from localStorage or default to true
    const saved = localStorage.getItem('showSeconds');
    return saved !== null ? saved === 'true' : true;
  });
  const [showQuotes, setShowQuotes] = useState(() => {
    // Load from localStorage or default to true
    const saved = localStorage.getItem('showQuotes');
    return saved !== null ? saved === 'true' : true;
  });

  const handleTimeFormatChange = (format) => {
    setTimeFormat(format);
    localStorage.setItem('timeFormat', format);
  };

  const handleShowSecondsChange = (show) => {
    setShowSeconds(show);
    localStorage.setItem('showSeconds', show.toString());
  };

  const handleShowQuotesChange = (show) => {
    setShowQuotes(show);
    localStorage.setItem('showQuotes', show.toString());
  };

  return (
    <section
      className="flex flex-col items-center justify-center gap-16 z-10 relative"
      aria-label="Digital clock and timer display"
    >
      <Clock
        timeFormat={timeFormat}
        showSeconds={showSeconds}
        isModalOpen={isAnyModalOpen}
        onSettingsClick={() => {
          if (!isAnyModalOpen) {
            setIsSettingsOpen(true);
          }
        }}
      />

      {/* Decorative elements */}
      <div className="flex gap-4 mt-8" aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-pulse-delay-1"></div>
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-500 to-amber-500 shadow-[0_0_20px_rgba(236,72,153,0.6)] animate-pulse-delay-2"></div>
      </div>

      {/* Quote */}
      {showQuotes && (
        <div className="min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full">
          <Quote />
        </div>
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        timeFormat={timeFormat}
        onTimeFormatChange={handleTimeFormatChange}
        showSeconds={showSeconds}
        onShowSecondsChange={handleShowSecondsChange}
        showQuotes={showQuotes}
        onShowQuotesChange={handleShowQuotesChange}
        showProductivePeople={showProductivePeople}
        onShowProductivePeopleChange={onShowProductivePeopleChange}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* About Modal */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* User Counter - Rendered from App */}
      {UserCounterComponent}

      {/* Bottom Right Icons */}
      <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50">
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              setIsContactOpen(true);
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Contact the builder"
        >
          <SendIcon className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              setIsAboutOpen(true);
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="About"
        >
          <InfoIcon className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            if (!isAnyModalOpen) {
              // TODO: Open support modal
              console.log('Support clicked');
            }
          }}
          disabled={isAnyModalOpen}
          className={`transition-colors p-2 rounded-lg ${
            isAnyModalOpen
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label="Support"
        >
          <HelpOutlineIcon className="text-xl md:text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Layout;
