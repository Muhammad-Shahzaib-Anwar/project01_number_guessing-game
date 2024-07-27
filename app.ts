import inquirer from 'inquirer';

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to prompt the user for a guess
async function promptForGuess(): Promise<string> {
  const questions = [
    {
      type: 'input',
      name: 'guess',
      message: 'Guess a number between 1 and 10, or type "exit" to quit:',
      validate: (input: string) => {
        if (input.toLowerCase() === 'exit') {
          return true;
        }
        const guess = parseInt(input, 10);
        if (isNaN(guess) || guess < 1 || guess > 10) {
          return 'Please enter a valid number between 1 and 10 or type "exit" to quit.';
        }
        return true;
      },
    },
  ];

  const answer = await inquirer.prompt(questions);
  return answer.guess;
}

// Main function to run the game
async function runGame() {
  const targetNumber = getRandomNumber(1, 10);
  let guessedCorrectly = false;
  let attempts = 0;

  console.log('Welcome to the Number Guessing Game!');

  while (!guessedCorrectly) {
    const guess = await promptForGuess();

    if (guess.toLowerCase() === 'exit') {
      console.log('You have exited the game. Thanks for playing!');
      return;
    }

    const guessNumber = parseInt(guess, 10);
    attempts++;

    if (guessNumber < targetNumber) {
      console.log('Your Guess is lower than the actual number! Try again.');
    } else if (guessNumber > targetNumber) {
      console.log('Your Guess is higher than the actual number! Try again.');
    } else {
      guessedCorrectly = true;
      console.log(`Congratulations! You guessed the number in ${attempts} attempts.`);
    }
  }
}

runGame().catch((error) => {
  console.error('An error occurred:', error);
});
