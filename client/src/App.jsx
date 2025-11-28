import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import UserCounter from './components/UserCounter';

function App() {
  const [showProductivePeople, setShowProductivePeople] = useState(() => {
    const saved = localStorage.getItem('showProductivePeople');
    return saved !== null ? saved === 'true' : true;
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

  const handleShowProductivePeopleChange = (show) => {
    setShowProductivePeople(show);
    localStorage.setItem('showProductivePeople', show.toString());
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(139,92,246,0.1)_0%,transparent_50%)] before:pointer-events-none">
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
