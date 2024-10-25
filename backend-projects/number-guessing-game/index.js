const readline = require("node:readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let highScores = { Easy: Infinity, Medium: Infinity, Hard: Infinity };

function getDifficulty(choice) {
  return choice === "1" ? "Easy" : choice === "2" ? "Medium" : choice === "3" ? "Hard" : null;
}

function getChances(difficulty) {
  return difficulty === "Easy" ? 10 : difficulty === "Medium" ? 5 : difficulty === "Hard" ? 3 : null;
}

function playAgain() {
  readline.question("Do you want to play again? (yes/no): ", (response) => {
    if (response.toLowerCase() === "yes") {
      startGame();
    } else {
      console.log("\nThank you for playing the game!\n\n -- High Scores --");
      console.log(`Easy: ${highScores.Easy !== Infinity ? highScores.Easy : "No"} attempt${highScores.Easy > 1 ? "s" : ""}`);
      console.log(`Medium: ${highScores.Medium !== Infinity ? highScores.Medium : "No"} attempt${highScores.Medium > 1 ? "s" : ""}`);
      console.log(`Hard: ${highScores.Hard !== Infinity ? highScores.Hard : "No"} attempt${highScores.Hard > 1 ? "s" : ""}`);
      readline.close();
    }
  });
}

function playGame(numberToGuess, chances, difficulty) {
  let attempts = 0;
  const startTime = Date.now();

  const makeGuess = () => {
    readline.question("Enter your guess: ", (input) => {
      const guess = parseInt(input);
      attempts++;

      if (isNaN(guess) || guess < 1 || guess > 100) {
        console.log("Invalid guess! Please enter a number between 1 and 100.");
        attempts--;
        return makeGuess();
      }

      if (guess === numberToGuess) {
        const timeTaken = (Date.now() - startTime) / 1000;
        console.log(`Congratulations! You guessed the correct number in ${attempts} attempt${attempts > 1 ? "s" : ""}.`);
        console.log(`Time taken: ${timeTaken.toFixed(2)} seconds.`);

        if (attempts < highScores[difficulty]) {
          highScores[difficulty] = attempts;
          console.log(`New high score for ${difficulty} difficulty level: ${attempts} attempt${attempts > 1 ? "s" : ""}.`);
        }

        return playAgain();
      }

      if (attempts === chances) {
        console.log(`Sorry! You have used all your chances. The number was ${numberToGuess}.`);
        return playAgain();
      }

      console.log(`Incorrect! The number is ${guess > numberToGuess ? "less" : "greater"} than ${guess}.\n`);
      if (attempts >= chances - 2) {
        console.log(`Hint: The number is ${numberToGuess % 2 === 0 ? "even" : "odd"}.\n`);
      }
      makeGuess();
    });
  };

  makeGuess();
}

function startGame() {
  console.log("Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\n");
  console.log("Please select the difficulty level:\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n");

  readline.question("Enter your choice: ", (choice) => {
    const difficulty = getDifficulty(choice);
    if (!difficulty) {
      console.log("Invalid choice. Please select a valid difficulty level.");
      return startGame();
    }

    const chances = getChances(difficulty);
    const numberToGuess = Math.floor(Math.random() * 100) + 1;

    console.log(`\nGreat! You have selected the ${difficulty} difficulty level.`);
    console.log(`You have ${chances} chances to guess the correct number.\nLet's start the game!\n`);

    playGame(numberToGuess, chances, difficulty);
  });
}

startGame();
