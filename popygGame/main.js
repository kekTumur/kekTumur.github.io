
// $('.green').hide().fadeIn('slow');

// if (innerWidth <= 980){
//     $('h1').text("click here");
// }

// function nextSequence(){
//     score++;
//     $('h1').text(`Level: ${score}`);
//     let randomNumber = Math.floor(Math.random() * 3);
//     let randomChosenColour = buttonColors[randomNumber];
//     gamePattern.push(randomChosenColour);
//     clickButton(randomChosenColour);
// }

// function clickButton (color){
//     $(`.${color}`).hide().fadeIn('slow');
//     let audio = new Audio(`sounds/${color}.mp3`);
//     audio.play();
// }

// function animatePress(elem){
//         $(elem).addClass('pressed');
//         let audio = new Audio(`sounds/${elem.id}.mp3`);
//         audio.play();
//         setTimeout(() => $(elem).removeClass('pressed'), 100);
// }

// $(window).keydown(function(){
//     nextSequence();
// });

// $('.btn').click(function(){
//     animatePress(this);
//     userGamePattern.push(this.id);
//     checkAnswer();
// });

// const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// function checkAnswer(){
//     if (userGamePattern.length === gamePattern.length){
//         if (isEqual(userGamePattern, gamePattern)) {
//             userGamePattern = [];
//             setTimeout(() => nextSequence(), 1000);
//             console.log("ok");
//         } else {
//             $('body').addClass('game-over');
//             setTimeout(() => $('body').removeClass('game-over'), 200);
//             let gameOver = new Audio('sounds/wrong.mp3');
//             gameOver.play();
//             startOver();
//         }
//     } 
// }

// function startOver(){
//     $('h1').text(`ЛОХ, ваш счет: ${score}`);
//     document.querySelector('h1').classList.add('animate__animated','animate__rubberBand');
//     gamePattern = [];
//     userGamePattern = [];
//     score = -1;
// }

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelector(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('.modal');

        trigger.addEventListener('click', e => {
            if (e.target) e.preventDefault();
            windows.forEach(item => {
                item.style.display = 'none';
                item.classList.add('animate__animated', 'animate__fadeIn');
            });
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    bindModal('.btn-continue', '[data-modal-end]', '[data-close]');
};


const engine = () => {
    const buttonColors = ["red", "blue", "green", "yellow"],
          title = document.querySelector('h1'),
          startBtn = document.querySelector('[data-close]'),
          wrapper = document.querySelector('.wrapper'),
          body = document.querySelector('body'),
          delay = 1000;
          
    const isEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);

    let gamePattern = [],
        userGamePattern = [],
        score = -1;
    
    function nextSequence() {
        score++;
        title.textContent = `SCORE: ${score}`;
        let randomNumber = Math.floor(Math.random() * 3),
            randomChosenColour = buttonColors[randomNumber];
        gamePattern.push(randomChosenColour);
        playSound(randomChosenColour);
        animateBtn(randomChosenColour);
    }

    function playSound(color) {
        new Audio(`sounds/${color}.mp3`).play();
    }

    function animateBtn(color) {
        const element = document.querySelector(`.${color}`);
        if (element.classList.contains('animate__animated','animate__bounceIn')) {
            element.classList.remove('animate__animated', 'animate__bounceIn');
        } else {
            element.classList.add('animate__animated', 'animate__bounceIn');
        }
        setTimeout(() => element.classList.remove('animate__animated', 'animate__bounceIn'),200);
    }

    function pressButtonAnimation(element) {
        element.classList.add('pressed');
        playSound(element.id);
        setTimeout(() => element.classList.remove('pressed'), 130);
    }

    function checkAnswer() {
        if (userGamePattern.length === gamePattern.length){
            if (isEqual(userGamePattern, gamePattern)) {
                wrapper.removeEventListener('click', listener, false);
                userGamePattern = [];
                setTimeout(() => {
                    wrapper.addEventListener('click', listener, false);
                    nextSequence();
                }, delay);
                console.log("ok");
            } else {
                gameOver();
                setTimeout(() => {
                    title.classList.remove('animate__animated', 'animate__bounceInDown');
                    nextSequence();
                }, delay * 3);
                
            }
        }
    }

    function gameOver() {
        body.classList.add('game-over');
        title.classList.add('animate__animated', 'animate__bounceInDown');
        title.textContent = 'GAME OVER, SCORE: ' + score;
        setTimeout(() => body.classList.remove('game-over'), 200);
        playSound('wrong');
        userGamePattern = [];
        gamePattern = [];
        score = -1;
    }

    function userInput() {
        wrapper.addEventListener('click', listener, false);
    }

    function listener(event) {
        const target = event.target;
        if (target && target.classList.contains('button')) {
            pressButtonAnimation(target);
            userGamePattern.push(target.id);
            checkAnswer();
        }
    }

    function startGame() {
        startBtn.addEventListener('click', () => {
            setTimeout(() => nextSequence(), delay);
        });
    }
    userInput();
    startGame();
};

engine();
modals();