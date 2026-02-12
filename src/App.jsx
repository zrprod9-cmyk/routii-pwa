import { useState } from 'react';
import { ScheduleProvider } from './context/ScheduleContext';
import HomeScreen from './screens/HomeScreen';
import ScheduleEditorScreen from './screens/ScheduleEditorScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <ScheduleProvider>
      {currentScreen === 'home' && <HomeScreen onNavigate={navigate} />}
      {currentScreen === 'editor' && <ScheduleEditorScreen onNavigate={navigate} />}
    </ScheduleProvider>
  );
}

export default App;
