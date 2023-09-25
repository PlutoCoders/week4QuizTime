// Setting up my variables for dry code

//Button Variables
var startButton = document.querySelector("StartButton");
var submitButton = document.querySelector("subButton");
var backButton = document.querySelector("BackButton");

//Section Variables
var preStartArea = document.querySelector("#preStartArea");
var quizArea = document.querySelector("#QuizArea");
var leaderboardArea = document.querySelector("#LeaderboardArea");

//opens up the leaderboard
//Hide the Quiz (if open)
//Hide the Rules/Start (if open)
//Make Leaderboard Display visible
//Make "Back" button visible
function openLeaderboard() {
    preStartArea.classList.add('hide')
    quizArea.classList.add('hide')
    leaderboardArea.classList.remove('hide');

}

//Opens up the prestartarea with the rules and the start button
//hide the leaderboard display
//hide the back button
//hide the quiz area
//unhide the rules start button
function openMain() {
    leaderboardArea.hidden = true;
    preStartArea.hidden = false;
  } 

//unhides the quiz display
//Hides the preStartArea (which includes the StartButton)
function openQuiz() {
    preStartArea.hidden = true;
    leaderboardArea.hidden = true;
    quizArea.hidden = false
}

    // The below part wasn't working well for me
//     var x = document.getElementById("QuizArea");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//     startButton.addEventListener("click", function () {
//         console.log("You have started a quiz!");
//         startQuiz();
//       });
//   } 

//Questions and Answers objects (copied and pasted)
var questionsArr = [
    {
      questionText:
        "_______ is the process of finding errors and fixing them within a program.",
      questionAnswers: ["Compiling ", "Debugging ", "Executing ", "Scanning"],
      rightAnswer: "Debugging ",
    },
    {
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
      questionText: "Which command will stop an infinite loop?",
      questionAnswers: ["Alt + C ", "Shift + Esc ", "Esc ", "Ctrl + C "],
      rightAnswer: "Ctrl + C ",
    },
    {
      questionText:
        "Jay is considering adding a repetition statement within his Java programming final project. Jay is unsure of the number of times each loop needs to execute.  Analyze the conditional statements below and select which statement best fits the need identified by Jay within his programming.",
      questionAnswers: ["While loop", "If-Else", "For loop", "Switch statement"],
      rightAnswer: "While loop",
    },
    {
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
  



//begins the quiz code
//starts the timer and adjusts the timer display
//displays question
//displays answer choices
//displays current answer
function startQuiz() {
    startButton.hidden = true;
    preStartArea.hidden = true;
}


//runs the code that checks the selected answer
//Move onto the next question if right
//Remove 10 seconds if wrong
// If final answer is correct, hide everything except for leaderboard
// unhide the leaderboard score input
function runAnswerCheck()



//WHEN I click the start button

//THEN a timer starts and I am presented with a question

// WHEN I answer a question

// THEN I am presented with another question

// WHEN I answer a question incorrectly

// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0

// THEN the game is over

// THEN I can save my initials and my score