// Mobile menu kholna aur band karna
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", menuIsOpen);
  });
}

// Form submit hone par confirmation dikhana
const forms = document.querySelectorAll("[data-message]");

forms.forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const messageBox = form.querySelector(".form-message");

    if (messageBox) {
      messageBox.textContent = form.dataset.message;
    }

    form.reset();
  });
});
// Ten Tabla quiz questions
const quizQuestions = [
  {
    question: "How many drums are usually played in Tabla?",
    options: ["One", "Two", "Four"],
    answer: 1
  },
  {
    question: "What is the name of the smaller drum?",
    options: ["Bayan", "Dayan", "Taal"],
    answer: 1
  },
  {
    question: "What is the name of the larger drum?",
    options: ["Bayan", "Dayan", "Bol"],
    answer: 0
  },
  {
    question: "What is a Tabla bol?",
    options: ["A spoken rhythm syllable", "A type of string", "A dance step"],
    answer: 0
  },
  {
    question: "What does taal help organize?",
    options: ["Rhythm and beats", "The drum color", "The classroom"],
    answer: 0
  },
  {
    question: "Which of these is a Tabla bol?",
    options: ["Dha", "Sa", "Re"],
    answer: 0
  },
  {
    question: "What helps a learner improve at Tabla?",
    options: ["Regular practice", "Never repeating lessons", "Playing without listening"],
    answer: 0
  },
  {
    question: "What should you do to keep a steady rhythm?",
    options: ["Listen and count the beats", "Change speed randomly", "Ignore the taal"],
    answer: 0
  },
  {
    question: "Which hand usually plays the Dayan?",
    options: ["The right hand", "Both feet", "Neither hand"],
    answer: 0
  },
  {
    question: "What is a good way to begin learning Tabla?",
    options: ["Learn basic hand position and bols", "Start with the fastest compositions", "Skip the basics"],
    answer: 0
  }
];

const quizContainer = document.querySelector("#quiz-container");

if (quizContainer) {
  const quizContent = document.querySelector("#quiz-content");
  const progressBar = document.querySelector("#quiz-progress-bar");
  const progressText = document.querySelector("#quiz-progress-text");
  const progressTrack = document.querySelector(".quiz-progress");

  let questionNumber = 0;
  let score = 0;

  function showQuestion() {
    const currentQuestion = quizQuestions[questionNumber];

    progressText.textContent =
      "Question " + (questionNumber + 1) + " of " + quizQuestions.length;

    progressBar.style.width =
      ((questionNumber + 1) / quizQuestions.length) * 100 + "%";

    progressTrack.setAttribute("aria-valuenow", questionNumber + 1);

    let optionsHTML = "";

    currentQuestion.options.forEach(function (option, index) {
      optionsHTML += `
        <label class="quiz-option">
          <input type="radio" name="quiz-answer" value="${index}">
          <span>${option}</span>
        </label>
      `;
    });

    quizContent.innerHTML = `
      <h2>${currentQuestion.question}</h2>
      <div class="quiz-options">${optionsHTML}</div>
      <button class="button" id="next-question" type="button">
        ${questionNumber === quizQuestions.length - 1 ? "Finish Quiz" : "Next"}
      </button>
    `;

    document
      .querySelector("#next-question")
      .addEventListener("click", checkAnswer);
  }

  function checkAnswer() {
    const selectedOption = document.querySelector(
      'input[name="quiz-answer"]:checked'
    );

    if (!selectedOption) {
      alert("Please choose an answer first.");
      return;
    }

    if (Number(selectedOption.value) === quizQuestions[questionNumber].answer) {
      score = score + 1;
    }

    questionNumber = questionNumber + 1;

    if (questionNumber < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    progressText.textContent = "Quiz complete!";
    progressBar.style.width = "100%";
    progressTrack.setAttribute("aria-valuenow", quizQuestions.length);

    quizContent.innerHTML = `
      <h2>Your Score: ${score} / ${quizQuestions.length}</h2>
      <button class="button" id="try-again" type="button">Try Again</button>
    `;

    document.querySelector("#try-again").addEventListener("click", function () {
      questionNumber = 0;
      score = 0;
      showQuestion();
    });
  }

  showQuestion();
}