// document.addEventListener('DOMContentLoaded', function () {

//   const repeatSelect = document.getElementById("dailyRepeat");
//   const repeatUnit = document.getElementById("repeatUnit");
//   const repeatOnSection = document.getElementById("repeatOnSection");
//   const dayButtons = document.querySelectorAll('.day-toggle');
//   const positiveBtn = document.getElementById('positiveHabitBtn');
//   const negativeBtn = document.getElementById('negativeHabitBtn');

//   const openNewDailyButton = document.getElementById('openNewDaily');
//   const openNewHabitButton = document.getElementById('openNewHabit');
//   const openNewTodoButton = document.getElementById('openNewTodo');
//   const openNewRewardButton = document.getElementById('openNewReward');



//   openNewDailyButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     newDailyModal.show();
//   });
  
//   openNewHabitButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     newHabitModal.show();
//   });
  
//   openNewTodoButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     newTodoModal.show();
//   });

//   openNewRewardButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     newRewardModal.show();
//   })

//   positiveBtn.addEventListener('click', () => {
//     positiveBtn.classList.toggle('active');
//   });

//   negativeBtn.addEventListener('click', () => {
//     negativeBtn.classList.toggle('active');
//   });

//   dayButtons.forEach(button => {
//     button.addEventListener('click', function() {
//       // Toggle the 'active' class when button is clicked
//       button.classList.toggle('active');
//     });
//   });


//   repeatSelect.addEventListener("change", function () {
//     const value = repeatSelect.value;

//     // Update repeat unit text
//     switch (value) {
//       case "daily":
//         repeatUnit.textContent = "Day(s)";
//         break;
//       case "weekly":
//         repeatUnit.textContent = "Week(s)";
//         break;
//       case "monthly":
//         repeatUnit.textContent = "Month(s)";
//         break;
//       case "yearly":
//         repeatUnit.textContent = "Year(s)";
//         break;
//     }

//     // Show/hide "Repeat on" section
//     if (value === "weekly") {
//       repeatOnSection.classList.remove("d-none");
//     } else {
//       repeatOnSection.classList.add("d-none");
//     }
//   });
// });
