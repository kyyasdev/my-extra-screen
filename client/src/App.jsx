import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import UserCounter from './components/UserCounter';
import {
  getBackgroundClasses,
  getAnimatedGradientStyle,
} from './utils/backgroundColors';

function App() {
  const [showProductivePeople, setShowProductivePeople] = useState(() => {
    const saved = localStorage.getItem('showProductivePeople');
    return saved !== null ? saved === 'true' : true;
  });

  const [backgroundColor, setBackgroundColor] = useState(() => {
    const saved = localStorage.getItem('backgroundColor');
    return saved || 'default';
  });

  useEffect(() => {
    document.title =
      'My Extra Screen - Beautiful Clock, Timer & Pomodoro for Your Extra Monitor';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Transform your extra screen into a beautiful ambient display with a large clock, timer, and Pomodoro timer. Perfect for productivity, focus, and making your workspace more beautiful.'
      );
    }
  }, []);

  useEffect(() => {
    const handleBackgroundColorChange = (event) => {
      setBackgroundColor(event.detail);
    };

    window.addEventListener(
      'backgroundColorChanged',
      handleBackgroundColorChange
    );
    return () => {
      window.removeEventListener(
        'backgroundColorChanged',
        handleBackgroundColorChange
      );
    };
  }, []);

  const handleShowProductivePeopleChange = (show) => {
    setShowProductivePeople(show);
    localStorage.setItem('showProductivePeople', show.toString());
  };

  const backgroundClasses = getBackgroundClasses(backgroundColor);
  const isAnimated = backgroundColor === 'animated';

  return (
    <main
      className={`w-screen h-screen flex items-center justify-center ${backgroundClasses} relative overflow-hidden ${
        isAnimated ? 'animate-gradient-shift' : ''
      }`}
      style={isAnimated ? getAnimatedGradientStyle() : {}}
    >
      <h1 className="sr-only">
        My Extra Screen - Beautiful Clock, Timer, and Pomodoro Timer for Your
        Extra Screen
      </h1>
      <Layout
        showProductivePeople={showProductivePeople}
        onShowProductivePeopleChange={handleShowProductivePeopleChange}
        UserCounterComponent={showProductivePeople ? <UserCounter /> : null}
      />
    </main>
  );
}

export default App;
