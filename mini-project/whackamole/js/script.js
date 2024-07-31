const getId = id => document.getElementById(id)

const
ground = document.querySelectorAll('.ground'),
mouse = document.querySelectorAll('.mouse'),
scoreBoard = getId('scoreBoard'),
scoreBoard2 = getId('scoreBoard2'),
board = getId('board'),
m1 = getId('m1'),
m2 = getId('m2'),
m3 = getId('m3'),
m4 = getId('m4'),
m5 = getId('m5'),
m6 = getId('m6'),
time = getId('time'),
whiteBoard = getId('whiteBoard'),
playBtn = getId('playBtn'),
textHead = getId('textHead'),
// img = getId('img'),
scoreEnd = getId('scoreEnd'),
preTime = getId('preTime'),
preTimeBoard = getId('preTimeBoard')

let groundBefore;
let endGame;
let score;
let duration;
let preDuration;
let gameTime = 15

function randomGround(ground) {
    let g= Math.floor(Math.random() * ground.length);
    const gRandom = ground[g];
    if (gRandom == groundBefore) {
        randomGround(ground)
    }
    groundBefore = gRandom
    return gRandom
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function mouseShow() {
    const gRandom = randomGround(mouse);
    const tRandom = randomTime(200, 700)
    gRandom.classList.add('mouse-show');

    setTimeout(() => {
        gRandom.classList.remove('mouse-show');
        if (!endGame) {
            mouseShow()
        }
    }, tRandom);
}

function startGame() {
    endGame = false
    score = 0
    duration = gameTime
    preDuration = 3
    scoreBoard.innerText = 0
    
    getId('createdText').classList.add('d-none')
    whiteBoard.classList.add('d-none')
    preTimeBoard.classList.remove('d-none')
    
    time.innerText = duration
    preTime.innerText = preDuration
    preTimer()

    setTimeout(() => {
        countDown()
        mouseShow()
    
        setTimeout(() => {
            endGame = true
        }, gameTime + '000');
    }, 3000);
    
}


function punch() {
    score++
    scoreBoard.innerText = score

    m1.classList.remove('mouse-show')
    m2.classList.remove('mouse-show')
    m3.classList.remove('mouse-show')
    m4.classList.remove('mouse-show')
    m5.classList.remove('mouse-show')
    m6.classList.remove('mouse-show')
}

mouse.forEach(m => {
    m.addEventListener('click', punch)
});

function countDown() {
    duration--
    const td = setInterval(() => {
        time.innerText = duration
        duration--
    }, 1000);
    
    setTimeout(() => {
        clearInterval(td)
        whiteBoard.classList.remove('d-none')

        textHead.classList.add('d-none')
        // img.classList.add('d-none')
        scoreEnd.classList.remove('d-none')

        scoreBoard2.innerText = score
        playBtn.innerText = 'Try Again'
    }, gameTime + '000');
}

function preTimer() {
    setTimeout(() => {
        preTime.style.fontSize = '200px'
    }, 50);
    const pt = setInterval(() => {
        preDuration--
        preTime.innerText = preDuration
        preTime.style.fontSize = '300px'
        setTimeout(() => {
            preTime.style.fontSize = '200px'
        }, 50);
    }, 1000);

    setTimeout(() => {
        clearInterval(pt)
        preTimeBoard.classList.add('d-none')
        setTimeout(() => {
            preTime.style.fontSize = '300px'
        }, 50);
    }, 3000);
}

// tidak bisa klik kanan
// window.addEventListener("contextmenu", function(e){
//     e.preventDefault();
// }, false);
