import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
// import pg from "pg";
import cors from 'cors';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import dotnev from 'dotenv';


// const db = new pg.Client({
//     user: "",
//     host: "",
//     database: "",
//     password: ""
// })
// db.connect();

dotnev.config();

const app = express();
const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFile = path.join(__dirname, 'data.json');
const subscribeFile = path.join(__dirname, 'subscribe.json');

const readData = async () => {
  const file = await readFile(dataFile, 'utf-8');
  return JSON.parse(file);
};

const writeSubscribe = async (data) => {
  await writeFile(subscribeFile, JSON.stringify(data, null, 2));
};

const writeData = async (data) => {
  await writeFile(dataFile, JSON.stringify(data, null, 2));
};


function getNextWeeklyRepeat(startDateStr, repeatOn, intervalWeeks) {
  const weekdayMap = {
    su: 0, mo: 1, tu: 2, we: 3,
    th: 4, fr: 5, sa: 6
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(startDateStr);
  startDate.setHours(0, 0, 0, 0);

  const targetWeekdays = repeatOn.map(abbr => weekdayMap[abbr.toLowerCase()]);

  // Calculate how many full cycles have passed since startDate
  const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const fullWeeksSinceStart = Math.floor(daysSinceStart / 7);
  const currentCycleStart = new Date(startDate);
  currentCycleStart.setDate(startDate.getDate() + fullWeeksSinceStart * 7 * intervalWeeks);

  // Try current cycle first
  let possibleDates = targetWeekdays.map(dow => {
    const d = new Date(currentCycleStart);
    const offset = (dow - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + offset);
    return d;
  }).filter(date => date >= today);

  if (possibleDates.length > 0) {
    return possibleDates.sort((a, b) => a - b)[0].toISOString().split("T")[0];
  }

  // Otherwise, move to next cycle
  const nextCycleStart = new Date(currentCycleStart);
  nextCycleStart.setDate(currentCycleStart.getDate() + 7 * intervalWeeks);

  possibleDates = targetWeekdays.map(dow => {
    const d = new Date(nextCycleStart);
    const offset = (dow - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + offset);
    return d;
  });

  return possibleDates.sort((a, b) => a - b)[0].toISOString().split("T")[0];
}



function applyGainsToCharacter(data, { coinGain = 0, xpGain = 0 }) {
  if (!data.character) {
    throw new Error("Character data not found.");
  }

  const character = data.character;

  // Apply coin gain
  character.coin += coinGain;

  // Apply XP gain
  character.xpCurrent += xpGain;

  // Handle level up
  while (character.xpCurrent >= character.xpForNext) {
    character.xpCurrent -= character.xpForNext;
    character.level += 1;
    character.xpForNext = Math.floor(character.xpForNext * 1.2); // or another formula
  }
}


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use(express.static("public"));

app.post('/subscribe',async (req, res) => {
  const subscription = req.body;

  await writeSubscribe(subscription);

  res.status(201).json({ message: 'User subscribed successfully' });
});


app.get('/readHabits', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
});

app.get('/readTodos', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.get('/readDailies', async (req, res) => {
  try {
    const data = await readData();
    console.log("Before");
    console.log(data.dailys);
    // const updateData = data.dailys.filter(daily => daily)
    res.status(200).json(data.dailys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dailies' });
  }
});

app.get('/readRewards', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.rewards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

app.post('/newHabit', async (req, res) => {
  const { name, notes, habitType, minusDisabled, plusDisabled } = req.body;
  try {
    const data = await readData();
    const newHabit = {
      id: Date.now(),
      name,
      notes,
      habitType,
      minusDisabled,
      plusDisabled
    };
    data.habits.push(newHabit);
    await writeData(data);
    res.status(201).json(newHabit);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add habit' });
  }
});

app.get('/readCharacter', async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json(data.character);         
    console.log("success");
    console.log(data.character);
  } catch (error) {
    console.error('Error reading character data:', error);
    res.status(500).json({ error: 'Failed to read character data' });
  }
});

app.post('/newToDo', async (req, res) => {
  const { title, notes, dueDate, dueTime,  priority } = req.body;
  console.log(req.body);
  
  try {
    const data = await readData();
    const newToDo = {
      id: Date.now(),
      title,
      notes,
      dueDate,
      dueTime,
      priority
    };
    data.todos.push(newToDo);
    await writeData(data);
    res.status(201).json(newToDo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add todo' });
  }
});

app.post('/newDaily', async (req, res) => {
  const { title, notes, startDate, repeats, repeatType, repeatEvery, repeatOn, priority } = req.body;
  console.log(req.body);
  let nextRepeat;
  
  //Genereting next time to repeat this
  if (repeatType == "daily") {
    const nextRepeatTemp = new Date(startDate);
    nextRepeatTemp.setDate(nextRepeatTemp.getDate() + Number(repeatEvery));
    // console.log(nextRepeatTemp.toISOString().split('T')[0]);
    
    nextRepeat = nextRepeatTemp.toISOString().split('T')[0];
  } else if (repeatType == "weekly") {
    nextRepeat = getNextWeeklyRepeat(startDate, repeatOn, Number(repeatEvery));
  }
  
  try {
    const data = await readData();
    const newDaily = {
      id: Date.now(),
      title,
      notes,
      startDate,
      repeatType,
      repeatEvery,
      repeatOn,
      nextRepeat,
      repeats,
      priority
    };
    data.dailys.push(newDaily);
    await writeData(data);
    res.status(201).json(newDaily);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add daily task' });
  }
});

app.post('/newReward', async (req, res) => {
  const { name, notes, cost } = req.body;
  try {
    const data = await readData();
    const newReward = {
      id: Date.now(),
      name,
      notes,
      cost
    };
    data.rewards.push(newReward);
    await writeData(data);
    res.status(201).json(newReward);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add reward' });
  }
});

app.delete('/deleteToDo/:id', async (req, res) => {
  const { id } = req.params;
  const { isComplete } = req.body;

  try {
    const data = await readData();  

    if (!Array.isArray(data.todos)) {
      return res.status(500).json({ error: 'Invalid data structure: todos is not an array' });
    }


    const idNum = Number(id);
    data.todos = data.todos.filter(todo => todo.id !== idNum);

    if(isComplete){applyGainsToCharacter(data, {coinGain: 20, xpGain: 20})}

    await writeData(data); 
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.delete('/deleteHabit/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readData(); // Reads entire data file with habits etc.
    if (!Array.isArray(data.habits)) {
      return res.status(500).json({ error: 'Invalid data structure: habits is not an array' });
    }

    const idNum = Number(id);

    data.habits = data.habits.filter(habit => habit.id !== idNum);

    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).json({ error: 'Failed to delete habit' });
  }
});

app.delete('/deleteReward/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readData();
    if (!Array.isArray(data.rewards)) {
      return res.status(500).json({ error: 'Invalid data structure: rewards is not an array' });
    }

    const idNum = Number(id);
    data.rewards = data.rewards.filter(reward => reward.id !== idNum);

    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting reward:', error);
    res.status(500).json({ error: 'Failed to delete reward' });
  }
});

