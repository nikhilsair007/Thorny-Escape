score = 0;
cross = true;

let button1 = document.querySelector(".newGame");
button1.style.display = "none";

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

// setTimeout(() => {
//     audio.play();
// }, 1000);

// document.onkeydown = function (e) {
function onKeyDownHandler(e){
    audio.play();
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38||e.keyCode == 32) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if((dinoX - 112)<=0)
        dino.style.left=0+"px";
        else
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 83 && offsetY < 52) {
        hs= document.querySelector('#highScore');
        hscore=parseInt(hs.innerText.charAt(12));
        if (score > hscore) {
            hs.innerText = hs.innerText.substring(0, 12) + score; 
        }

        dino = document.querySelector('.dino');
        dino.style.left="3.25rem";

        gameOver.innerHTML = "Game Over "
        button1.style.display = "block";
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        document.onkeydown = null;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}


document.onkeydown = onKeyDownHandler;


let restart=document.querySelector(".newGame");
restart.addEventListener("click",()=>{
    score=0;
    gameOver = document.querySelector('.gameOver');
    gameOver.innerHTML = "";
    scoreCont.innerHTML = "Your Score: " + score;
    restart.style.display = "none";
    // aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
    newDur = 5;
    obstacle.style.animationDuration = newDur + 's';
    document.onkeydown = onKeyDownHandler;
    console.log("hello");
    obstacle = document.querySelector('.obstacle');
    obstacle.classList.add('obstacleAni');
});