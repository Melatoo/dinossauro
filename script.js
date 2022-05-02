const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position = 0;
let isJumping = false;
let isGameOver = false;
let score = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
      if (!isJumping) {
        jump();
      }
    }
  }

function jump () {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval (() => {
                if (position <= 0) {
                    clearInterval (downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 30)
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 30)
};

function createCactus () {
    const cactus = document.createElement ('div');
    let cactusPosition = 1000;
    let randomTime = Math.random () * 6000;

    cactus.classList.add ('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval (() => {
        if (cactusPosition < -60) {
            clearInterval (leftInterval)
            background.removeChild (cactus);
            scoreCounter ();
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval (leftInterval);
            document.body.innerHTML = `<h1 class ="game-over">Fim de Jogo</h1> <div class = "score">Pontos: ${score} </div>`
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        } 
    }, 30)

    setTimeout(createCactus, randomTime);
};

function scoreCounter () {
    score ++;
    let x =document.querySelector('.score');
    x.innerText = "Pontos: " + score
};

createCactus ();
document.addEventListener ('keyup', handleKeyUp);