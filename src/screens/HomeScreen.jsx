import { useState } from 'react';
import { colors, typography } from '../constants/theme';
import IconSelector from '../components/IconSelector';

export default function HomeScreen({ onNavigate }) {
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    console.log('Selected icon:', icon);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-5"
      style={{ backgroundColor: colors.background }}
    >
      <h1 
        className={`${typography.header} mb-6`}
        style={{ color: colors.text.primary }}
      >
        Morning Routine ☀️
      </h1>
      
      <div className="space-y-4 w-full max-w-md">
        {selectedIcon && (
          <div 
            className="text-center p-4 bg-white rounded-xl"
            style={{ color: colors.text.primary }}
          >
            <span className="text-5xl mb-2 block">{selectedIcon.emoji}</span>
            <p className="font-semibold">{selectedIcon.name}</p>
            <p className="text-sm opacity-70">Category: {selectedIcon.category}</p>
          </div>
        )}
        
        <button
          onClick={() => setIsIconSelectorOpen(true)}
          className="w-full py-4 rounded-xl font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: colors.button }}
        >
          🎨 Test Icon Selector
        </button>
        
        <button
          onClick={() => onNavigate('editor')}
          className="w-full py-4 rounded-xl font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: colors.button }}
        >
          Go to Schedule Editor
        </button>
      </div>

      <IconSelector
        isOpen={isIconSelectorOpen}
        onClose={() => setIsIconSelectorOpen(false)}
        onSelect={handleIconSelect}
        selectedIcon={selectedIcon}
      />
    </div>
  );
}
