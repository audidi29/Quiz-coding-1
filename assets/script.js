document.addEventListener("DOMContentLoaded", function() {
  // Get elements from the HTML
  const startButton = document.getElementById("start_button");
  const quizContainer = document.getElementById("quiz_container");
  const questionsDiv = document.getElementById("questions-div");
  const titleElement = document.getElementById("title");
  const optionsElement = document.getElementById("options");
  const endScreen = document.getElementById("end-screen");
  const finalScoreElement = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const timerElement = document.getElementById("timer");
  const goBackButton = document.getElementById("go_back");


//   // Quiz data (Note: Adjust answer values to be zero-based, i.e., 0, 1, 2, ...)
  const quizData = [
    {
        question: "Question 1 : HTML stands for",
        options: ["1) Hyper Text Markup Language" , "2) Hyperlinks and Text Markup Language", "3) High Tech Markup Language", "4) Home Tool Markup Language"],
        answer: 0,
    },
    {
        question: "Question 2 : Which CSS property is used to change the text color of an element?",
        options: ["1) font-family", "2) background-color", "3) color", "4) text-align"],
        answer: 2,
    },
    {
        question: "Question 3 : Which of the following is NOT a valid way to declare a variable in JavaScript?",
        options: ["1) var myVar = 10", "2) let myVar = 10;", "3) const myVar = 10;", "4) variable myVar = 10;"],
        answer: 3,
    },
    {
        question: "Question 4: What is the purpose of the flexbox layout in CSS?",
        options: ["1) To create responsive grid layouts", "2) To style HTML forms", "3) To add animation effects", "4) To manage the positioning and alignment of elements in a flexible way"],
        answer: 3,
    },
];

  // Variables to track quiz state
  let currentQuestionIndex = 0;
  let score = 0;
  let timeRemaining = 30; // 30 seconds for the quiz
  let quizInterval; // Used to store the interval for the quiz timer

  // Function to start the quiz and activate the timer
  function startQuiz() {
    // Hide the start button and show the quiz elements
    startButton.style.display = "none";
    quizContainer.classList.remove("hide");
    questionsDiv.classList.remove("hide");
    timerElement.classList.remove("hide");
    showQuestion();
    startTimer();
    goBackButton.style.display = "none";
  }

  // Function to start the timer
  function startTimer() {
      // Set an interval to decrease timeRemaining every second
      quizInterval = setInterval(function() {
          timeRemaining--;
          timerElement.textContent = "Time: " + timeRemaining;

          // If time runs out, end the quiz
          if (timeRemaining <= 0) {
              clearInterval(quizInterval);
              endQuiz();
          }
      }, 1000);
  }

  // Function to show a question
  function showQuestion() {
      const currentQuestion = quizData[currentQuestionIndex];
      titleElement.textContent = currentQuestion.question;

      // Create buttons for each option and attach click event listener
      optionsElement.innerHTML = "";
      currentQuestion.options.forEach((option, index) => {
          const optionElement = document.createElement("button");
          optionElement.textContent = option;
          optionElement.classList.add("option");
          optionElement.addEventListener("click", selectAnswer);
          optionsElement.appendChild(optionElement);
      });
  }

  // Function to handle option selection
  function selectAnswer(event) {
      const selectedOption = event.target;
      const selectedAnswer = selectedOption.textContent;
      const currentQuestion = quizData[currentQuestionIndex];

      // Check if the selected option is correct or wrong
      if (selectedAnswer === currentQuestion.options[currentQuestion.answer]) {
          score++;
          showMessage("Correct!");
      } else {
          timeRemaining -= 5; // Subtract 5 seconds for incorrect answer
          if (timeRemaining < 0) timeRemaining = 0;
          showMessage("Wrong!");
      }

      // Move to the next question or end the quiz
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
          showQuestion();
      } else {
          endQuiz();
      }
  }

  // Function to show a message (Correct or Wrong) for a brief period
  function showMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      messageElement.classList.add("message");
      questionsDiv.appendChild(messageElement);
      setTimeout(function() {
          messageElement.remove();
      }, 1000);
  }

  // Function to end the quiz and show the end screen
  function endQuiz() {
      clearInterval(quizInterval);
      questionsDiv.classList.add("hide");
      endScreen.classList.remove("hide");
      finalScoreElement.textContent = score;
      timerElement.classList.add("hide");
      goBackButton.classList.remove("hide");
  }

  // Function to handle "Go Back" button click and restart the quiz
  function goBack() {
    // Reset quiz state and start the quiz again
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 30;
    showQuestion();
    startTimer();

    // Hide the Go Back button again
    goBackButton.classList.add("hide");
  }


  // Function to save the initials and score in local storage
  function saveScore() {
    const initials = initialsInput.value.trim(); // Get the initials input value and remove leading/trailing spaces

    if (initials !== "") {
      // Check if initials are not empty
      const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get existing high scores from local storage or initialize an empty array
      highScores.push({ initials: initials, score: score }); // Add the current initials and score to the high scores array
      highScores.sort((a, b) => b.score - a.score); // Sort the high scores in descending order based on score

      // Limit the high scores array to store only the top 5 scores
      const topHighScores = highScores.slice(0, 5);

      localStorage.setItem("highScores", JSON.stringify(topHighScores)); // Store the updated high scores in local storage

      // Show the high scores screen (you can redirect to a separate high scores page or display them on the same page)
      // For example, you can redirect to a high scores page using window.location.href:
      window.location.href = "high_scores.html";
    }
  }


  // Add click event listeners to "Start Quiz," "Go Back," and "Submit" buttons
  startButton.addEventListener("click", startQuiz);
  goBackButton.addEventListener("click", goBack);
  submitButton.addEventListener("click", saveScore);
});
