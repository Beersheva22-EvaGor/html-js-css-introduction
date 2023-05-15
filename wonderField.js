//variables
const wordElement = document.getElementById('word-id');
const assertLetterElement = document.getElementById('assertLetter');
const inputLetterElement = document.getElementsByClassName('input-letter')[0];
const taskElement = document.getElementsByClassName('task')[0];
const readyToAnswerElement = document.getElementById('readyAnswer');
const result = document.getElementById('result');
const answerBtn = document.getElementById('answer-id');
const restartBtn = document.getElementById('restart-id');

const dict = [  ['Какой российский патриот живет в Италии и свистит вечерами?', 'Соловьев'],
                ['Кто одновременно летал на Луну и пел джаз?', 'Армстронг']  ,
                ['Кто придумал полонез Огинского?', 'Огинский']];

let currentTask ='';
let word='';

let countLettersHints = 0;
//create word
function generateWordTemplate() {
    return `${[...word].map(k => `<input class = "letter" maxlength="1" type="text" value = "${k}"></input>`).join('')}`;
}
result.innerHTML='';
function startGame(){
    
    assertLetterElement.disabled = false;
    countLettersHints = 0;
    currentTask =  dict[Math.floor(Math.random() * dict.length)];
    word =currentTask[1].toUpperCase().trim();
    taskElement.innerHTML = currentTask[0]; 
    wordElement.innerHTML= generateWordTemplate();
    answerBtn.hidden = true;
}

function checkLetter(l){
    if (word.includes(l)){
        document.querySelectorAll('.letter').forEach(element => {
           if (element.value == l){
            element.style.backgroundColor = 'white';
            countLettersHints++;
           } 
        });
    } else{
        result.innerHTML = 'No such letter';
    }
    enoughHints();
}
function enoughHints(){
    if (countLettersHints > Math.floor(word.length *0.3)){
        assertLetterElement.disabled = true;
    }
}
function eraseLetters(){
    result.innerHTML = '';
    answerBtn.hidden = false;
    document.querySelectorAll('.letter').forEach(l => {
        if (l.style.backgroundColor != 'white'){
            l.style.backgroundColor = 'white';
            l.value =''}            
        }
        );
}

function gainInputWord(){
    let res ='';
    document.querySelectorAll('.letter').forEach(l => res +=l.value.toUpperCase());
    return res;
}

//start
startGame();

assertLetterElement.addEventListener('click', ()=>{
    result.innerHTML = '';
    let l = inputLetterElement.value.toUpperCase();
    if (l.length == 1){
        checkLetter(l);
    } else{
        alert('Input letter');
    }
    inputLetterElement.value = '';
})

readyToAnswerElement.addEventListener('click', eraseLetters);

answerBtn.addEventListener('click', ()=>{
    answerBtn.hidden = true;
    let gainWord = gainInputWord();
    if (gainWord == word){
       result.innerHTML = 'Congrats! You win!'
    } else{
        result.innerHTML = 'Ooops! You lose!'
    }
});

document.querySelectorAll('.letter').forEach(l =>{
    l.addEventListener('change', () => l.value = l.value.toUpperCase());
})

restartBtn.addEventListener('click', startGame);