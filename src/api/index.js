const BASE = 'http://localhost:5000'

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

const handleJson = async (res) => {
  if (!res.ok) throw new Error('Server error');
  return res.json();
};

const postJson = (url, data) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleJson);

export const fetchCharacter = () => fetchJson(`${BASE}/readCharacter`);
export const fetchHabits = () => fetchJson(`${BASE}/readHabits`);
export const fetchTodos = () => fetchJson(`${BASE}/readTodos`);
export const fetchDailies = () => fetchJson(`${BASE}/readDailies`);
export const fetchRewards = () => fetchJson(`${BASE}/readRewards`);

export const addHabit = (habit) => postJson(`${BASE}/newHabit`, habit);
export const addToDo = (todo) => postJson(`${BASE}/newToDO`, todo);
export const addDailyTask = (daily) => postJson(`${BASE}/newDaily`, daily);
export const addReward = (reward) => postJson(`${BASE}/newReward`, reward);
export const buyReward = (cost) => postJson(`${BASE}/buyReward`, { cost });

export const deleteHabit = (habit) =>
  fetch(`${BASE}/deleteHabit/${habit.id}`, { method: 'DELETE' }).then(handleJson);

export const deleteReward = (reward) =>
  fetch(`${BASE}/deleteReward/${reward.id}`, { method: 'DELETE' }).then(handleJson);

export const deleteDaily = (daily, isComplete) =>
  fetch(`${BASE}/deleteDaily/${daily.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isComplete }),
  }).then(handleJson);

export const deleteToDo = (todo, isComplete) =>
  fetch(`${BASE}/deleteToDo/${todo.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isComplete }),
  }).then(handleJson);