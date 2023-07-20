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

  // Quiz data (Note: Adjust answer values to be zero-based, i.e., 0, 1, 2, ...)
  const quizData = [
      // Questions and their options
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

  // Add click event listeners to "Start Quiz," "Go Back," and "Submit" buttons
  startButton.addEventListener("click", startQuiz);
  goBackButton.addEventListener("click", goBack);
  submitButton.addEventListener("click", saveScore);
});
