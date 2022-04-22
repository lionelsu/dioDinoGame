const hitbox = document.querySelector('.hitbox');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
        jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
         
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInverval(downInterval);
                    isJumping = false;
                } else {
                position -= 20;
                hitbox.style.bottom = position + 'px';
                }
            }, 20);
        } else {
   
        position += 20;
        hitbox.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cacutus');
    background.appendChild(cactus);
    cactus.style.left = 1000 + 'px';

    let leftTimer = setInterval(() => {
        if (cactusPosition < -60) {

        clearInterval(leftTimer);
        background.removoChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
        
        clearInterval(leftTimer);
        isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>'
        } else {    
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keyup', handleKeyUp);