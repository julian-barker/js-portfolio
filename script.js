'use strict';

// declare shortcut function
function $(selector) { return document.querySelector(selector) }

function byId(id) { return document.getElementById(id) }

function _(tag) { return document.createElement(tag) }


byId('ld-switch').addEventListener('click', lightDark);

// scroll to top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let user;
// ensure content exists to insert into
window.onload = function() {
  // greet();
  drawClock();
  drawBounce();
  //drawTest();
  // playGameFull();
};




function lightDark() {
  const page = $('html');
  page.classList.toggle('dark');

  const backdrop = $('.bg-filter');
  backdrop.classList.toggle('dark');
}



// greet user upon visiting the site
function greet() {
  user = prompt('Please tell me your name.');
  while(!user) {
    user = prompt('C\'mon, just tell me.');
  }
  console.log('Name: ' + user);
  const block = byId('user');
  block.innerHTML += `<b>${user}</b>`;
  alert(`Welcome, ${user}!`);
}





// Multiple choice quiz taking advantage of DOM manipulation
const mcg = {
  space: 'quiz1',
  state: '',
  firstTry: true
};


function switchGameState() {
  switch(mcg.state) {
    case 'mcg-loaded':
      showAnswers();
      break;
    case 'mcg-answers':
      resetGame();
      break;
    default:
      loadGame();
  }
}

function loadGame() {
  const space = byId(mcg.space);
  console.log(space);
  mcg.state = 'mcg-loaded';
  let hiddenOption = '<option value="coding">Coding!</option>';
  let newContent =
  `<div id="${mcg.state}">
      <ul>
          <li>
              <label for="q1">What is my favorite Pokemon?</label>
              <select name="pokemon" id="q1">
                  <option value="">-- Please select an option --</option>
                  <option value="squirtle">Squirtle</option>
                  <option value="charmander">Charmander</option>
                  <option value="bulbasaur">Bulbasaur</option>
                  <option value="pikachu">Pikachu</option>
              </select>
          </li>
          <li>
              <label for="q2">What kind of pet do I have?</label>
              <select name="pet" id="q2">
                  <option value="">-- Please select an option --</option>
                  <option value="bird">Bird</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="lizard">Lizard</option>
              </select>
          </li>
          <li>
              <label for="q3">What is my lucky number?</label>
              <select name="lucky-number" id="q3">
                  <option value="">-- Please select an option --</option>
                  <option value="13">13</option>
                  <option value="3">3</option>
                  <option value="5">5</option>
                  <option value="28">28</option>
              </select>
          </li>
          <li>
              <label for="q4">What is my favorite food?</label>
              <select name="food" id="q4">
                  <option value="">-- Please select an option --</option>
                  <option value="tacos">Tacos</option>
                  <option value="sushi">Sushi</option>
                  <option value="pizza">Pizza</option>
                  <option value="salad">Salad</option>
              </select>
          </li>
          <li>
              <label for="q5">What is my favorite hobby?</label>
              <select name="hobby" id="q5">
                  <option value="">-- Please select an option --</option>
                  <option value="eating">Eating</option>
                  <option value="sleeping">Sleeping</option>
                  <option value="climbing">Rock Climbing</option>
                  <option value="diving">Diving</option>
                  ${mcg.firstTry ? '' : hiddenOption}
              </select>
          </li>
      </ul>
      <button id="submit-game" onclick="switchGameState()">Let's see how well you did...</button>
  </div>`;
  if(byId('game')) {
    byId('game').remove();
  }
  space.innerHTML += newContent;
}



function resetGame() {
  byId(mcg.state).remove();
  loadGame();
}



