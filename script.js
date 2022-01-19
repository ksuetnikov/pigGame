'use strict';

//Elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initioal conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');
let isPlaying = true;

const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
const changePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
// Roll the dice

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Genereate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    // 3. If the number is 1, switch to the next player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // if there is first player turn!
    if (activePlayer === 0) {
      let firstSumScore = Number(score0Element.textContent) + currentScore;
      score0Element.textContent = firstSumScore;
      currentScore = 0;
      if (firstSumScore >= 50) {
        diceElement.classList.add('hidden');
        isPlaying = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      }
      if (isPlaying) {
        changePlayer();
      }
    } /*if there us second player turn!*/ else {
      let secondSumScore = Number(score1Element.textContent) + currentScore;
      score1Element.textContent = secondSumScore;

      currentScore = 0;
      if (secondSumScore >= 50) {
        diceElement.classList.add('hidden');
        isPlaying = false;
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      }
      if (isPlaying) {
        changePlayer();
      }
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  isPlaying = true;

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  activePlayer = 0;
});
