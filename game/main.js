// $('.green').hide().fadeIn('slow');
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userGamePattern = [];
let score = -1;

function nextSequence(){
    score++;
    $('h1').text(`Level: ${score}`);
    let randomNumber = Math.floor(Math.random() * 3);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    clickButton(randomChosenColour);
}

function clickButton (color){
    $(`.${color}`).hide().fadeIn('slow');
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function animatePress(elem){
        $(elem).addClass('pressed');
        let audio = new Audio(`sounds/${elem.id}.mp3`);
        audio.play();
        setTimeout(() => $(elem).removeClass('pressed'), 100);
}

$(window).keydown(function(){
    nextSequence();
});

$('.btn').click(function(){
    animatePress(this);
    userGamePattern.push(this.id);
    checkAnswer();
});

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function checkAnswer(){
    if (userGamePattern.length === gamePattern.length){
        if (isEqual(userGamePattern, gamePattern)) {
            userGamePattern = [];
            setTimeout(() => nextSequence(), 1000);
            console.log("ok");
        } else {
            $('body').addClass('game-over');
            setTimeout(() => $('body').removeClass('game-over'), 200);
            let gameOver = new Audio('sounds/wrong.mp3');
            gameOver.play();
            startOver();
        }
    } 
}

function startOver(){
    $('h1').text(`ЛОХ, ваш счет: ${score}`);
    document.querySelector('h1').classList.add('animate__animated','animate__rubberBand');
    gamePattern = [];
    userGamePattern = [];
    score = -1;
}