function showAnswers() {
  const space = byId(mcg.space);
  const currState = mcg.state;
  const answers = ['squirtle', 'dog', '13', 'sushi', 'coding'];

  let sum = 0;
  let responses = [];
  let a1 = byId('q1').value;
  let a2 = byId('q2').value;
  let a3 = byId('q3').value;
  let a4 = byId('q4').value;
  let a5 = byId('q5').value;
  let b = '';
  let newContent =
  `<div id="${mcg.state}">
      <h4>Answer Time...</h4>
      <dl>
          <dt><bold>Favorite Pokemon -</bold></dt>
          <dd>Your Answer: ${a1}</dd>
          <dd>Correct Answer: ${answers[0]}</dd>
          <dt><bold>Pet -</bold></dt>
          <dd>Your Answer: ${a2}</dd>
          <dd>Correct Answer: ${answers[1]}</dd>
          <dt><bold>Lucky Number -</bold></dt>
          <dd>Your Answer: ${a3}</dd>
          <dd>Correct Answer: ${answers[2]}</dd>
          <dt><bold>Favorite Food -</bold></dt>
          <dd>Your Answer: ${a4}</dd>
          <dd>Correct Answer: ${answers[3]}</dd>
          <dt><bold>Favorite Hobby -</bold></dt>
          <dd>Your Answer: ${a5}</dd>
          <dd>Correct Answer: ${b}${answers[4]}!!!</dd>
      </dl>
      <p>You got ${sum} out of 5 questions right!</p>
      <button id="retake" onclick="switchGameState()">Try again?</button>
  </div>`;

  mcg.state = 'mcg-answers';

  for (let i = 0; i < 5; i++) {
    responses[i] = byId(`q${i+1}`).value;
    if (responses[i] === answers[i]) {
      sum++;
    }
  }

  if (mcg.firstTry) {
    b = 'Trick question - it\'s ';
  } else {
    b = '';
  }

  byId(currState).remove();
  space.innerHTML += newContent;
  mcg.firstTry = false;
}





// second implementation of 7-question quiz using functions and starting on button press
function playGameFull() {
  let score1 = playGame2();
  let score2 = playGame3();
  let score3 = playGame4();
  let score = score1 + score2 + score3;

  alert(`${user}, your total score is: ${score}/7.`);
}



function playGame2() {
  let questions = [['Do I like Pokemon? (yes/no)', 'yes'], ['Do I have any pets? (yes/no)', 'yes'],
    ['Do I live on the East Coast? (yes/no)', 'no'], ['Do I play video games? (yes/no)', 'yes'],
    ['Have I gone skydiving (yes/no)', 'no']];
  let score = 0;
  for(let i = 0; i < 5; i++) {
    let q = '';
    while (!(q === 'yes' || q === 'no')) {
      q = prompt(`${questions[i][0]}`);
      if(typeof q === 'string') {
        q = q.toLowerCase();
      }
    }
    let correct = (q === questions[i][1]);
    switch(correct) {
      case true:
        console.log(`Question ${i+1}:
        Your response (${q}) is correct!`);
        alert('correct!');
        score++;
        break;
      default:
        console.log(`Question ${i+1}:
        Your response (${q}) is incorrect...`);
        alert('Sorry, incorrect');
    }
  }
  let msg = `${user}, you got ${score}/5 correct.`;
  console.log(msg);
  alert(msg);
  return score;
}



function playGame3() {
  let diff = prompt('Input 1, 2, or 3 to play on Easy (1), Medium (2), or Hard (3). Invalid responses will default to Easy.');
  console.log(diff);
  let upper = 25;
  switch(diff) {
    case '2':
      upper = 50;
      break;
    case '3':
      upper = 100;
      break;
  }
  let ans = Math.floor(Math.random() * upper + 1);
  console.log(upper);
  console.log('diff = ' + diff);
  for(let i = 0; i < 4; i++) {
    let guess = parseInt(prompt(`Guess a number between 1 and ${upper}. You have ${4 - i} guesses remaining.`));
    while(isNaN(guess)) {
      alert('Only number inputs are valid');
      guess = parseInt(prompt(`Guess a number between 1 and ${upper}. You have ${4 - i} guesses remaining.`));
    }
    if(guess === ans) {
      alert(`You got it correct! It was ${ans}`);
      return 1;
    } else if(guess < 1 || guess > upper) {
      alert(`Please guess between 1 and ${upper}. You wasted a guess.`);
    } else if(guess > ans) {
      alert('Too high!');
    } else {
      alert('Too low!');
    }
  }
  alert(`You are out of guesses. The answer was ${ans}. Sorry, better luck next time!`);
  return 0;
}



