import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { starterIcons, categories } from '../data/starterIcons';
import IconCard from './IconCard';

const IconSelector = ({ isOpen, onClose, onSelect, selectedIcon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return starterIcons.filter(icon => {
      const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || icon.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#FFF8E7] rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-[#4A3F35]/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#4A3F35]">Choose an Icon</h2>
            <button
              onClick={onClose}
              className="text-[#4A3F35] hover:text-[#F4A261] transition-colors p-2"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-[#4A3F35]/10 bg-white text-[#4A3F35] placeholder-[#4A3F35]/50 focus:border-[#F4A261] focus:outline-none transition-colors"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A3F35]/50"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-4 border-b border-[#4A3F35]/10 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  transition-all duration-200
                  ${activeCategory === category.id
                    ? 'bg-[#F4A261] text-white shadow-md'
                    : 'bg-white text-[#4A3F35] hover:bg-[#F4A261]/20'
                  }
                `}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredIcons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[#4A3F35]/70">
              <span className="text-6xl mb-4">🔍</span>
              <p className="text-lg">No icons found</p>
              <p className="text-sm">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {filteredIcons.map(icon => (
                <IconCard
                  key={icon.id}
                  icon={icon}
                  isSelected={selectedIcon?.id === icon.id}
                  onClick={(selectedIcon) => {
                    onSelect(selectedIcon);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

IconSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedIcon: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    emoji: PropTypes.string,
    category: PropTypes.string,
  }),
};

IconSelector.defaultProps = {
  selectedIcon: null,
};

export default IconSelector;
