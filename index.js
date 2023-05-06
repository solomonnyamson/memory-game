const startButton = document.querySelector('.menu-button');
const gameBoardWrapper = document.querySelector('.wrapper');


startButton.addEventListener('click', () => {
    gameBoardWrapper.classList.add('game-start')
})