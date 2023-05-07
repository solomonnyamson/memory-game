import {
  getUserSelectedConfig,
  generateCards,
  generateRandomNumbers,
  generatePlayers,
} from './gameSetup.js';

const gameWrapper = document.querySelector('.wrapper');
const gameStart = document.querySelector('.game-start');
const startButton = document.querySelector('.menu-button');

startButton.addEventListener('click', () => {
  getUserSelectedConfig();
  gameWrapper.classList.add('hide');
  gameStart.classList.remove('hide');
  generateCards();

  generateRandomNumbers();
  generatePlayers();
});

// USER DEFINED  FUNCTIONS
