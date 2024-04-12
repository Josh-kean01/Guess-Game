let secretNumber;
let maxNumber = 20;
let maxAttempts = 5;
let currentAttempts;
let currentScore;
let highestScore = 0;

function startGame() {
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    currentAttempts = 0;
    currentScore = 25;
    updateInstruction(`I'm thinking of a number between 1 and ${maxNumber}.`)
    updateResult("");
    updateScore("");
    updateHighestScore("");
    enableSubmitButton();
}

function checkGuess() {
    const userGuess = parseInt(document.getElementById("userGuess").value);

    if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= maxNumber) {
        currentAttempts++;

        if (userGuess === secretNumber) {
            updateResult(`Congratulations! You guessed the number in ${currentAttempts} attempts.`);
            updateScore(`Your score for this round: ${currentScore}`);
            updateHighestScore(`Highest Score: ${highestScore}`);
            document.getElementById("result").className = document.getElementById("result").className.replace("text-danger", "text-success");
            disableSubmitButton();
        }
        else {
            updateResult(userGuess < secretNumber ? "Too low! Try Again." : "Too High! Try Again.");
            document.getElementById("result").className = document.getElementById("result").className.replace("text-success", "text-danger");
            currentScore -= 5;

            // I'm using the update score tag to show the number of attempts
            updateScore(`You've used ${currentAttempts} out of ${maxAttempts} Attempts`)
        }

        if (currentAttempts === maxAttempts && userGuess !== secretNumber) {
            updateResult(`Sorry, you've reached the maximum number of attempts. The correct  number was ${secretNumber}.`)
        }
    }
    else {
        updateResult(`Please enter a number between 1 and ${maxNumber}.`);
    }

    if (currentScore > highestScore) {
        highestScore = currentScore
    }
}

function playAgain() {
    if (currentScore > highestScore) {
        highestScore = currentScore
    }

    startGame()
}

function increaseLevel() {
    maxNumber += 10
    playAgain()
}

function exitGame() {
    alert(`Thanks for playing! Your Highest Score is ${highestScore}. Goodbye.`);
}

function updateInstruction(message) {
    document.getElementById("instruction").textContent = message
}

function updateResult(message) {
    document.getElementById("result").textContent = message
}

function updateScore(message) {
    document.getElementById("score").textContent = message
}

function updateHighestScore(message) {
    document.getElementById("highestScore").textContent = message
}

function enableSubmitButton() {
    document.getElementById('submitGuess').removeAttribute("disabled")
}

function disableSubmitButton() {
    document.getElementById("submitGuess").setAttribute("disabled", "true")
}

startGame()