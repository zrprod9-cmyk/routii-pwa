import { colors, typography } from '../constants/theme';

export default function ScheduleEditorScreen({ onNavigate }) {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-5"
      style={{ backgroundColor: colors.background }}
    >
      <h1 
        className={`${typography.header} mb-6`}
        style={{ color: colors.text.primary }}
      >
        Schedule Editor ✏️
      </h1>
      
      <div className="space-y-4 w-full max-w-md">
        <p 
          className="text-center"
          style={{ color: colors.text.secondary }}
        >
          Hello World - Schedule Editor Screen
        </p>
        
        <button
          onClick={() => onNavigate('home')}
          className="w-full py-4 rounded-xl font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: colors.button }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
