//configuration
const nMoves = 3;

//elements
const square = document.getElementById('square-id');
const input = document.getElementById('input-id');
const buttonGo = document.getElementById('go-id');
const playAgain = document.getElementById('play-again-id');
const result = document.getElementById('game-result-id');

// global variables
let count = 0;

//functions
function game() {
    let color = input.value;
    square.style.backgroundColor = color;
    count++;
    result.innerHTML = `Attemption number: ${count}`;
    if (count > nMoves - 1){
        finishGame();
    }
}

function startGame(){
    count = 0;
    // input.readOnly = false;
    buttonGo.disabled = false;
    square.style.backgroundColor = 'white';
    result.innerHTML = '';
    playAgain.hidden = true;
}

function finishGame(){
    buttonGo.disabled = true;
    playAgain.hidden = false;
    // input.readOnly = true;
    result.innerHTML = 'Congrats! Game\'s over';
}

//actions
startGame();

buttonGo.addEventListener('click',  game);

playAgain.addEventListener('click', startGame);
