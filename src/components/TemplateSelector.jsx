import PropTypes from 'prop-types';
import { templates } from '../data/templates';

const TemplateSelector = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  const handleSelectTemplate = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choose a Template</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="template-list">
          {templates.map((template) => (
            <div key={template.id} className="template-card">
              <div className="template-header">
                <h3>{template.name}</h3>
                <span className="activity-count">
                  {template.activities.length} activities
                </span>
              </div>

              <div className="template-preview">
                {template.activities.slice(0, 3).map((activity, index) => (
                  <div key={index} className="preview-activity">
                    <span className="preview-emoji">{activity.icon.emoji}</span>
                    <span className="preview-name">{activity.name}</span>
                    <span className="preview-time">{activity.time}</span>
                  </div>
                ))}
                {template.activities.length > 3 && (
                  <div className="preview-more">
                    +{template.activities.length - 3} more
                  </div>
                )}
              </div>

              <button
                className="btn-primary"
                onClick={() => handleSelectTemplate(template)}
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #999;
          padding: 0;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #f0f0f0;
        }

        .template-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .template-card {
          border: 2px solid #e0e0e0;
          border-radius: 0.75rem;
          padding: 1.25rem;
          transition: all 0.2s;
        }

        .template-card:hover {
          border-color: #FF6B35;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.1);
        }

        .template-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .template-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #333;
        }

        .activity-count {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          color: #666;
        }

        .template-preview {
          margin-bottom: 1rem;
        }

        .preview-activity {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: #f8f8f8;
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .preview-emoji {
          font-size: 1.5rem;
        }

        .preview-name {
          flex: 1;
          font-size: 0.95rem;
          color: #333;
        }

        .preview-time {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
        }

        .preview-more {
          text-align: center;
          color: #999;
          font-size: 0.875rem;
          padding: 0.5rem;
        }

        .btn-primary {
          width: 100%;
          padding: 0.75rem;
          background: #FF6B35;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: #ff5722;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(255, 107, 53, 0.2);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          .modal-content {
            padding: 1rem;
          }

          .template-header h3 {
            font-size: 1.1rem;
          }

          .preview-activity {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

TemplateSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectTemplate: PropTypes.func.isRequired,
};

export default TemplateSelector;
