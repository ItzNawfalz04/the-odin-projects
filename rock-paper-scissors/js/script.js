// State variables
let humanScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 5;

// Select DOM elements
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const resetBtn = document.querySelector("#reset-btn");

const humanScoreSpan = document.querySelector("#human-score");
const computerScoreSpan = document.querySelector("#computer-score");
const roundStatus = document.querySelector("#round-status");
const finalWinner = document.querySelector("#final-winner");
const resultsTableBody = document.querySelector("#results-table tbody");
const choiceButtons = document.querySelectorAll(".choice-btn");

// Helper: Computer Choice
function getComputerChoice() {
    const randomNum = Math.random();
    if (randomNum < 0.33) return "rock";
    else if (randomNum < 0.66) return "paper";
    else return "scissors";
}

// Main Game Logic
function playRound(humanChoice) {
    if (roundCount >= maxRounds) return; // Stop if game is over

    const computerChoice = getComputerChoice();
    roundCount++;

    let winner = ""; // "human", "computer", or "tie"

    // Determine Winner
    if (humanChoice === computerChoice) {
        winner = "tie";
        roundStatus.textContent = `Round ${roundCount}: It's a tie! Both chose ${humanChoice}`;
        roundStatus.style.color = "#f39c12"; // Orange for tie
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        winner = "human";
        humanScore++;
        roundStatus.textContent = `Round ${roundCount}: You win! ${humanChoice} beats ${computerChoice}`;
        roundStatus.style.color = "#27ae60"; // Green for win
    } else {
        winner = "computer";
        computerScore++;
        roundStatus.textContent = `Round ${roundCount}: You lose! ${computerChoice} beats ${humanChoice}`;
        roundStatus.style.color = "#c0392b"; // Red for loss
    }

    // Update Scores
    humanScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;

    // Update Table
    addResultRow(roundCount, humanChoice, computerChoice, winner);

    // Check Game Over
    if (roundCount === maxRounds) {
        endGame();
    }
}

// Function to add a row to the table
function addResultRow(round, human, computer, winner) {
    const row = document.createElement("tr");
    
    // Format winner text for the table
    let winnerText = winner === "tie" ? "Draw" : (winner === "human" ? "Human" : "Computer");

    row.innerHTML = `
        <td>${round}</td>
        <td>${capitalize(human)}</td>
        <td>${capitalize(computer)}</td>
        <td>${winnerText}</td>
    `;
    resultsTableBody.appendChild(row);
}

function endGame() {
    // Disable buttons
    choiceButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    });

    // Declare Final Winner
    if (humanScore > computerScore) {
        finalWinner.textContent = "Final Results: You Won the Game! 🎉";
        finalWinner.style.color = "#27ae60";
    } else if (humanScore < computerScore) {
        finalWinner.textContent = "Final Results: Computer Won! 🤖";
        finalWinner.style.color = "#c0392b";
    } else {
        finalWinner.textContent = "Final Results: It's a Draw! 🤝";
        finalWinner.style.color = "#f39c12";
    }

    // Show Reset Button
    resetBtn.classList.remove("hidden");
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    roundCount = 0;
    humanScoreSpan.textContent = "0";
    computerScoreSpan.textContent = "0";
    roundStatus.textContent = "Choose your weapon to start Round 1";
    roundStatus.style.color = "#666";
    finalWinner.textContent = "";
    resultsTableBody.innerHTML = ""; // Clear table
    
    // Enable buttons
    choiceButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });

    resetBtn.classList.add("hidden");
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event Listeners
rockBtn.addEventListener("click", () => playRound("rock"));
paperBtn.addEventListener("click", () => playRound("paper"));
scissorsBtn.addEventListener("click", () => playRound("scissors"));
resetBtn.addEventListener("click", resetGame);