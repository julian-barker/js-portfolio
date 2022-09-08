'use strict';

// declare shortcut function
function $(selector) { return document.querySelector(selector); }

function byId(id) { return document.getElementById(id); }

function _(tag) { return document.createElement(tag); }


byId('ld-switch').addEventListener('click', lightDark);

// scroll to top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ensure content exists to insert into
window.onload = function() {
  drawClock();
  drawBounce();
};



function lightDark() {
  const page = $('html');
  page.classList.toggle('dark');
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

  mcg.state = 'mcg-answers';

  for (let i = 0; i < 5; i++) {
    responses[i] = byId(`q${i+1}`).value;
    console.log(responses[i], answers[i]);
    if (responses[i] === answers[i]) {
      sum++;
    }
  }

  if (mcg.firstTry) {
    b = 'Trick question - it\'s ';
  } else {
    b = '';
  }

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
      <br>
      <p>You got ${sum} out of 5 questions right!</p>
      <button id="retake" onclick="switchGameState()">Try again?</button>
  </div>`;

  byId(currState).remove();
  space.innerHTML += newContent;
  mcg.firstTry = false;
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


