export const createSchedule = (name = 'New Schedule') => ({
  id: Date.now().toString(),
  name,
  activities: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const createActivity = (name, icon, time = '') => ({
  id: Date.now().toString() + Math.random(),
  name,
  icon, // { id, name, emoji }
  time, // e.g., "7:00 AM"
  done: false,
  color: null, // assigned automatically (mint, sky, pink, butter)
});
