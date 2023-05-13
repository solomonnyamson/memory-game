import {
  getUserSelectedConfig,
  generateCards,
  generateRandomNumbers,
  generatePlayers,
  game,
} from './gameSetup.js';

const gameWrapper = document.querySelector('.wrapper');
const gameStart = document.querySelector('.game-start');
const startButton = document.querySelector('.menu-button');
const menuButton = document.querySelector('.menu');
const mobileMenuModalWrapper = document.querySelector('.modal-menu');
startButton.addEventListener('click', () => {
  getUserSelectedConfig();
  gameWrapper.classList.add('hide');
  gameStart.classList.remove('hide');
  generateCards();

  generateRandomNumbers();
  generatePlayers();
  game()
});

menuButton.addEventListener('click', () => {
  mobileMenuModalWrapper.style = 'display: grid';
});

// USER DEFINED  FUNCTIONS