app.delete('/deleteDaily/:id', async (req, res) => {
  const { id } = req.params;
  const { isComplete } = req.body;

  try {
    const data = await readData();
    if (!Array.isArray(data.dailys)) {
      return res.status(500).json({ error: 'Invalid data structure: dailys is not an array' });
    }

    const idNum = Number(id);
    data.dailys = data.dailys.filter(daily => daily.id !== idNum);

    if(isComplete){applyGainsToCharacter(data, {coinGain: 4, xpGain: 10})};


    await writeData(data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting daily task:', error);
    res.status(500).json({ error: 'Failed to delete daily task' });
  }
});

app.post('/buyReward', async (req, res) => {
  try {
    const { cost } = req.body;

    if (typeof cost !== 'number') {
      return res.status(400).json({ error: 'Invalid cost value' });
    }

    const data = await readData();
    const character = data.character;

    if (character.coin < cost) {
      return res.status(400).json({ message: 'Not enough coins' });
    }

    character.coin -= cost;

    await writeData(data);

    res.json({ message: 'Reward purchased', updatedCharacter: character });

  } catch (error) {
    console.error('Error buying reward:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// Read all habits
// app.get('/readHabits', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM habits ORDER BY id');
//     console.log(result);
    
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch habits' });
//   }
// });

// app.get('/readTodos', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM todo ORDER BY id');
//     console.log(result);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch todos' });
//   }
// });

// app.get('/readDailies', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM dailys ORDER BY id');
//     console.log(result);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch dailies' });
//   }
// });

// app.get('/readRewards', async (req, res) => {
//   try {
//     const result = await db.query('SELECT * FROM rewards ORDER BY id');
//     console.log(result);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch rewards' });
//   }
// });



// app.get("/", async (req , res) => {
//     const toDos = await ReadToDO();
//     const toDaily = await ReadDaily();
//     res.render(_dirname + "/views/index.ejs", {toDolist: toDos, toDailylist: toDaily});
// })

// app.post("/newToDo", async (req , res) => {
//     const result = req.body;
//     console.log(result);
//     await WriteToDo(result["title"], result["notes"], result["dueDate"], result["priority"]);
// })

// app.post("/readToDo", async (req, res) => {

// })

// app.post('/newHabit', async (req, res) => {
//   const { name, notes, habitType, minusDisabled, plusDisabled } = req.body;
//   try {
//     const result = await db.query(
//       `INSERT INTO habits (name, notes, habit_type, minus_disabled, plus_disabled)
//        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [name, notes, habitType, minusDisabled, plusDisabled]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add habit' });
//   }
// });

// // Add new reward
// app.post('/newReward', async (req, res) => {
//   const { name, notes, cost } = req.body;
//   try {
//     const result = await db.query(
//       `INSERT INTO rewards (name, notes, cost)
//        VALUES ($1, $2, $3) RETURNING *`,
//       [name, notes, cost]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add reward' });
//   }
// });

// // Add new daily task
// app.post('/newDaily', async (req, res) => {
//   const { title, notes, startDate, repeats, priority } = req.body;
//   try {
//     const result = await db.query(
//       `INSERT INTO dailys (title, notes, start_date, repeats, priority)
//        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [title, notes, startDate, repeats, priority]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to add daily task' });
//   }
// });

// app.post("/newDaily", async (req,res) => {
//     const result = req.body;
//     await WriteDaily(result["title"], result["notes"], result["startDate"], result["repeatType"], result["repeatEvery"]);
//     res.redirect("/");
// })

app.listen(port, () => {
    console.log("Server running");
})