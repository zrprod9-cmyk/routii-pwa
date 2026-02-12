import PropTypes from 'prop-types';

const IconCard = ({ icon, isSelected, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(icon)}
      className={`
        flex flex-col items-center justify-center
        p-4 rounded-2xl
        transition-all duration-200
        hover:scale-105 hover:shadow-md
        ${isSelected 
          ? 'bg-[#F4A261] border-4 border-[#E07A3F] shadow-lg' 
          : 'bg-white border-2 border-transparent hover:border-[#F4A261]/30'
        }
      `}
    >
      <span className="text-4xl mb-2" role="img" aria-label={icon.name}>
        {icon.emoji}
      </span>
      <span 
        className={`
          text-xs text-center font-medium
          ${isSelected ? 'text-white' : 'text-[#4A3F35]'}
        `}
      >
        {icon.name}
      </span>
    </button>
  );
};

IconCard.propTypes = {
  icon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

IconCard.defaultProps = {
  isSelected: false,
};

export default IconCard;
