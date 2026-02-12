import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const colors = {
  mint: '#C8E6D0',
  sky: '#D4E9F7',
  pink: '#F5D4D4',
  butter: '#FFF4C4',
};

const ActivityCard = ({ activity, index, onEdit, onDelete, onToggleDone }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Rotate through colors
  const colorKeys = ['mint', 'sky', 'pink', 'butter'];
  const backgroundColor = colors[colorKeys[index % colorKeys.length]];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      <div
        className="h-[80px] rounded-2xl flex items-center px-5 shadow-sm"
        style={{ backgroundColor }}
      >
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="mr-3 cursor-grab active:cursor-grabbing text-[#4A3F35]/40 hover:text-[#4A3F35]/60 transition-colors touch-none"
          aria-label="Drag to reorder"
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <circle cx="4" cy="6" r="2" fill="currentColor" />
            <circle cx="12" cy="6" r="2" fill="currentColor" />
            <circle cx="4" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="4" cy="18" r="2" fill="currentColor" />
            <circle cx="12" cy="18" r="2" fill="currentColor" />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-[40px] leading-none mr-4 flex-shrink-0">
          {activity.icon?.emoji || '📋'}
        </div>

        {/* Name and Time */}
        <div className="flex-1 min-w-0">
          <div
            className="font-semibold text-[18px] leading-tight"
            style={{ color: '#4A3F35' }}
          >
            {activity.name}
          </div>
          {activity.time && (
            <div
              className="text-[14px] leading-tight mt-1"
              style={{ color: 'rgba(74, 63, 53, 0.7)' }}
            >
              {activity.time}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggleDone(activity.id)}
            className="w-6 h-6 rounded border-2 flex items-center justify-center transition-all"
            style={{
              borderColor: '#4A3F35',
              backgroundColor: activity.done ? '#4A3F35' : 'transparent',
            }}
            aria-label={activity.done ? 'Mark as not done' : 'Mark as done'}
          >
            {activity.done && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3 3 7-7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(activity)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A3F35]/60 hover:text-[#4A3F35] hover:bg-black/5 transition-all"
            aria-label="Edit activity"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M12.5 2.5l3 3-9 9H3.5v-3l9-9z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(activity.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A3F35]/60 hover:text-red-500 hover:bg-black/5 transition-all"
            aria-label="Delete activity"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 5h10M7 5V3h4v2M8 8v5M10 8v5M5 5l1 9h6l1-9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      emoji: PropTypes.string,
    }),
    time: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
};

export default ActivityCard;
