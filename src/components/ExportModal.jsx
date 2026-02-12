import { Download } from 'lucide-react';
import { exportToPNG, exportToPDF } from '../utils/export';

export default function ExportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleExportPNG = async () => {
    await exportToPNG('schedule-export', 'my-schedule.png');
    onClose();
  };

  const handleExportPDF = async () => {
    await exportToPDF('schedule-export', 'my-schedule.pdf');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: '#4A3F35' }}
          >
            Export Schedule
          </h2>
          <button
            onClick={onClose}
            className="text-2xl leading-none"
            style={{ color: 'rgba(74, 63, 53, 0.5)' }}
          >
            ×
          </button>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <button
            onClick={handleExportPNG}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all active:scale-95 shadow-sm"
            style={{
              backgroundColor: '#F4A261',
              color: 'white',
            }}
          >
            <Download size={20} />
            Save as PNG
          </button>

          <button
            onClick={handleExportPDF}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold transition-all active:scale-95 shadow-sm"
            style={{
              backgroundColor: '#F4A261',
              color: 'white',
            }}
          >
            <Download size={20} />
            Save as PDF
          </button>
        </div>

        {/* Info */}
        <p
          className="text-sm text-center mt-4"
          style={{ color: 'rgba(74, 63, 53, 0.6)' }}
        >
          High-quality export ready for printing
        </p>
      </div>
    </div>
  );
}
