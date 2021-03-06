"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
let robotScore;
let roboDice = 0;

score0El.textContent = 0;
score1El.textContent = 0;

const diceEl = document.querySelector(".dice");

diceEl.classList.add("hidden");

const getActivePlayer = function () {
  const activePlayerEl = document.querySelector(".player--active");
  let currActivePlayer;
  // console.log(activePlayerEl.classList);
  if (activePlayerEl.classList.contains("player--0")) {
    currActivePlayer = "0";
  } else if (activePlayerEl.classList.contains("player--1")) {
    currActivePlayer = "1";
  }
  // console.log("currActivePlayer :", currActivePlayer);
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
    document.querySelector(".player--active").classList.add("player--winner");
    document.querySelector(".player--active").classList.add("particletext", "confetti");
      confetti();
  }
};

const getActivePlayerScore = function () {
  return Number(document.getElementById(`score--${activePlayer}`).textContent);
};

const displayDice = function (time) {
  let dice = 0;
  setTimeout(function () {
    dice = Math.trunc(Math.random() * 6) + 1;
    // console.log("dice :", dice);
    if (roboDice == -1) {
      dice = 1;
    }
    diceEl.src = `dice-${dice}.png`;
    if (dice == 1) {
      roboDice = -1;
    }
    if (roboDice >= 0) {
      roboDice += dice;
    }
  }, time * 1000);
  // console.log("out dice: ", dice);
};

const switchPlayer = function () {
  // diceEl.classList.add('hidden');
  // console.log("b4 switch activePlayer :", activePlayer);

  if (!document.querySelector(".player--winner")) {
    const players = document.querySelectorAll(".player");
    for (let i = 0; i < players.length; i++) {
      if (players[i].classList.contains("player--active")) {
        players[i].classList.remove("player--active");
        players[i].children[2].classList.remove("currentActive");
      } else {
        players[i].classList.add("player--active");
        players[i].children[2].classList.add("currentActive");
      }
    }
    activePlayer = getActivePlayer();
    // console.log("after switch activePlayer :", activePlayer);
    if (activePlayer == 1) {
      document.querySelector(".btn--roll").style.display = "none";
      document.querySelector(".btn--hold").style.display = "none";

      robotScore = 0;
      // console.log("robotScore : ", robotScore);
      displayDice(0.5);
      displayDice(1);
      displayDice(1.5);
      displayDice(2);
      
      setTimeout(function () {
        if (roboDice > 0) {
          robotScore = roboDice;
        }
        roboDice = 0;
        robotScore = robotScore == 1 ? 0 : robotScore;
        setActivePlayerCurrentScore(robotScore);
      }, 2000);
      setTimeout(function () {
        document.querySelector(".btn--hold").click();
      }, 2500);
    } else {
      document.querySelector(".btn--roll").style.display = "unset";
      document.querySelector(".btn--hold").style.display = "unset";
    }
  }
};

document.querySelector(".btn--roll").addEventListener("click", function () {
  if (!document.querySelector(".player--winner") && activePlayer != 1) {
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    // console.log('diceNumber :' + diceNumber);
    let activePlayerContent = Number(getActivePlayerCurrentScore());
    diceEl.src = `dice-${diceNumber}.png`;
    diceEl.classList.remove("hidden");

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

document.querySelector(".btn--hold").addEventListener("click", function () {
  if (!document.querySelector(".player--winner")) {
    setActivePlayerScore();
    setActivePlayerCurrentScore(0);
    switchPlayer();
    activePlayer = getActivePlayer();
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
  activePlayer = 0;
  for (let i = 0; i < 2; i++) {
    document.getElementById(`current--${i}`).textContent = 0;
    document.getElementById(`score--${i}`).textContent = 0;
  }
   document.querySelector(".player--winner").classList.remove("player--winner");
  const removeElements = (elms) => elms.forEach(el => el.remove());
  removeElements( document.querySelectorAll(".particle") );
  
  if (
    document.querySelector(".player--1").classList.contains("player--active")
  ) {
    document.querySelector(".player--1").classList.remove("player--active");
    document
      .querySelector(".player--1")
      .children[2].classList.remove("currentActive");
    document.querySelector(".player--0").classList.add("player--active");
    document
      .querySelector(".player--0")
      .children[2].classList.add("currentActive");
    document.querySelector(".btn--roll").style.display = "unset";
    document.querySelector(".btn--hold").style.display = "unset";
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
  document.querySelector(".btn--instructions").style.display = "none";
};
span.onclick = function () {
  modal.style.display = "none";
  document.querySelector(".btn--instructions").style.display = "block";
  if (document.querySelector("main").style.removeProperty) {
    document.querySelector("main").style.removeProperty("display");
  } else {
    document.querySelector("main").style.removeAttribute("display");
  }
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector("main").remove("display");
  }
};

var inputBtn = document.getElementById("inputBtn");
var inputModal = document.getElementById("myInputModal");
var closeInputModal = document.getElementById("closeInput");
var gameName = document.getElementById("gameName");
var diceName = document.querySelector('.NamePos');

inputBtn.onclick = function () {
  inputModal.style.borderRadius = "unset";
  inputModal.style.position = "relative";
  inputModal.style.display = "block";
  gameName.style.display = "block";
  diceName.style.display = "block";
  document.querySelector("main").style.display = "none";
  document.querySelector(".btn--instructions").style.display = "none";
};

inputBtn.click();

closeInputModal.onclick = function () {
  inputModal.style.display = "none";
  gameName.style.display = "none";
  diceName.style.display = "none";
  document.querySelector(".btn--instructions").style.display = "block";
  if (document.querySelector("main").style.removeProperty) {
    document.querySelector("main").style.removeProperty("display");
  } else {
    document.querySelector("main").style.removeAttribute("display");
  }
};

var okBtn = document.getElementById("okBtn");

let userName = "You";
okBtn.onclick = function () {
  userName = document.getElementById("username").value.split(" ")[0];
  if (userName != "") {
    document.getElementById("name--0").textContent = userName;
  }
  inputModal.style.display = "none";
  gameName.style.display = "none";
  diceName.style.display = "none";
  document.querySelector(".btn--instructions").style.display = "block";
  if (document.querySelector("main").style.removeProperty) {
    document.querySelector("main").style.removeProperty("display");
  } else {
    document.querySelector("main").style.removeAttribute("display");
  }
};

function confetti() {
  const winner = document.querySelector('.particletext.confetti');
  var confetticount = (winner.offsetWidth / 50) * 10;
  // console.log("confetticount :",confetticount);
      for(var i = 0; i <= confetticount; i++) {
        var newChild = '<span class="particle c' + rnd(1, 2) + '" style="top:' + rnd(10, 50) + '%; left:' + rnd(0, 100) + '%;width:' + rnd(6, 8) + 'px; height:' + rnd(3, 4) + 'px;animation-delay: ' + (rnd(0, 30) / 10) + 's;"></span>';
        winner.insertAdjacentHTML('beforeend', newChild);
      }
}

const rnd = function(m,n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor( Math.random() * (n - m + 1) ) + m;
}