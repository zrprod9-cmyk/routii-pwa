const STORAGE_KEY = 'routii_schedules';

export const saveSchedules = (schedules) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
};

export const loadSchedules = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCurrentSchedule = (scheduleId) => {
  localStorage.setItem('routii_current', scheduleId);
};

export const loadCurrentSchedule = () => {
  return localStorage.getItem('routii_current');
};
