import React, { createContext, useState, useEffect, useCallback } from 'react';
import { createSchedule, createActivity } from '../models/schedule';
import {
  saveSchedules,
  loadSchedules,
  saveCurrentSchedule,
  loadCurrentSchedule,
} from '../utils/storage';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadedSchedules = loadSchedules();
    const loadedCurrentId = loadCurrentSchedule();
    
    // If no schedules exist, create a default one
    if (loadedSchedules.length === 0) {
      const defaultSchedule = createSchedule('Morning Routine ☀️');
      setSchedules([defaultSchedule]);
      setCurrentScheduleId(defaultSchedule.id);
    } else {
      setSchedules(loadedSchedules);
      setCurrentScheduleId(loadedCurrentId);
    }
  }, []);

  // Auto-save to LocalStorage whenever schedules change
  useEffect(() => {
    if (schedules.length > 0) {
      saveSchedules(schedules);
    }
  }, [schedules]);

  // Auto-save current schedule ID
  useEffect(() => {
    if (currentScheduleId) {
      saveCurrentSchedule(currentScheduleId);
    }
  }, [currentScheduleId]);

  // Get current schedule object
  const currentSchedule = schedules.find((s) => s.id === currentScheduleId) || null;

  // Create new schedule
  const createNewSchedule = useCallback((name) => {
    const newSchedule = createSchedule(name);
    setSchedules((prev) => [...prev, newSchedule]);
    setCurrentScheduleId(newSchedule.id);
    return newSchedule;
  }, []);

  // Delete schedule
  const deleteSchedule = useCallback((id) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    if (currentScheduleId === id) {
      setCurrentScheduleId(null);
    }
  }, [currentScheduleId]);

  // Update schedule
  const updateSchedule = useCallback((id, updates) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? { ...schedule, ...updates, updatedAt: new Date().toISOString() }
          : schedule
      )
    );
  }, []);

  // Set current schedule
  const setCurrentSchedule = useCallback((id) => {
    setCurrentScheduleId(id);
  }, []);

  // Add activity to schedule
  const addActivity = useCallback((scheduleId, activity) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              activities: [...schedule.activities, activity],
              updatedAt: new Date().toISOString(),
            }
          : schedule
      )
    );
  }, []);

  // Update activity
  const updateActivity = useCallback((scheduleId, activityId, updates) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              activities: schedule.activities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, ...updates }
                  : activity
              ),
              updatedAt: new Date().toISOString(),
            }
          : schedule
      )
    );
  }, []);

  // Delete activity
  const deleteActivity = useCallback((scheduleId, activityId) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              activities: schedule.activities.filter((a) => a.id !== activityId),
              updatedAt: new Date().toISOString(),
            }
          : schedule
      )
    );
  }, []);

  // Reorder activities
  const reorderActivities = useCallback((scheduleId, newOrder) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              activities: newOrder,
              updatedAt: new Date().toISOString(),
            }
          : schedule
      )
    );
  }, []);

  // Toggle activity done status
  const toggleActivityDone = useCallback((scheduleId, activityId) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === scheduleId
          ? {
              ...schedule,
              activities: schedule.activities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, done: !activity.done }
                  : activity
              ),
              updatedAt: new Date().toISOString(),
            }
          : schedule
      )
    );
  }, []);

  const value = {
    schedules,
    currentSchedule,
    currentScheduleId,
    createSchedule: createNewSchedule,
    deleteSchedule,
    updateSchedule,
    setCurrentSchedule,
    addActivity,
    updateActivity,
    deleteActivity,
    reorderActivities,
    toggleActivityDone,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
