import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ScheduleEditorScreen from './screens/ScheduleEditorScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      {currentScreen === 'home' && <HomeScreen onNavigate={navigate} />}
      {currentScreen === 'editor' && <ScheduleEditorScreen onNavigate={navigate} />}
    </>
  );
}

export default App;
