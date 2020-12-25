const drawingBoard = document.querySelector(".drawing-board");
const draw = document.querySelector(".draw");
const rgb = document.querySelector(".rgb");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const btns = document.querySelector(".btn-container");

let initialSize = 64;
let mode = "draw";
let userSize;

const drawBoard = (size) => {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    drawingBoard.append(row);
    for (let j = 0; j < size; j++) {
      const pixel = document.createElement("div");
      pixel.classList.add("pixel");
      // set width
      pixel.style.width = `${drawingBoard.clientWidth / size}px`;
      // set height
      pixel.style.height = `${drawingBoard.clientHeight / size}px`;
      row.append(pixel);
    }
  }
};

const generateRGB = () => {
  const rgb = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#FFFF00",
    "#0000FF",
    "#4B0082",
    "#8f00FF",
  ];
  return rgb[Math.round(Math.random() * 7)];
};

const initDraw = () => {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseover", () => {
      if (mode === "draw") pixel.style.backgroundColor = "black";
      if (mode === "eraser") pixel.style.backgroundColor = "white";
      if (mode === "rgb") pixel.style.backgroundColor = generateRGB();
    });
  });
};

const clearBoard = () => {
  const rows = document.querySelectorAll(".row");
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "white";
  });
  userSize = prompt(
    "Whould you like to set a new board size? (default - 64, max - 100)",
    "64"
  );
  while (
    !userSize ||
    typeof +userSize !== "number" ||
    +userSize > 100 ||
    +userSize <= 0
  ) {
    userSize = prompt(
      "Whould you like to set a new board size? (default - 64, max - 100)"
    );
  }
  // clear board
  rows.forEach((row) => {
    row.remove();
  });
  drawBoard(userSize);
  initDraw();
};

window.addEventListener("load", () => {
  drawBoard(initialSize);

  initDraw();

  btns.addEventListener("click", (e) => {
    const clicked = e.target.dataset.mode;
    switch (clicked) {
      case "draw":
        mode = "draw";
        break;
      case "rgb":
        mode = "rgb";
        break;
      case "eraser":
        mode = "eraser";
        break;
      case "clear":
        clearBoard();
        mode = "draw";
        break;
      default:
        mode = "draw";
    }
  });
});