function playGame4() {
  let diff = prompt('Input 1, 2, or 3 to play on Easy (1), Medium (2), or Hard (3). Invalid responses will default to Easy.');
  console.log(diff);
  let upper = 25;
  switch(diff) {
    case '2':
      upper = 50;
      break;
    case '3':
      upper = 100;
      break;
  }
  let numAnswers = 5;
  let answers = Array(numAnswers);
  for (let i = 0; i < numAnswers; i++) {
    let a;
    let check = true;
    do {
      let exists = false;
      a = Math.floor(Math.random() * upper + 1);
      // console.log(a);
      for (let j = 0; j < numAnswers; j++) {
        if (a === answers[j]) {
          exists = true;
          break;
        }
      }
      check = exists;
    } while(check);
    answers[i] = a;
  }
  console.log('Upper: ' + upper);
  // console.log('diff = ' + diff);
  let maxGuesses = 6;
  let myGuesses = [];
  for(let i = 0; i < maxGuesses; i++) {
    let guess = parseInt(prompt(`Guess a number between 1 and ${upper}. You have ${maxGuesses - i} guesses remaining.`));
    while(isNaN(guess)) {
      alert('Only number inputs are valid');
      guess = parseInt(prompt(`Guess a number between 1 and ${upper}. You have ${maxGuesses - i} guesses remaining.`));
    }
    myGuesses.push(guess);
    if(guess < 1 || guess > upper) {
      alert(`Please guess between 1 and ${upper}. You wasted a guess.`);
    } else if(answers.includes(guess)) {
      alert(`You got it correct! Possible answers were ${answers}
      You got it in ${i + 1} guesses.`);
      return 1;
    } else {
      alert('Sorry! Not quite');
    }
  }
  alert(`You are out of guesses.Sorry, better luck next time!
  Your guesses were ${myGuesses}.
  Possible answers were ${answers}.`);
  return 0;
}





// draw an analog clock
function drawClock() {
  const can = byId('clock-face');
  const canHands = byId('clock-hands');
  const ctx = can.getContext('2d');
  const ctxHands = canHands.getContext('2d');

  const rad = can.width / 2 * .8;
  const width = can.width;
  const height = can.height;
  const grad = ctx.createLinearGradient(0, 0, width, height);

  ctx.fillStyle = grad;
  grad.addColorStop(0, 'magenta');
  grad.addColorStop(.5, 'yellow');
  grad.addColorStop(1, 'cyan');
  ctx.fillRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctxHands.translate(canHands.width / 2, canHands.height / 2);

  drawClockFace(ctx, rad);
  drawClockNums(ctx, rad);
  setInterval(drawTime, 1000, ctxHands, rad);
}


function drawClockFace(ctx, rad) {
  const pi = Math.PI;
  const grad = ctx.createRadialGradient(0, 0, rad * .95, 0, 0, rad * 1.05);

  grad.addColorStop(0, '#222');
  grad.addColorStop(.5, '#BBB');
  grad.addColorStop(1, '#222');

  ctx.fillStyle = '#DDD';
  ctx.ellipse(0, 0, rad, rad, 0, 0, 2 * pi);
  ctx.fill();
  ctx.beginPath();
  ctx.strokeStyle = grad;
  ctx.lineWidth = rad * .1;
  ctx.arc(0, 0, rad, 0, 2 * pi);
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = '#222';
  ctx.ellipse(0, 0, rad * .05, rad * .05, 0, 0, 2 * pi);
  ctx.fill();
}


function drawClockNums(ctx, rad) {
  const dist = rad * .85;

  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 1; i < 13; i++) {
    const a = Math.PI / 6 * i;
    //ctx.beginPath();
    ctx.rotate(a);
    ctx.translate(0, -dist);
    ctx.rotate(-a);
    ctx.fillText(i, 0, 1);
    ctx.rotate(a);
    ctx.translate(0, dist);
    ctx.rotate(-a);
  }
}


function drawTime(ctx, rad) {
  const pi = Math.PI;
  const now = new Date();
  const hrs = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  const hrHand = ((hrs % 12) * pi / 6) + (min * pi / 6 / 60) + (sec * pi / 6 / 60 / 60);
  const minHand = (min * pi / 30) + (sec * pi / 30 / 60);
  const secHand = (sec * pi / 30);
  const ht =  rad * 2.2;

  ctx.clearRect(-ht / 2, - ht / 2, ht, ht);
  drawClockHand(ctx, hrHand, rad, 'hours');
  drawClockHand(ctx, minHand, rad, 'minutes');
  drawClockHand(ctx, secHand, rad, 'seconds');
}


