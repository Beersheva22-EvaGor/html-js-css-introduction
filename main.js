//elements
let dict = ['aaron', 'ababa', 'abaci', 'aback', 'abaft', 'abase', 'abash', 'abate', 'abbey', 'abbot', 'abeam', 'abets', 'abhor', 'abide', 'abler', 'abode', 'abort', 'about', 'above', 'abuja', 'abuse', 'abuts', 'abysm', 'abyss', 'accra', 'ached', 'aches', 'acids', 'acing', 'acorn', 'acres', 'acrid', 'acted', 'actes', 'actin', 'acton', 'actor', 'actum', 'actus', 'acute', 'adage', 'adams', 'adapt', 'addax', 'added', 'adder', 'addis', 'addle', 'adeem', 'adept', 'adieu', 'adios', 'adits', 'adler', 'adman', 'admit', 'admix', 'adobe', 'adopt', 'adore', 'adorn', 'adult', 'adzes', 'aegis', 'aeons', 'aesop', 'affix', 'afire', 'afoot', 'afore', 'afoul', 'afros', 'after', 'again', 'agape', 'agars', 'agate', 'agent', 'agers', 'aggro', 'agile', 'aging', 'agios', 'agist', 'aglow', 'agnes', 'agony', 'agree', 'agues', 'ahead', 'aided', 'aider', 'aides', 'ailed', 'aimed', 'aired', 'aires', 'aisle', 'akron', 'alamo'];
let chosenWord = '';
const keyboard = document.getElementById('keyboard-id');
const word = document.getElementById('word-id');
const startAgain = document.getElementById('try-again-id');
const enter = document.getElementById('enter-id');
const strResult = document.getElementById('str-result-id');
const backspace = document.getElementById('backspace-id');

// global variables & interface
let letters = [...Array(26).keys()].map(n => String.fromCharCode(n + 'A'.charCodeAt(0)));
const numLetters = 5;
const numAttemption = 6;
let counterLetter = 0;
let counterWord = 0;
const arWord = [];

const shakeTemplate = [
    { transform: "rotate(20deg)" },
    { transform: "rotate(-20deg)" },
];
let shake = [];
for (let index = 0; index < 6; index++) {
    shake = shake.concat(shakeTemplate);
}

const shakeTiming = {
    duration: 500,
    iterations: 1,
};

//initializing
function newGame() {
    chosenWord = dict[Math.round(Math.random() * dict.length) - 1].toUpperCase().trim();
    console.log(`chosen word: ${chosenWord}`);
    counterLetter = 0;
    counterWord = 0;
    strResult.innerHTML = '';
    document.querySelectorAll('.word div').forEach(element => {
        element.style.backgroundColor = 'white';
        element.innerHTML = '';
    });
    document.querySelectorAll('.key').forEach(element => {
        element.style.background = '#a8f8e4a1';
    });
    pressKeyAddEventListener();
    backspace.disabled = true;
}

//create keyboard
function fillKeyboard() {
    letters = letters.map(l => generateLetter(l));
    keyboard.innerHTML = letters.join('');
}
//create word
function generateWordTemplate(i) {
    let wordAr = [...Array(numLetters).keys()];
    return `<div class="word word-${i}">
    <label>${i + 1}</label>${wordAr.map(k => `<div id = "letter-${k}" style =""> </div>`).join('')}
    </div>`;
}

function choseLetter(letter) {
    if (counterLetter < numLetters) {
        document.querySelector(`.word-${counterWord} #letter-${counterLetter}`).innerHTML = letter;
        arWord.push(letter);
        counterLetter++;
        if (counterLetter == numLetters) {
            enter.hidden = false;
        }
        strResult.innerHTML = '';
    }
    backspace.disabled = false;
}

function pressKeyAddEventListener() {
    const keys = document.querySelectorAll(`.key`);
    keys.forEach(key => key.addEventListener('click', ()=>choseLetter(key.innerHTML)));
};

function pressKeyRemoveEventListener() {
    const keys = document.querySelectorAll(`.key`);
    keys.forEach(key => key.replaceWith(key.cloneNode(true)));
};

function checkVallidLetters() {
    let word = arWord.join('');
    if (!dict.includes(word.toLowerCase())) {
        document.querySelectorAll(`.word-${counterWord} div`).forEach(element => {
            element.animate(shake, shakeTiming);
        });
        eraseWord();

        strResult.innerHTML = 'No such word exists! Try again';
    } else {
        let res = true;
        for (let i = 0; i < numLetters; i++) {
            let checkRes = checkLetter(i);
            res = res && checkRes;
        }
        if (res) {
            strResult.innerHTML = 'CONGRATULATIONS! YOU WIN!';
            pressKeyRemoveEventListener();
            backspace.disabled = true;
        }
        counterWord++;
    }
}

function checkLetter(i) {
    let res = false;
    if (arWord[i] == chosenWord.charAt(i)) {
        document.querySelector(`.word-${counterWord} #letter-${i}`).style.backgroundColor = 'green';
        document.getElementById(`key-${arWord[i]}`).style.background = 'green';
        res = true;
    } else if (chosenWord.includes(arWord[i])) {
        document.querySelector(`.word-${counterWord} #letter-${i}`).style.backgroundColor = 'gold';
        document.getElementById(`key-${arWord[i]}`).style.background = 'gold';
    } else {
        document.querySelector(`.word-${counterWord} #letter-${i}`).style.backgroundColor = 'gray';
        document.getElementById(`key-${arWord[i]}`).style.background = 'gray';
    }
    return res;
}

function eraseWord() {
    counterLetter = 0;
    for (let i = 0; i < numLetters; i++) {
        choseLetter('');
    }
}

function wordFinished() {
    if (counterWord < numAttemption) {
        checkVallidLetters();
        counterLetter = 0;
        arWord.length = 0;
    } 
    if (counterWord == numAttemption) {
        strResult.innerHTML = 'Sorry! You lose. Try again';
        pressKeyRemoveEventListener();
    }
    enter.hidden = true;
    backspace.disabled = true;
}
function eraseLast(){
    document.querySelector(`.word-${counterWord} #letter-${--counterLetter}`).innerHTML = '';
    if (counterLetter == 0){
        backspace.disabled = true;
    }
}
// start 
enter.hidden = true;
const generateLetter = letter => `<button class="key" id = "key-${letter}">${letter}</button>`;
fillKeyboard();
for (let i = 0; i < numAttemption; i++) {
    word.innerHTML += generateWordTemplate(i);
};
newGame();
enter.addEventListener('click', wordFinished);
startAgain.addEventListener('click', ()=>{
    pressKeyRemoveEventListener();
    newGame();});
backspace.addEventListener('click', eraseLast);