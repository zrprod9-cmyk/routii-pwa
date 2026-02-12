import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Download } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';
import { createActivity } from '../models/schedule';
import ActivityCard from '../components/ActivityCard';
import TimelineConnector from '../components/TimelineConnector';
import ActivityEditModal from '../components/ActivityEditModal';
import ExportModal from '../components/ExportModal';

export default function ScheduleEditorScreen({ onNavigate }) {
  const {
    currentSchedule,
    addActivity,
    updateActivity,
    deleteActivity,
    reorderActivities,
    toggleActivityDone,
  } = useSchedule();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Configure drag sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  );

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activities = currentSchedule.activities;
    const oldIndex = activities.findIndex((a) => a.id === active.id);
    const newIndex = activities.findIndex((a) => a.id === over.id);

    const newOrder = arrayMove(activities, oldIndex, newIndex);
    reorderActivities(currentSchedule.id, newOrder);
  };

  // Handle add activity
  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  // Handle edit activity
  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setIsModalOpen(true);
  };

  // Handle save activity (add or update)
  const handleSaveActivity = (data) => {
    if (editingActivity) {
      // Update existing
      updateActivity(currentSchedule.id, editingActivity.id, data);
    } else {
      // Add new
      const newActivity = createActivity(data.name, data.icon, data.time);
      addActivity(currentSchedule.id, newActivity);
    }
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  // Handle delete activity
  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      deleteActivity(currentSchedule.id, activityId);
    }
  };

  // Handle toggle done
  const handleToggleDone = (activityId) => {
    toggleActivityDone(currentSchedule.id, activityId);
  };

  // If no schedule selected, show message
  if (!currentSchedule) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-5"
        style={{ backgroundColor: '#FFF8E7' }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: '#4A3F35' }}
        >
          No Schedule Selected
        </h1>
        <p
          className="text-center mb-6"
          style={{ color: 'rgba(74, 63, 53, 0.7)' }}
        >
          Please create or select a schedule from the home screen.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="py-3 px-6 rounded-xl font-semibold text-white transition-transform active:scale-95"
          style={{ backgroundColor: '#F4A261' }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const activities = currentSchedule.activities || [];

  return (
    <div
      className="min-h-screen pb-8"
      style={{ backgroundColor: '#FFF8E7' }}
    >
      {/* Header */}
      <div className="pt-12 pb-6 px-5">
        <div className="flex items-center justify-between mb-2">
          <div className="w-10"></div>
          <h1
            className="text-[28px] font-bold"
            style={{ color: '#4A3F35' }}
          >
            {currentSchedule.name}
          </h1>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-lg transition-all active:scale-95"
            style={{
              border: '2px solid #6B5B4F',
              color: '#6B5B4F',
            }}
            aria-label="Export schedule"
          >
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Export wrapper */}
      <div id="schedule-export" className="px-5 pb-6">
        {/* Schedule Title (for export) */}
        <h2
          className="text-[24px] font-bold text-center mb-6"
          style={{ color: '#4A3F35' }}
        >
          {currentSchedule.name}
        </h2>

        {/* Activities List */}
        {activities.length === 0 ? (
          <div className="py-12 text-center">
            <span className="text-6xl mb-4 block">📋</span>
            <p
              className="text-lg mb-2"
              style={{ color: '#4A3F35' }}
            >
              No activities yet
            </p>
            <p
              className="text-sm"
              style={{ color: 'rgba(74, 63, 53, 0.7)' }}
            >
              Tap the button below to add your first activity
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activities.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <div>
                {activities.map((activity, index) => (
                  <div key={activity.id}>
                    <ActivityCard
                      activity={activity}
                      index={index}
                      onEdit={handleEditActivity}
                      onDelete={handleDeleteActivity}
                      onToggleDone={handleToggleDone}
                    />
                    {index < activities.length - 1 && <TimelineConnector />}
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-5 mt-6">
        {/* Add Activity Button */}
        <button
          onClick={handleAddActivity}
          className="w-full h-[52px] rounded-xl font-semibold text-white text-[16px] transition-transform active:scale-95 shadow-sm"
          style={{ backgroundColor: '#F4A261' }}
        >
          + Add Activity
        </button>

        {/* Back Button (for testing) */}
        <button
          onClick={() => onNavigate('home')}
          className="w-full mt-4 py-3 rounded-xl font-medium transition-all active:scale-95"
          style={{
            color: '#4A3F35',
            backgroundColor: 'white',
            border: '2px solid rgba(74, 63, 53, 0.1)',
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Activity Edit Modal */}
      <ActivityEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        activity={editingActivity}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
