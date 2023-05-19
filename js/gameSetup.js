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

const timeElapsed = document.querySelector('.time-ticker');
const totalMoves = document.querySelector('.total-moves');
const movesPlayed = document.querySelector('.moves > .detail');
const singlePGameOverModal = document.querySelector('.sp-game-over-modal');
const multiPGameOverModal = document.querySelector('.mp-game-over-modal');
const player1Move = document.querySelector('.moves-p1');
const player2Move = document.querySelector('.moves-p2');
const player3Move = document.querySelector('.moves-p3');
const player4Move = document.querySelector('.moves-p4');
const player1Score = document.querySelector('.score-p1');
const player2Score = document.querySelector('.score-p2');
const player3Score = document.querySelector('.score-p3');
const player4Score = document.querySelector('.score-p4');

const game = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      launchTimeTicker();
      card.classList.add('is-flipped');
      flippedCards.push(card);
      checkPairs();
      if (card.classList.contains('matched')) {
        if (player1Turn) {
          player1Score.textContent = +player1Score.textContent + 1;
        } else if (player2Turn) {
          player2Score.textContent = +player2Score.textContent + 1;
        } else if (player3Turn) {
          player3Score.textContent = +player3Score.textContent + 1;
        } else if (player4Turn) {
          player4Score.textContent = +player4Score.textContent + 1;
        }
      }
      if (!card.classList.contains('matched')) {
        nextPlayer();
        playerTurn(player1Turn, player1, player2, player3, player4);
        playerTurn(player2Turn, player2, player1, player3, player4);
        playerTurn(player3Turn, player3, player1, player2, player4);
        playerTurn(player4Turn, player4, player1, player2, player3);
      }
    });
  });
};

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
    movesPlayed.textContent = moves;
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
    if (selectedConfig.player === '2') {
      player1Turn
        ? ((player1Turn = false), (player2Turn = true))
        : ((player1Turn = true), (player2Turn = false));
    } else if (selectedConfig.player === '3') {
      if (player1Turn) {
        player1Turn = false;
        player2Turn = true;
        player3Turn = false;
        return;
      }
      if (player2Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = true;
        return;
      }
      if (player3Turn) {
        player1Turn = true;
        player2Turn = false;
        player3Turn = false;
        return;
      }
    } else if (selectedConfig.player === '4') {
      if (player1Turn) {
        player1Turn = false;
        player2Turn = true;
        player3Turn = false;
        player4Turn = false;
        return;
      }
      if (player2Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = true;
        player4Turn = false;
        return;
      }
      if (player3Turn) {
        player1Turn = false;
        player2Turn = false;
        player3Turn = false;
        player4Turn = true;
        return;
      }
      if (player4Turn) {
        player1Turn = true;
        player2Turn = false;
        player3Turn = false;
        player4Turn = false;
        return;
      }
    }
  }
};

const timeTicker = document.querySelector('.timer > .detail');
let interval;
let min = 0;
let sec = 1;
let done = false;

const launchTimeTicker = () => {
  if (!done) {
    done = true;
    interval = setInterval(() => {
      timeTicker.innerHTML = `${min}:${sec <= 9 ? '0' + sec : sec}`;
      sec++;
      if (sec === 60) {
        min++;
        sec = 0;
      }
    }, 1000);
  }
};

const winner = document.querySelector('#winner');
const playerOne = document.querySelector('.player1');
const playerTwo = document.querySelector('.player2');
const playerThree = document.querySelector('.player3');
const playerFour = document.querySelector('.player4');
const multiPGameOverModalBody = document.querySelector('.modal__center');

