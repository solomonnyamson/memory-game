const theme = document.getElementsByName('theme');
const players = document.getElementsByName('player');
const gridSize = document.getElementsByName('size');
const gameBody = document.querySelector('.game-start__body');

const gameConfig = [...theme, ...players, ...gridSize];

const selectedConfig = {};

const getUserSelectedConfig = () => {
  for (let config in gameConfig) {
    if (gameConfig[config].checked) {
      selectedConfig[gameConfig[config].name] = gameConfig[config].value;
    }
  }
};

const generateCards = () => {
  if (selectedConfig.size == '4x4') {
    const container = document.createElement('div');
    container.classList.add('number-card', 'c4x4');
    gameBody.appendChild(container);

    const grid4x4 = document.querySelector('.c4x4');

    for (let i = 0; i < 16; i++) {
      const card = document.createElement('div');
      const li = document.createElement('li');
      card.classList.add('card');
      li.appendChild(card);
      grid4x4.appendChild(li);
    }
  } else {
    const container = document.createElement('div');
    container.classList.add('number-card', 'c6x6');
    gameBody.appendChild(container);

    const grid6x6 = document.querySelector('.c6x6');

    for (let i = 0; i < 36; i++) {
      const card = document.createElement('div');
      const li = document.createElement('li');
      card.classList.add('card');
      li.appendChild(card);
      grid6x6.appendChild(li);
    }
  }
};

const removeCards = () => {
  const numberCards = document.querySelector('.number-card');
  numberCards.remove();
};

const generateRandomNumbers = () => {
  const cards = document.querySelectorAll('.card');
  let grid4x4 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  let grid6x6 = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
  ];

  if (selectedConfig.size == '4x4') {
    cards.forEach((card) => {
      let randomIndex = Math.floor(Math.random() * grid4x4.length);
      card.textContent = grid4x4[randomIndex];
      grid4x4.splice(randomIndex, 1);
    });
  } else {
    cards.forEach((card) => {
      let randomIndex = Math.floor(Math.random() * grid6x6.length);
      card.textContent = grid6x6[randomIndex];
      grid6x6.splice(randomIndex, 1);
    });
  }
};

const generatePlayers = () => {
  const singlePrayer = document.querySelector('.solo');
  const multiPrayer = document.querySelector('.multiplayer');
  const playerOne = document.querySelector('.player-one');
  const playerTwo = document.querySelector('.player-two');
  const playerThree = document.querySelector('.player-three');
  const playerFour = document.querySelector('.player-four');

  if (selectedConfig.player == '1') {
    multiPrayer.classList.add('hide');
    singlePrayer.classList.remove('hide');
  } else if (selectedConfig.player == '2') {
    singlePrayer.classList.add('hide');
    multiPrayer.classList.remove('hide');
    playerThree.classList.add('hide');
    playerFour.classList.add('hide');
  } else if (selectedConfig.player == '3') {
    singlePrayer.classList.add('hide');
    multiPrayer.classList.remove('hide');
    playerFour.classList.add('hide');
  } else {
    singlePrayer.classList.add('hide');
    multiPrayer.classList.remove('hide');
  }
};

export {
  getUserSelectedConfig,
  generateCards,
  generateRandomNumbers,
  generatePlayers,
};
