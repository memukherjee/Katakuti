let currentPlayer = "O";
let isWon = false;
const heading = document.getElementById("message");
const box1 = document.getElementById("grid-1");
const box2 = document.getElementById("grid-2");
const box3 = document.getElementById("grid-3");
const box4 = document.getElementById("grid-4");
const box5 = document.getElementById("grid-5");
const box6 = document.getElementById("grid-6");
const box7 = document.getElementById("grid-7");
const box8 = document.getElementById("grid-8");
const box9 = document.getElementById("grid-9");
const restartBtn = document.getElementById("restart");
restartBtn.disabled = true;

const chooseBox = (e) => {
  heading.innerText = (currentPlayer=='O'?'X':'O')+"'s turn, Game in progress...";
  if (
    e.firstElementChild !== null &&
    (e.firstElementChild.classList.contains("fa-x") ||
      e.firstElementChild.classList.contains("fa-o"))
  ) {
    heading.innerText = "Already selected box, choose another";
    return;
  }
  e.innerHTML =
    currentPlayer === "X"
      ? '<i class="fa-solid fa-2x fa-x"></i>'
      : '<i class="fa-solid fa-2x fa-o"></i>';
  e.title = currentPlayer === "O" ? "O" : "X";
  changePlayer();
  checkWin();
};

const changePlayer = () => {
  currentPlayer = currentPlayer === "O" ? "X" : "O";
};

const checkWin = () => {
  let table = [
    [box1.title, box2.title, box3.title],
    [box4.title, box5.title, box6.title],
    [box7.title, box8.title, box9.title],
  ];
  for (let i = 0; i < 3; i++) {
    //row check
    let isBlank = false;
    for (let j = 0; j < 3; j++) {
      if (table[i][j] == "") {
        isBlank = true;
        break;
      }
    }
    if (isBlank) continue;
    if (table[i][0] === table[i][1] && table[i][1] === table[i][2]) {
      isWon = true;
      break;
    }
  }

  for (let i = 0; i < 3; i++) {
    //col check
    let isBlank = false;
    for (let j = 0; j < 3; j++) {
      if (table[j][i] == "") {
        isBlank = true;
        break;
      }
    }
    if (isBlank) continue;
    if (table[0][i] === table[1][i] && table[1][i] === table[2][i]) {
      isWon = true;
      break;
    }
  }

  if (
    table[0][0] === table[1][1] &&
    table[1][1] == table[2][2] &&
    table[0][0] != "" &&
    table[1][1] != "" &&
    table[2][2] != ""
  ) {
    isWon = true;
  }
  if (
    table[0][2] === table[1][1] &&
    table[1][1] == table[2][0] &&
    table[0][2] != "" &&
    table[1][1] != "" &&
    table[2][0] != ""
  ) {
    isWon = true;
  }

  //if won
  if (isWon) {
    heading.innerHTML = `${currentPlayer == "X" ? "O" : "X"} won`;
    restartBtn.disabled = false;
    freezeClick = true;
    document.body.style.backgroundColor = "green";
    return;
  }
  noBlank(table);
};

const noBlank = (a) => {
  let blank = false;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (a[i][j] == "") {
        blank = true;
        break;
      }
    }
    if (blank) break;
  }
  if (!blank) {
    heading.innerText = "Draw!";
    document.body.style.backgroundColor = "yellow";
    freezeClick = true;
    restartBtn.disabled = false;
  }
};

let freezeClick = false;

document.addEventListener(
  "click",
  (e) => {
    if (e.target.id === "restart") {
      window.location.reload();
    }
    if (freezeClick) {
      e.stopPropagation();
      e.preventDefault();
    }
  },
  true
);
