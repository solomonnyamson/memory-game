const startButton = document.querySelector(".menu-button");
const selectedTheme = document.getElementsByName("theme");
const selectedPayers = document.getElementsByName("player");
const selectedSize = document.getElementsByName("size");
const initialGameScreen = document.querySelector(".wrapper");
const gameStartScreen = document.querySelector(".game-start");
const playGameScreen4x4 = document.querySelector(".c4x4");
const playGameScreen6x6 = document.querySelector(".c6x6");
const soloGameBottom = document.querySelector(".bottom-timer-moves");
const multiGameBottom = document.querySelector(".bottom-player-moves");

const allOptions = [...selectedTheme, ...selectedPayers, ...selectedSize];

const selectedOptions = {};

startButton.addEventListener("click", () => {
  getSelectedOptions();
  selectGameBoard(selectedOptions);
});

// USER DEFINED  FUNCTIONS
const getSelectedOptions = () => {
  for (let option in allOptions) {
    if (allOptions[option].checked) {
      selectedOptions[allOptions[option].name] = allOptions[option].value;
    }
  }
};

const selectGameBoard = (options) => {
  // TODO: ADD ADDITIONAL BLOCKS TO CHECK FOR ALL OPTIONS

  initialGameScreen.classList.add("hide");
  gameStartScreen.classList.remove("hide");
  if (
    options?.theme == "numbers" &&
    options?.player == "2" &&
    options?.size == "4x4"
  ) {
    soloGameBottom.classList.add("hide");
    multiGameBottom.classList.remove("hide");
  } else if (
    options?.theme == "numbers" &&
    options?.player == "1" &&
    options?.size == "6x6"
  ) {
    playGameScreen4x4.classList.add("hide");
    playGameScreen6x6.classList.remove("hide");
  } else if (
    options?.theme == "numbers" &&
    options?.player == "1" &&
    options?.size == "6x6"
  ) {
  }
};
