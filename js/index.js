import { getUserSelectedConfig, newGame, restartGame } from './gameSetup.js';

const gameWrapper = document.querySelector('.wrapper');
const gameStart = document.querySelector('.game-start');
const startButton = document.querySelector('.menu-button');
const menuButton = document.querySelector('.menu');
const gameRestartButton = document.querySelectorAll('.restart');
const setupNewGameButton = document.querySelectorAll('.new-game');
const resumeGameButton = document.querySelectorAll('.resume-game');
const mobileMenuModalWrapper = document.querySelector('.modal-menu');

// START A NEW GAME
startButton.addEventListener('click', () => {
  getUserSelectedConfig();
  startNewGame(true);
  newGame();
});

// DISPLAY MOBILE MENU MODAL
menuButton.addEventListener('click', () => {
  displayMobileMenu(true);
});

// RESTART GAME FUNCTIONALITY
gameRestartButton.forEach((button) => {
  button.addEventListener('click', () => {
    restartGame();
    displayMobileMenu(false);
  });
});

// RESUME GAME FUNCTIONALITY
resumeGameButton.forEach((button) => {
  button.addEventListener('click', () => {
    displayMobileMenu(false);
  });
});

// NEW GAME FUNCTIONALITY
setupNewGameButton.forEach((button) => {
  button.addEventListener('click', () => {
    startNewGame(false);
    displayMobileMenu(false);
  });
});

// USER DEFINED  FUNCTIONS
const displayMobileMenu = (value) => {
  if (value) mobileMenuModalWrapper.style = 'display: grid';
  else mobileMenuModalWrapper.style = 'display: none';
};

const startNewGame = (value) => {
  if (value) {
    // START A NEW GAME
    gameWrapper.classList.add('hide');
    gameStart.classList.remove('hide');
  } else {
    // RESET TO START NEW GAME
    gameWrapper.classList.remove('hide');
    gameStart.classList.add('hide');
  }
};
