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
      const frontSide = document.createElement('div');
      frontSide.classList.add('card__side', 'card__front-side');
      const backSide = document.createElement('div');
      backSide.classList.add('card__side', 'card__back-side');
      card.classList.add('card');
      card.appendChild(backSide);
      card.appendChild(frontSide);
      grid4x4.appendChild(card);
    }
  } else {
    const container = document.createElement('div');
    container.classList.add('number-card', 'c6x6');
    gameBody.appendChild(container);

    const grid6x6 = document.querySelector('.c6x6');

    for (let i = 0; i < 36; i++) {
      const card = document.createElement('div');
      const frontSide = document.createElement('div');
      frontSide.classList.add('card__side', 'card__front-side');
      const backSide = document.createElement('div');
      backSide.classList.add('card__side', 'card__back-side');
      card.classList.add('card');
      card.appendChild(backSide);
      card.appendChild(frontSide);
      grid6x6.appendChild(card);
    }
  }
};

const removeCards = () => {
  const numberCards = document.querySelector('.number-card');
  numberCards.remove();
};

const generateRandomNumbers = () => {
  const cards = document.querySelectorAll('.card');
  const cardsBack = document.querySelectorAll('.card__back-side');
  let grid4x4 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  let grid6x6 = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18,
  ];

  if (selectedConfig.size == '4x4') {
    cardsBack.forEach((card, index) => {
      let randomIndex = Math.floor(Math.random() * grid4x4.length);
      card.textContent = grid4x4[randomIndex];
      cards[index].dataset.name = grid4x4[randomIndex];
      grid4x4.splice(randomIndex, 1);
    });
  } else {
    cardsBack.forEach((card, index) => {
      let randomIndex = Math.floor(Math.random() * grid6x6.length);
      card.textContent = grid6x6[randomIndex];
      cards[index].dataset.name = grid6x6[randomIndex];
      grid6x6.splice(randomIndex, 1);
    });
  }
};

const generatePlayers = () => {
  const singlePrayer = document.querySelector('.solo');
  const multiPrayer = document.querySelector('.multiplayer');
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

// GAME LOGIC

let moves = 0;
let flippedCards = [];

const game = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add('is-flipped');
      flippedCards.push(card);
      checkPairs();
      if (card.classList.contains('matched')) {
        //  TODO: GENERATE SCORES
      }
      if (!card.classList.contains('matched')) {
        nextPlayer();
      }
    });
  });
};

// const checkPairs = () => {
//   const numberOfFlippedCards = document.querySelectorAll('.is-flipped').length;
//   const cardsFlipped = document.querySelectorAll('.is-flipped');
//   if (
//     selectedConfig.theme === 'numbers' &&
//     numberOfFlippedCards === 2 &&
//     flippedCards[0].children[0].innerHTML ===
//       flippedCards[1].children[0].innerHTML
//   ) {
//     if (selectedConfig.theme === 'numbers') {
//       cardsFlipped.forEach((card) => {
//         card.classList.add('match');
//       });
//     }

//     //TODO: DO ALSO FOR THE ICONS HERE

//     if (numberOfFlippedCards >= 2) {
//       console.log(true);
//       //TODO: INCREASE MOVE
//       moves++;
//       //TODO: CHANGE MOVES PLAYED TEXT CONTENT TO CURRENT MOVES
//       cardsFlipped.forEach((card) => {
//         setTimeout(() => {
//           card.classList.remove('is-flipped');
//           flippedCards = [];
//         }, 600);
//       });
//     }
//   }
// };

const checkPairs = () => {
  const NumberOfCardsFlipped = document.querySelectorAll('.is-flipped').length;
  const cardsFlipped = document.querySelectorAll('.is-flipped');
  if (
    selectedConfig.theme == 'numbers' &&
    NumberOfCardsFlipped === 2 &&
    flippedCards[0].children[0].innerHTML ===
      flippedCards[1].children[0].innerHTML
  )
    if (selectedConfig.theme === 'numbers') {
      cardsFlipped.forEach((card) => {
        card.classList.add('matched');
      });
    }

  // if (
  //   gameScreen.classList.contains('icons') &&
  //   NumberOfCardsFlipped === 2 &&
  //   flippedCards[0].children[0].classList[1] ===
  //     flippedCards[1].children[0].classList[1]
  // ) {
  //   cardsFlipped.forEach((card) => {
  //     card.classList.add('matched');
  //   });
  // }

  if (NumberOfCardsFlipped >= 2) {
    moves++;
    //  movesPlayed.textContent = moves;
    cardsFlipped.forEach((card) => {
      setTimeout(() => {
        card.classList.remove('is-flipped');
        flippedCards = [];
      }, 600);
    });
  }
};

let player1Turn = true;
let player2Turn = false;
let player3Turn = false;
let player4Turn = false;
const player1 = document.querySelector('.player-one');
const player2 = document.querySelector('.player-two');
const player3 = document.querySelector('.player-three');
const player4 = document.querySelector('.player-four');

const playerTurn = (pTurn, p1, p2, p3, p4) => {
  if (pTurn) {
    p1.classList.add('active');
    p2.classList.remove('active');
    p3.classList.remove('active');
    p4.classList.remove('active');
  }
};

const nextPlayer = () => {
  const numberOfFlippedCards = document.querySelectorAll('.is-flipped').length;
  if (numberOfFlippedCards === 2) {
    console.log(selectedConfig);
  }
};

export {
  getUserSelectedConfig,
  generateCards,
  generateRandomNumbers,
  generatePlayers,
  game,
};
