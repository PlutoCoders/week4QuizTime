// Setting up my variables for dry code
let currentQuestionIndex = 0;
let currentScorePoints = 0;
let timeLeftSeconds = 100;
let timeForGameOver = 0;
let gameOverDelay = 1500;
let quizTimer;

// Define
const getDom = (selector) => document.querySelector(selector);

// Call
const timeLeft = getDom(`#timeLeft`);
const currentScore = getDom(`#currentScore`);
const questionContainer = getDom(`.questionContainer`);
const questionCount = getDom(`#questionCount`);
const statsContainer = getDom(`.statsContainer`);
const scoreForm = getDom(`.scoreForm`);

// Button Variables
var startButton = document.querySelector("#StartButton");
var submitButton = document.querySelector("#SubButton");
var backButton = document.querySelector("#BackButton");

// Section Variables
var preStartArea = document.querySelector("#PreStartArea");
var quizArea = document.querySelector("#QuizArea");
var leaderboardArea = document.querySelector("#LeaderboardArea");

const startbuttonContainer = document.querySelector(`.startbuttonContainer`);

//Questions and Answers objects (copied and pasted)
var questionsArray = [
  {
    id: 1,
    questionText:
      "_______ is the process of finding errors and fixing them within a program.",
    questionAnswers: ["Compiling ", "Debugging ", "Executing ", "Scanning"],
    rightAnswer: "Debugging ",
  },
  {
    id: 2,
    questionText:
      "Which of the sets of statements below will add 1 to x if x is positive and subtract 1 from x if x is negative but leave x alone if x is 0?",
    questionAnswers: [
      "If (x > 0) x++; else x--; ",
      "If (x > 0) x++; else if (x < 0) x--; ",
      "X++; x--; ",
      "If (x == 0) x = 0; else x++; x--; ",
    ],
    rightAnswer: "If (x == 0) x = 0; else x++; x--; ",
  },
  {
    id: 3,
    questionText: "Which command will stop an infinite loop?",
    questionAnswers: ["Alt + C ", "Shift + Esc ", "Esc ", "Ctrl + C "],
    rightAnswer: "Ctrl + C ",
  },
  {
    id: 4,
    questionText:
      "Jay is considering adding a repetition statement within his Java programming final project. Jay is unsure of the number of times each loop needs to execute.  Analyze the conditional statements below and select which statement best fits the need identified by Jay within his programming.",
    questionAnswers: ["While loop", "If-Else", "For loop", "Switch statement"],
    rightAnswer: "While loop",
  },
  {
    id: 5,
    questionText:
      "Score =Keyboard.readInt(); while (score !=  -1)         { System.out.println (“The score is” + score); score =Keyboard.readInt();         } USER INPUT = -1, predict what will happen after the user input is accepted into the java program.",
    questionAnswers: [
      "The while statement will continue to ask the user to enter a score and then print out the score that has been received.",
      "The while loop will execute an infinite number of times because the program statement can never be false",
      "The while statement will never print the statement “The score is” because the condition present within the while will be false on the first time through.",
      "The while statement will function until a value other than -1 is entered.",
    ],
    rightAnswer:
      "The while statement will never print the statement “The score is” because the condition present within the while will be false on the first time through.",
  },
];

// opens up the leaderboard
 const openLeaderboard = () => {
  // to stop the timer
  clearInterval(quizTimer);
  
  // Show / Hide Elements
  leaderboardArea.classList.toggle(`hidden`);
  document.body.classList.toggle(`quizActive`);
  let gameStats = getDom(`#gameStats`);
  if (!quizArea.classList.contains(`hidden`)) {
    quizArea.classList.add(`hidden`);
  };
  preStartArea.classList.toggle(`hidden`);
  let time = parseFloat(timeLeft.innerHTML);
  startbuttonContainer.classList.toggle(`hidden`);
  
  //Allow score form submit only if the user has played the game
  if (time < 100) {
    statsContainer.append(gameStats);
  
    scoreForm.addEventListener(`submit`, (formSubmitEvent) => {
      formSubmitEvent.preventDefault();
      let userNameField = scoreForm.querySelector(`input[name="userName"]`);
      // grabbing the game/score stats
      let userName = userNameField.value;
      let score = parseFloat(currentScore.innerHTML);
      let date = new Date();
      console.log(`scoreForm Submit`, {userName, score, time, date});
    })
  } else {
    scoreForm.classList.toggle("hidden");
  }
};

