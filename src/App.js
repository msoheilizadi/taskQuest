import Header from './components/Header';
import React, {useEffect, useState} from 'react';
import Character from './components/box1';
import RewardsShop from './components/box2';
import DailyTasks from './components/box3';
import '../src/styles.css';
import HabitsCard from './components/box4';
import ToDoCard from './components/box5';
import NewTodoModal from './components/newToDo';
import NewHabitModal from './components/newHabit';
import NewDailyModal from './components/newDaily';
import NewRewardModal from './components/newReward';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChallengeWizard from './components/challenge/challengeWizard';
import {
  fetchCharacter,
  fetchHabits,
  fetchTodos,
  fetchDailies,
  fetchRewards,
  buyReward,
  addHabit,
  addToDo,
  addReward,
  addDailyTask,
  deleteDaily,
  deleteReward,
  deleteHabit,
  deleteToDo,
  newChallenge
} from './api/index';
import { Routes, Route } from 'react-router-dom';

const handleChallengeSubmit = (data) => {
  console.log("Received challenge data from modal:", data);
  newChallenge(data);
  // Do something with the data, like save it or update state
};



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

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Routes>
    <Route 
      path='/'
      element={
      <div>
        <Header 
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
          <NewDailyModal show={showDailyModal} onClose={() => setShowDailyModal(false)} onSubmit={addDailyTask}/>
          <NewHabitModal show={showHabitModal} onClose={() => setShowHabitModal(false)} onSubmit={addHabit}/>
          <NewTodoModal show={showModal} onClose={() => setShowToDoModal(false)} onSubmit={addToDo}/>
          <NewRewardModal show={showRewardModal} onClose={() => setShowRewardModal(false)} onSubmit={addReward}/>
        </div>
      </div>
      }
    />
    <Route path='/challenge' element={<ChallengeWizard show={true} onSubmit={handleChallengeSubmit}/>} />
    </Routes>
  );
}

export default App;