const updateMultiPScoreSheet = () => {
  // GET THE SCORE OF EACH PLAYER
  let scores = [];

  // DISPLAY PLAYER SCORE DIV BASED ON THE NUMBER OF PLAYERS
  if (selectedConfig.player == '2') {
    playerThree.style = 'display: none';
    playerFour.style = 'display: none';
  } else if (selectedConfig.player == '3') {
    playerFour.style = 'display: none';
  }

  // UPDATE THE TEXT CONTENT TO REFLECT THE PLAYER SCORE
  if (selectedConfig.player !== '1') {
    player1Move.textContent = `${player1Score.textContent} Pairs`;
    player2Move.textContent = `${player2Score.textContent} Pairs`;
    player3Move.textContent = `${player3Score.textContent} Pairs`;
    player4Move.textContent = `${player4Score.textContent} Pairs`;

    scores.push(player1Score.textContent);
    scores.push(player2Score.textContent);
    scores.push(player3Score.textContent);
    scores.push(player4Score.textContent);

    const maxScore = Math.max(...scores);

    const tieOrNot =
      scores.filter((score) => score == maxScore).length > 1 ? 'Tie' : 'No Tie';

    if (tieOrNot === 'Tie') {
      winner.textContent = "It's a tie!";
      if (maxScore == player1Score.textContent) {
        playerOne.classList.add('active');
        playerOne.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player2Score.textContent) {
        playerTwo.classList.add('active');
        playerTwo.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player3Score.textContent) {
        playerThree.classList.add('active');
        playerThree.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player4Score.textContent) {
        playerFour.classList.add('active');
        playerFour.children[0].innerHTML += ' (Winner!)';
      }
    } else {
      if (maxScore == player1Score.textContent) {
        winner.textContent = 'Player 1 Wins!';
        playerOne.classList.add('active');
        playerOne.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player2Score.textContent) {
        winner.textContent = 'Player 2 Wins!';
        playerTwo.classList.add('active');
        playerTwo.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player3Score.textContent) {
        winner.textContent = 'Player 3 Wins!';
        playerThree.classList.add('active');
        playerThree.children[0].innerHTML += ' (Winner!)';
      }
      if (maxScore == player4Score.textContent) {
        winner.textContent = 'Player 4 Wins!';
        playerFour.classList.add('active');
        playerFour.children[0].innerHTML += ' (Winner!)';
      }
    }
  }

  // SORT THE PLAYER SCORE DIV ACCORDING TO THE HIGHEST SCORE AND REORDER IT TO THE TOP
  const playersArray = [playerOne, playerTwo, playerThree, playerFour];

  const sortedPlayersArray = [];

  playersArray.forEach((player) => {
    if (player.classList.contains('active')) {
      let innerArray = [];
      innerArray.push(player);

      let initialSort = innerArray.sort((a, b) =>
        a.children[1].textContent > b.children[1].textContent ? -1 : 1
      );
      sortedPlayersArray.unshift(...initialSort);
    } else {
      sortedPlayersArray.push(player);
    }
  });

  sortedPlayersArray.forEach((player) => {
    multiPGameOverModalBody.appendChild(player);
  });
};

// STOP THE TIME TICKER AND DISPLAY THE RELEVANT SCORE SHEET
const stopTimeTicker = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const matchedCards = document.querySelectorAll('.matched').length;
      if (matchedCards === 16 && selectedConfig.size === '4x4') {
        clearInterval(interval);
        timeElapsed.innerHTML = timeTicker.innerHTML;
        totalMoves.innerHTML = `${movesPlayed.innerHTML} Moves`;
        if (selectedConfig.player === '1') {
          setTimeout(() => {
            singlePGameOverModal.style = 'display: grid';
          }, 200);
        } else {
          setTimeout(() => {
            updateMultiPScoreSheet();
            multiPGameOverModal.style = 'display: grid';
          }, 200);
        }
      } else if (matchedCards === 36 && selectedConfig.size === '6x6') {
        clearInterval(interval);
        timeElapsed.innerHTML = timeTicker.innerHTML;
        totalMoves.innerHTML = `${movesPlayed.innerHTML} Moves`;

        if (selectedConfig.player === '1') {
          setTimeout(() => {
            singlePGameOverModal.style = 'display: grid';
          }, 200);
        } else {
          setTimeout(() => {
            updateMultiPScoreSheet();
            multiPGameOverModal.style = 'display: grid';
          }, 200);
        }
      }
    });
  });
};

const restartGame = () => {
  const playersArray = [player1, player2, player3, player4];
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.classList.remove('is-flipped');
    card.classList.remove('matched');
  });

  player1Turn = true;
  player2Turn = false;
  player3Turn = false;
  player4Turn = false;

  playersArray.forEach((player) => {
    player.classList.remove('hide');
  });

  playerOne.classList.remove('active');
  playerTwo.classList.remove('active');
  playerThree.classList.remove('active');
  playerFour.classList.remove('active');

  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player3Score.textContent = 0;
  player4Score.textContent = 0;

  playerTurn(player1Turn, player1, player2, player3, player4);

  moves = 0;
  movesPlayed.textContent = moves;
  min = 0;
  sec = 1;
  timeTicker.innerHTML = '0:00';
  clearInterval(interval);
  done = false;
};

// RESET GAME BOARD USER SELECTIONS
const resetUserSelection = () => {
  removeCards();

  // RESET THE RADIO BUTTONS TO DEFAULT
  for (let config in gameConfig) {
    const setting = gameConfig[config];
    const defaultSettings = ['numbers', '1', '4x4'];
    setting.checked = false;
    defaultSettings.forEach((dSetting) => {
      if (setting.value == dSetting) {
        setting.checked = true;
      }
    });
  }
};

const newGame = () => {
  generateCards();
  generateRandomNumbers();
  generatePlayers();
  game();
  playerTurn();
  stopTimeTicker();
};

export { getUserSelectedConfig, newGame, restartGame, resetUserSelection };