const updateAndRefreshQuestion = (questionToShow) => {
  if (currentQuestionIndex + 1 <= questionsArray.length) {
    // Lets empty out any existing questions
    questionContainer.innerHTML = ``;
    questionCount.innerHTML = questionsArray.length - currentQuestionIndex;

    // Create Question Element
    let newQuestionToShow = document.createElement(`div`);
    newQuestionToShow.classList.add(`questionToShow`);

    // Insert Question
    newQuestionToShow.innerHTML = `Question ${questionToShow.id}: ${questionToShow.questionText}`;

    // Insert Answers
    let answers = document.createElement(`div`);
    answers.classList.add(`answersContainer`);

    // For Each will loop over an array and run a function for each item.
    questionToShow.questionAnswers.forEach((ans, ansIndex) => {
      let ansID = ansIndex + 1;
      let ansElement = document.createElement(`div`);
      ansElement.classList.add(`ansElement`);

      let ansButton = document.createElement(`button`);
      ansButton.id = `answerButton-${ansID}`;
      ansButton.classList.add(`ansButton`);
      ansButton.innerHTML = ans;
      ansButton.addEventListener(`click`, (ansButtonClickEvent) => {
        runAnswerCheck(questionToShow, ansButtonClickEvent);
      });

      ansElement.append(ansButton);
      answers.append(ansElement);
    })

    // Add the answers to the question
    newQuestionToShow.append(answers);

    // Add the question to the screen
    questionContainer.append(newQuestionToShow);
    
    currentQuestionIndex = currentQuestionIndex + 1;
  } else {
    // This is what happens when we run out of questions (open Leaderboard)
    setTimeout(() => {
      openLeaderboard();
    }, gameOverDelay);
  }
}

// runs the code that checks the selected answer
// Move onto the next question if right
// Remove 10 seconds if wrong
// If final answer is correct, hide everything except for leaderboard
// unhide the leaderboard score input
const runAnswerCheck = (question, event) => {
  let buttonTheUserClicked = event.target;
  let buttonParent = buttonTheUserClicked.parentElement.parentElement;
  Array.from(buttonParent.children).forEach((button, buttonIndex) => {
    button.firstChild.disabled = true;
    button.firstChild.classList.toggle(`disabled`);
  })
  
  let answerTheUserClicked = buttonTheUserClicked.innerHTML;

  // I want some kind of animation to fire when they click
  // No matter if the user gets it wrong or right, the question should go to the next one
  if (answerTheUserClicked == question.rightAnswer) {
    buttonTheUserClicked.classList.add(`correct`);
    timeLeft.classList.toggle(`correct`);

    // Add Score for Right Answer
    currentScore.innerHTML = parseInt(currentScore.innerHTML) + 10;
  } else { // Wrong Answer
    buttonTheUserClicked.classList.add(`incorrect`);
    timeLeft.classList.toggle(`incorrect`);

    // Subtract Time for Wrong Answer
    timeLeft.innerHTML = timeLeft.innerHTML - 10;
  }

  setTimeout(() => {
    // All of this logic you put in here will run after the delay that you specify
    if (timeLeft.classList.contains(`incorrect`)) {
      timeLeft.classList.remove(`incorrect`);
    };
    if (timeLeft.classList.contains(`correct`)) {
      timeLeft.classList.remove(`correct`);
    };
    // Go to the next question
    updateAndRefreshQuestion(questionsArray[currentQuestionIndex]);
  }, 1000);
}

// Main function that starts the quiz
function startQuiz() {

  // Show / Hide Elements
  document.body.classList.toggle(`quizActive`);
  quizArea.classList.toggle(`hidden`);
  startbuttonContainer.classList.toggle(`hidden`);

  // Populate Variables into Screen
  currentScore.innerHTML = currentScorePoints;
  timeLeft.innerHTML = timeLeftSeconds;

  updateAndRefreshQuestion(questionsArray[currentQuestionIndex]);

  // Start the timer
  quizTimer = setInterval(() => {
    timeLeft.innerHTML = timeLeft.innerHTML - 1;

    // Game Over Screen
    if (timeLeft.innerHTML <= timeForGameOver) {
      openLeaderboard();
      return;
    }
  }, 999);
}

// Opens up the prestartarea with the rules and the start button
// hide the leaderboard display
// hide the back button
// hide the quiz area
// unhide the rules start button
function restart() {
  window.location.reload();
};

// WHEN I click the start button

// THEN a timer starts and I am presented with a question

// WHEN I answer a question

// THEN I am presented with another question

// WHEN I answer a question incorrectly

// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0

// THEN the game is over

// THEN I can save my initials and my score