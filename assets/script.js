// Variable for Questions
var questions = [
    {
        title: "Inside which HTML element do you insert JavaScript",
        choices: ["<javascript>","<script>","<link>","<a>"],
        answer: "<script>"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["alert('Hello World')","prompt('Hello World')","alertBox('Hello World')","prompt('Hello World')"],
        answer: "alert('Hello World')"
    },
    {
        title: "How do you add a comment in JavaScript?",
        choices: ["//This is a comment","'This is a comment","<!--This is a comment-->","#This is a comment"],
        answer: "//This is a comment"
    },
    {
        title: "Where is the main content found in a Web Document?",
        choices: ["<head>","<body>","<section>","<title>"],
        answer: "<body>"
    },
    {
        title: "An external JavaScript must be contained in a <script> tag",
        choices: ["True","False"],
        answer: "False"
    }
];

// Timer Variables
var startTime = document.querySelector("#start");
var countdownTimer = document.querySelector("#countdownTimer");
var secondsLeft = 60;
var timeInterval = 0;
var timePenalty = 10;

// Variables for questions, question display, and score
var questionArray = 0;
var score = 0;
var newUl = document.createElement("ul");
var quiz = document.querySelector("#quiz");

// Event listener for timer on "click"
startTime.addEventListener("click", function() {
    if (timeInterval === 0) {
        timeInterval = setInterval(function() {
            secondsLeft--;
            countdownTimer.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(timeInterval);
                allDone();
                countdownTimer.textContent = "You ran out of time!";
            }
        }, 1000);
    }
    render(questionArray);
});

// Function to display quiz
function render(questionArray) {
    quiz.innerHTML = "";
    newUl.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionArray].title;
        var userChoice = questions[questionArray].choices;
        quiz.textContent = userQuestion;
    }
    userChoice.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quiz.appendChild(newUl);
        newUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Checks user's answers and completion.
function compare(e) {
    var element = e.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id","createDiv");
        if (element.textContent == questions[questionArray].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - timePenalty;
            createDiv.textContent = "Incorrect! 10 Seconds have been subtracted off your time";
        }
    }
    questionArray++;
    if (questionArray >= questions.length) {
        allDone();
        createDiv.textContent = "You finished the Quiz!" + "Score: " + score + "/" + questions.length + "Correct!";
    } else {
        render(questionArray);
    }
    quiz.appendChild(createDiv);
}

// Creates and displays the Score Page and allows user to input highscore into local storage
function allDone() {
    quiz.innerHTML = "";
    countdownTimer.innerHTML = "";
    
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1")
    newH1.textcontent = "Quiz Finished!"
    quiz.appendChild(newH1);

    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");
    quiz.appendChild(newP);

    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var newP2 = document.createElement("p");
        clearInterval(timeInterval);
        newP.textcontent = "Your final score is: " + timeLeft;
        quiz.appendChild(newP2);
    }

    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials: ";
    quiz.appendChild(newLabel);

    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.textContent = "";
    quiz.appendChild(newInput);

    var newSubmit = document.createElement("submit");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "Submit");
    newSubmit.textContent = "Submit";
    quiz.appendChild(newSubmit);

    // Event listener to read and store user initials and score into local storage
    newSubmit.addEventListener("click", function () {
        var initials = newInput.value;
        if (initials === null) {
            console.log("Enter initials")
        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./highscorepage.html");
        }
    });
}