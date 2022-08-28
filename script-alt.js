'use strict';

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


const questions = [
  ['Do I like Pokemon? (yes/no)', 'yes'],
  ['Do I have any pets? (yes/no)', 'yes'],
  ['Do I live on the East Coast? (yes/no)', 'no'],
  ['Do I play video games? (yes/no)', 'yes'],
  ['Have I gone skydiving (yes/no)', 'no'],
  ['Guess my favorite fruits', ['kiwi', 'pineapple', 'clementine', 'grapes', 'watermelon']]
];


let totalScore = 0;

main();

function getRandom(upper) {
  return Math.floor(Math.random() * upper + 1);
}

function guessRandom(upper) {
  let lives = 4;
  let correct = false;
  let ans = getRandom(upper);
  while(lives > 0) {
    let response = Number(prompt(`Guess a number between 1 and ${upper}. You have ${lives} guesses remaining.`));
    while(isNaN(response)) {
      alert('Only number inputs are valid');
      response = Number(prompt(`Guess a number between 1 and ${upper}. You have ${lives} guesses remaining.`));
    }
    if(response === ans) {
      alert(`You got it correct! It was ${response}`);
      totalScore++;
      return;
    } else if(response < 1 || response > upper) {
      alert(`Please guess between 1 and ${upper}. You wasted a guess.`);
    } else if(response > ans) {
      alert('Too high!');
    } else {
      alert('Too low!');
    }
    lives--;
  }
  if(correct === false) {
    alert(`Sorry, out of lives! The correct answer was ${ans}`);
  }
}

function askQuestions() {
  for (let question of questions.slice(0,5)) {
    let answer = prompt(question[0]);
    if (answer === question[1]) {
      alert('Correct');
      totalScore++;
    } else {
      alert('Wrong answer');
    }
  }
}

function askArrayQ() {
  let answers = questions[5][1];
  let lives = 6;
  while (lives > 0) {
    let response = prompt(`What is one of my favorite fruits? You have ${lives} guesses remaining.`).toLowerCase();
    for (let answer of answers) {
      console.log(answer);
      if(response === answer) {
        alert(`Correct The correct answers were ${answers}`);
        totalScore++;
        return;
      }
    }
    lives--;
    alert('Incorrect. Please try again.');

  }
  alert(`You got it wrong and have no more attempts. The correct answers were ${answers}`);
}

function main() {
  const upper = 25;
  askQuestions();
  guessRandom(upper);
  askArrayQ();
  alert(`Your total score is ${totalScore}/7!`);
}
