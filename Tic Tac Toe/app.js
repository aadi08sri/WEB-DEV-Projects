let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset-btn");
let messageDiv = document.querySelector(".message");

let currentPlayer = "X"; // X is the first player

let isGameOver = false; // to check if the game is over

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (currentPlayer === "X") {
      box.innerText = "X";
      box.style.color = "red";
      

      messageDiv.innerText = `It's O's turn`; //after clicking the box turn is changed to O
      currentPlayer = "O"; // O is the second player
    } else {
      messageDiv.innerText = `It's X's turn`; //after clicking the box turn is changed to X
      box.innerText = "O";
      currentPlayer = "X";
    }
    box.disabled = true; // to disable the box after it is clicked as it is already filled
    checkWin();
    checkDraw();
  });
});

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let checkDraw = function () {
  if (isGameOver === true) return; // Stop checking after a win

  let allBoxesFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allBoxesFilled = false;
    }
  });
  if (allBoxesFilled === true) {
    messageDiv.innerText = "It's a draw!";
    boxes.forEach((box) => (box.disabled = true));
    isGameOver = true;
  }
};

const checkWin = () => {
  for (let win of winConditions) {
    let firstBox = boxes[win[0]].innerText;
    let secondBox = boxes[win[1]].innerText;
    let thirdBox = boxes[win[2]].innerText;

    if (firstBox != "" && secondBox != "" && thirdBox != "") {
      if (firstBox === secondBox && secondBox === thirdBox) {
        messageDiv.innerText = `Congratulations, winner is ${firstBox}!`;
        isGameOver = true;
        // Disable all boxes
        boxes.forEach((box) => (box.disabled = true));
        return; // Stop checking after a win
      }
    }
  }
};
resetButton.addEventListener("click", () => {
  alert("Are you sure to reset the game?");
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  messageDiv.innerText = ""; // Clear the message
  currentPlayer = "X";
  isGameOver = false;
});
