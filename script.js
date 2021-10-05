'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

score0El.textContent = 0;
score1El.textContent = 0;

const diceEl = document.querySelector('.dice');

diceEl.classList.add('hidden');

const getActivePlayer = function () {
  const activePlayerEl = document.querySelector('.player--active');
  let currActivePlayer;
  console.log(activePlayerEl.classList);
  if (activePlayerEl.classList.contains('player--0')) {
    currActivePlayer = '0';
  } else if (activePlayerEl.classList.contains('player--1')) {
    currActivePlayer = '1';
  }
  return currActivePlayer;
};

let activePlayer = getActivePlayer();

const setActivePlayerCurrentScore = function (score) {
  document.getElementById(`current--${activePlayer}`).textContent = score;
};
const getActivePlayerCurrentScore = function () {
  return Number(
    document.getElementById(`current--${activePlayer}`).textContent
  );
};

const setActivePlayerScore = function () {
  const score = getActivePlayerScore() + getActivePlayerCurrentScore();
  document.getElementById(`score--${activePlayer}`).textContent = score;
  if (score >= 100) {
    document.querySelector('.player--active').classList.add('player--winner');
  }
};

const getActivePlayerScore = function () {
  return Number(document.getElementById(`score--${activePlayer}`).textContent);
};

const switchPlayer = function () {
  // diceEl.classList.add('hidden');
  if (!document.querySelector('.player--winner')) {
    const players = document.querySelectorAll('.player');
    for (let i = 0; i < players.length; i++) {
      if (players[i].classList.contains('player--active')) {
        players[i].classList.remove('player--active');
        players[i].children[2].classList.remove('currentActive');

      } else {
        players[i].classList.add('player--active');
        players[i].children[2].classList.add('currentActive');
        //    document.getElementById(`current--${activePlayer}`).parentElement.style.animation = "gradient 15s ease infinite";
      }
    }
  }
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (!document.querySelector('.player--winner')) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log('diceNumber :' + diceNumber);
    let activePlayerContent = Number(getActivePlayerCurrentScore());
    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove('hidden');

    if (diceNumber !== 1) {
      activePlayerContent += diceNumber;
      setActivePlayerCurrentScore(activePlayerContent);
    } else if (diceNumber === 1) {
      setActivePlayerCurrentScore(0);
      switchPlayer();
      activePlayer = getActivePlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (!document.querySelector('.player--winner')) {
    setActivePlayerScore();
    setActivePlayerCurrentScore(0);
    switchPlayer();
    activePlayer = getActivePlayer();
  }
});

document.querySelector('.btn--new').addEventListener('click', function () {
  for (let i = 0; i < 2; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
    document
      .querySelector('.player--winner')
      .classList.remove('player--winner');
  }
});


var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.borderRadius = "unset";
  modal.style.position = "relative";
  modal.style.display = "block";
  document.querySelector("main").style.display = "none";
  document.querySelector('.btn--instructions').style.display = "none";
}
span.onclick = function () {
  modal.style.display = "none";
  document.querySelector('.btn--instructions').style.display = "block";
  if (document.querySelector("main").style.removeProperty) {
    document.querySelector("main").style.removeProperty('display');
  } else {
    document.querySelector("main").style.removeAttribute('display');
  }
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("main").remove("display");
  }
}