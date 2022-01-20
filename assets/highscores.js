var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var previous = document.querySelector("#previousPage");

// Event listener to clear highscore table
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Event listener to redirect back to home page
previous.addEventListener("click", function () {
    window.location.replace("./index.html");
});

// Retrieves local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(newLi);
    }
}