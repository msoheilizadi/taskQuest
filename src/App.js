import Header from './components/Header';
import React, {useEffect, useState} from 'react';
import Character from './components/box1';
import RewardsShop from './components/box2';
import DailyTasks from './components/box3';
import '../src/styles.css';
import HabitsCard from './components/box4';
import ToDoCard from './components/box5';
import NewChallengeModal from './components/newChallenge';
import NewTodoModal from './components/newToDo';
import NewHabitModal from './components/newHabit';
import NewDailyModal from './components/newDaily';
import NewRewardModal from './components/newReward';
import 'bootstrap/dist/css/bootstrap.min.css';

const MYLOCALIP = '192.168.1.3';

async function fetchCharacter() {
  try {
    const res = await fetch('http://localhost:5000/readCharacter');
    
    if (!res.ok) throw new Error('Failed to fetch character data');
    return res.json();
  } catch (err) {
    console.error(err);
  }
  
};

async function fetchHabits() {
    const response = await fetch('http://localhost:5000/readHabits');
    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }
    return  response.json();
}

async function fetchTodos() {
  const response = await fetch('http://localhost:5000/readTodos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return await response.json();
}

async function fetchDailies() {
  const response = await fetch('http://localhost:5000/readDailies');
  if (!response.ok) {
    throw new Error('Failed to fetch dailies');
  }
  return await response.json();
}

async function fetchRewards() {
  const response = await fetch('http://localhost:5000/readRewards');
  if (!response.ok) {
    throw new Error('Failed to fetch rewards');
  }
  return await response.json();
}


function addHabit(newHabit) {
  fetch('http://localhost:5000/newHabit', {  // Your backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newHabit),  // Convert JS object to JSON string
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add habit');
      }
      return response.json();
    })
    .then(data => {
      console.log('Habit added:', data);
      // Optionally update UI or state here
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function addDailyTask(newDailyTask) {
  fetch('http://localhost:5000/newDaily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDailyTask),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add daily task');
      return response.json();
    })
    .then(data => {
      console.log('Daily task added:', data);
      // Update UI or state
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function addReward(newReward) {
  fetch('http://localhost:5000/newReward', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReward),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add reward');
      return response.json();
    })
    .then(data => {
      console.log('Reward added:', data);
      // Update UI or state
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function addToDo(newToDo) {
  fetch('http://localhost:5000/newToDO', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToDo),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add to-do');
      return response.json();
    })
    .then(data => {
      console.log('To-Do added:', data);
      // Update UI or state
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function App() {
  const [characterData, setCharacterData] = useState({})
  const [habitsData, setHabitsData] = useState([]);
  const [sampleTasks, setSampleTasks] = useState([]);
  const [toDolist, setToDolist] = useState([]);
  const [shopItems, setShopItems] = useState([]);

  const [showModal, setShowToDoModal] = useState(false);
  const [showHabitModal, setShowHabitModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showDailyModal, setShowDailyModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);

  const refreshData = async () => {
    try {
      const [habits, dailies, todos, rewards, character] = await Promise.all([
        fetchHabits(),
        fetchDailies(),
        fetchTodos(),
        fetchRewards(),
        fetchCharacter()
      ]);
      setHabitsData(habits);
      setSampleTasks(dailies);
      setToDolist(todos);
      setShopItems(rewards);
      setCharacterData(character);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  async function subscribeUser() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array( 'BP6-_eNFnyx6toFu9gPZtOW8mRNISKBwzIrggateAs7FGdk1za8x_zkR0Pmo5XXukZGnwC5g9A8LP2_16g8cRSc'),
      });

      await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      console.log('User subscribed!');
    } catch (err) {
      console.error('Subscription failed:', err);
    }
  }
}

  useEffect(() => {
    refreshData();
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered:', registration);

            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
                // You can now subscribe to push notifications on backend
              }
            });
          })
          .catch(console.error);
    } else {
      console.warn('Push messaging is not supported');
    }

    subscribeUser();
  }, []);

  const deleteToDo = async (todo, isComplete) => {
    try {
      const res = await fetch(`http://localhost:5000/deleteToDo/${todo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isComplete }), // ⬅️ Send additional data here
    });
      if (!res.ok) throw new Error('Failed to delete task');
      await res.json();
      await refreshData(); // Refresh the list after deleting
    } catch (error) {
      console.error(error);
    }
  };

  const testNotification = async () => {
  const res = await fetch('http://localhost:5000/sendNotification', {
    method: 'POST',
  });

  const data = await res.json();
  alert(data.message);
};

  async function buyReward(rewardCost) {

  const res = await fetch('http://localhost:5000/buyReward', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cost: rewardCost }),
    
  })
  await refreshData();
  const testdata = await res.json();
  
  alert(testdata.message);
}

  const deleteHabit = async (habit) => {
  try {
    const res = await fetch(`http://localhost:5000/deleteHabit/${habit.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete habit');
    await res.json();
    await refreshData(); // Refresh all data, including habits
  } catch (error) {
    console.error('Error deleting habit:', error);
  }
};

const deleteReward = async (reward) => {
  try {
    const res = await fetch(`http://localhost:5000/deleteReward/${reward.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete reward');
    await res.json();
    await refreshData(); // Refresh all data after deletion
  } catch (error) {
    console.error('Error deleting reward:', error);
  }
};

const deleteDaily = async (daily, isComplete) => {
  try {
    const res = await fetch(`http://localhost:5000/deleteDaily/${daily.id}`, {
      method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isComplete }), // ⬅️ Send additional data here
    });
    if (!res.ok) throw new Error('Failed to delete daily task');
    await res.json();
    await refreshData(); // Refresh all data after deletion
  } catch (error) {
    console.error('Error deleting daily task:', error);
  }
};

  
  function SendTestNotification() {
  const handleSendNotification = async () => {
    try {
      const res = await fetch('http://localhost:5000/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // optional payload
      });

      const data = await res.json();
      alert(data.message || 'Notification sent');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };
  handleSendNotification();
}


  return (
    <div>
      <Header 
        setShowChallengeModal={setShowChallengeModal}
        setShowToDoModal={setShowToDoModal}
        setShowHabitModal={setShowHabitModal}
        setShowDailyModal={setShowDailyModal}
        setShowRewardModal={setShowRewardModal}
        goldAmount={characterData.coin}
      />
      <div className="card-container mt-4">
        <Character hpCurrent={characterData.hpCurrent} hpMax={characterData.hpMax} xpCurrent={characterData.xpCurrent}
        xpForNext={characterData.xpForNext} nextReward={characterData.nextReward} level={characterData.level}
        />
        <RewardsShop rewards={shopItems}  onDelete={deleteReward} buyReward={buyReward}/>
        <DailyTasks toDailyList={sampleTasks} date={today} onDelete={deleteDaily}/>
        <HabitsCard habits={habitsData} onDelete={deleteHabit}/>
        <ToDoCard todos={toDolist} onDelete={deleteToDo}/>
        <NewChallengeModal show={showChallengeModal} onClose={() => setShowChallengeModal(false)}/>
        <NewDailyModal show={showDailyModal} onClose={() => setShowDailyModal(false)} onSubmit={addDailyTask}/>
        <NewHabitModal show={showHabitModal} onClose={() => setShowHabitModal(false)} onSubmit={addHabit}/>
        <NewTodoModal show={showModal} onClose={() => setShowToDoModal(false)} onSubmit={addToDo}/>
        <NewRewardModal show={showRewardModal} onClose={() => setShowRewardModal(false)} onSubmit={addReward}/>
      </div>
    </div>
  );
}

export default App;