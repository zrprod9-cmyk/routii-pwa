import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import IconSelector from './IconSelector';
import { generateIcon, validateImageFile } from '../utils/iconGenerator';

const ActivityEditModal = ({ isOpen, onClose, onSave, activity }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [icon, setIcon] = useState(null);
  const [showIconSelector, setShowIconSelector] = useState(false);
  const [errors, setErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when activity changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setName(activity?.name || '');
      setTime(activity?.time || '');
      setIcon(activity?.icon || null);
      setErrors({});
    }
  }, [isOpen, activity]);

  const handleSave = () => {
    // Validation
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Activity name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save
    onSave({
      name: name.trim(),
      time: time.trim(),
      icon: icon,
    });

    // Close
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleGenerateIcon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setErrors((prev) => ({ ...prev, aiIcon: validation.error }));
      return;
    }

    setIsGenerating(true);
    setErrors((prev) => ({ ...prev, aiIcon: undefined }));

    try {
      const generatedUrl = await generateIcon(file, name || 'activity');
      
      if (generatedUrl) {
        // Set as custom icon
        setIcon({
          id: Date.now(),
          name: 'AI Generated',
          emoji: '🎨',
          customUrl: generatedUrl,
        });
      } else {
        setErrors((prev) => ({ ...prev, aiIcon: 'Failed to generate icon. Please try again.' }));
      }
    } catch (error) {
      console.error('Generation error:', error);
      setErrors((prev) => ({ ...prev, aiIcon: 'Failed to generate icon. Please try again.' }));
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={handleCancel}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="relative w-full max-w-md bg-[#FFF8E7] rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up mx-4">
          {/* Header */}
          <div className="p-6 border-b border-[#4A3F35]/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#4A3F35]">
                {activity ? 'Edit Activity' : 'Add Activity'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-[#4A3F35] hover:text-[#F4A261] transition-colors p-2"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Icon Picker */}
            <div>
              <label className="block text-sm font-medium text-[#4A3F35] mb-2">
                Icon
              </label>
              <button
                onClick={() => setShowIconSelector(true)}
                className="w-full p-4 rounded-xl border-2 border-[#4A3F35]/10 bg-white hover:border-[#F4A261] transition-colors flex items-center justify-center gap-3"
              >
                {icon?.customUrl ? (
                  <>
                    <img src={icon.customUrl} alt="Custom icon" className="w-10 h-10 rounded object-cover" />
                    <span className="text-[#4A3F35]">{icon.name}</span>
                  </>
                ) : icon ? (
                  <>
                    <span className="text-4xl">{icon.emoji}</span>
                    <span className="text-[#4A3F35]">{icon.name}</span>
                  </>
                ) : (
                  <span className="text-[#4A3F35]/50">Choose an icon</span>
                )}
              </button>
              
              {/* AI Generation */}
              <div className="mt-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleGenerateIcon}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isGenerating || !name}
                  className="w-full py-2.5 px-4 rounded-lg border-2 border-[#F4A261] text-[#F4A261] hover:bg-[#F4A261] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Generate Custom Icon with AI
                    </>
                  )}
                </button>
                {!name && (
                  <p className="text-xs text-[#4A3F35]/50 mt-1 text-center">Enter activity name first</p>
                )}
                {errors.aiIcon && (
                  <p className="text-red-500 text-xs mt-1 text-center">{errors.aiIcon}</p>
                )}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-[#4A3F35] mb-2">
                Activity Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g., Brush Teeth"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-[#4A3F35] placeholder-[#4A3F35]/50 focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#4A3F35]/10 focus:border-[#F4A261]'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-[#4A3F35] mb-2">
                Time (optional)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 7:00 AM"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#4A3F35]/10 bg-white text-[#4A3F35] placeholder-[#4A3F35]/50 focus:border-[#F4A261] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#4A3F35]/10 flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 rounded-xl font-semibold text-[#4A3F35] bg-white border-2 border-[#4A3F35]/10 hover:bg-[#4A3F35]/5 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-semibold text-white transition-all active:scale-95"
              style={{ backgroundColor: '#F4A261' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Icon Selector */}
      <IconSelector
        isOpen={showIconSelector}
        onClose={() => setShowIconSelector(false)}
        onSelect={setIcon}
        selectedIcon={icon}
      />
    </>
  );
};

ActivityEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  activity: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    icon: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      emoji: PropTypes.string,
    }),
  }),
};

ActivityEditModal.defaultProps = {
  activity: null,
};

export default ActivityEditModal;
