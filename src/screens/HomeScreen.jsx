import { colors, typography } from '../constants/theme';

export default function HomeScreen({ onNavigate }) {
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
        <p 
          className="text-center"
          style={{ color: colors.text.secondary }}
        >
          Hello World - Home Screen
        </p>
        
        <button
          onClick={() => onNavigate('editor')}
          className="w-full py-4 rounded-xl font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: colors.button }}
        >
          Go to Schedule Editor
        </button>
      </div>
    </div>
  );
}