function drawClockHand(ctx, ang, rad, hand) {
  //console.log(ang, len, wid);
  let len = 0;
  let wid = 0;

  ctx.beginPath();
  switch(hand) {
    case 'hours':
      len = rad * .5;
      wid = rad * .07;
      ctx.strokeStyle = '#222';
      break;
    case 'minutes':
      len = rad * .7;
      wid = rad * .05;
      ctx.strokeStyle = '#222';
      break;
    default:
      len = rad * .8;
      wid = rad * .02;
      ctx.strokeStyle = '#C00';
  }

  //console.log(hand, Math.floor(ang * 180 / Math.PI), len, wid);

  ctx.lineWidth = wid;
  ctx.lineCap = 'round';
  ctx.moveTo(0,0);
  ctx.rotate(ang);
  ctx.lineTo(0, -len);
  ctx.stroke();
  ctx.rotate(-ang);
}




// make a bouncing ball
function drawBounce() {
  const bgCan = byId('bounce-bg');
  const bgCtx = bgCan.getContext('2d');
  const ballCan = byId('bounce-ball');
  const ballCtx = ballCan.getContext('2d');
  const rad = 15;
  const groundLevel = 60;

  drawBounceBG(bgCan, bgCtx, groundLevel);
  setInterval(drawBounceBall, 20, ballCan, ballCtx, groundLevel, rad);
}

function drawBounceBG(can, ctx, ground) {
  const wid = can.width;
  const ht = can.height;
  const grad = ctx.createLinearGradient(0, 0, 0, ht);

  grad.addColorStop(0, 'cyan');
  grad.addColorStop(.5, 'pink');
  grad.addColorStop(1, 'orange');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, wid, ht);
  ctx.fillStyle = 'saddlebrown';
  ctx.fillRect(0, ht - ground, wid, ground);
  ctx.fillStyle = 'green';
  ctx.fillRect(0, ht - ground, wid, 15);
  ctx.strokeRect(0, ht - ground, wid, 15);
  ctx.strokeRect(0, ht - ground, wid, ground);
}

function drawBounceBall(can, ctx, ground, rad) {
  const now = new Date();
  const s = now.getSeconds();
  const ms = now.getMilliseconds() / 1000;
  const t = s%6 + ms;
  // console.log(t);
  const x = can.width / 6 * t;
  const y = can.height - (Math.abs(Math.sin(t*Math.PI - Math.PI/4*3)) * can.height * .6) - ground - rad + 5;
  //console.log(y);

  ctx.clearRect(0, 0, can.width, can.height);
  ctx.beginPath();
  ctx.fillStyle = '#444';
  ctx.ellipse(x, y, rad, rad, 0, 0, 2 * Math.PI);
  ctx.fill();
  return can, ctx;
}





// make a very basic pong game
function pongGame() {
  const bgCanvas = byId('pong-bg');
  const objCanvas = byId('pong-obj');
  const bgCtx = bgCanvas.getContext('2d');
  const objCtx = objCanvas.getContext('2d');
  const score = {
    player: 0,
    robot: 0
  }


  bgCtx.fillStyle = 'black';
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

  while (score.player < 10 && score.robot < 10) {
    updatePong(objCanvas, objCtx, score);
  }
  if (score.player === 10) {

    return;
  }
}


function updatePong(can, ctx, score) {



  updateScore(can, ctx);
}


function updateScore(can, ctx, score) {



  return can, ctx;
}





// draw some random stuff
function drawTest() {
  let can = byId('canvas-2');
  let ctx = can.getContext('2d');
  let gradient = ctx.createLinearGradient(0, 0, 800, 300);

  gradient.addColorStop(0, 'green');
  gradient.addColorStop(0.5, 'yellow');
  gradient.addColorStop(1, 'red');

  ctx.fillStyle = gradient;
  ctx.textAlign = 'center';

  // ctx.fillRect(200, 200, 400, 50);
  // ctx.strokeRect(200, 200, 400, 50);
  ctx.font = ('108px Comic Sans MS');
  ctx.fillText('OooWeee!!!', can.width/2, can.height/2);
  ctx.strokeText('OooWeee!!!', can.width/2, can.height/2);

  ctx.beginPath();
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 20;
  ctx.lineCap = 'round';
  ctx.moveTo(150, 230);
  for (let i = 0; i < 200; i++) {
    ctx.lineTo(150 + 2.5*i, Math.sin(i/50*Math.PI)*30 + 230);
  }
  ctx.stroke();
}
