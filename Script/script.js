window.onload = startGame;

let imgArray = [
	'Images/bobrossparrot.gif',
	'Images/explodyparrot.gif',
	'Images/fiestaparrot.gif',
	'Images/metalparrot.gif',
	'Images/revertitparrot.gif',
	'Images/tripletsparrot.gif',
	'Images/unicornparrot.gif'
];

let seconds = 0;
let minutes = 0;

let usedCards = [];
let cardsNum = 0;

function startGame(){
	cardsNum = Number(prompt('Com quantas cartas quer jogar? Insira um número par de 4 a 14.'));
    if (cardsNum % 2 !== 0 || cardsNum > 14 || cardsNum < 4) {
        return startGame();
	}
	setCards();
	placeCards();   
}

function setCards() {
    for (let i = 0; i < cardsNum/2; i++) {
		usedCards.push(imgArray[i]);
		usedCards.push(imgArray[i]);
	}
    usedCards.sort(shuffle); 
	return usedCards;
}

function shuffle() { 
	return Math.random() - 0.5; 
}

let gameArea = document.querySelector(".game-area");

function placeCards() {
	for (let j = 0; j < cardsNum; j++) {
        gameArea.innerHTML += `
        <div class="card" onclick="play(this, '${usedCards[j]}' )">
            <div class="face hidden"><img src="Images/front.png"></div>
            <div class="face opened"><img src="${usedCards[j]}"></div>
        </div>`;
	}
    
}

let time = document.querySelector(".clock");
const clockCount = setInterval(() => {
    seconds++;
    time.innerHTML = `${seconds}s`;
  }, 1000);

let cont = 0;
let previousGif = "";
let openedCards = [];
let pairs = [];
let myTimeout = 0;

function play(element, gifName) {
    cont++;
    element.classList.add("clicked");
    openedCards.push(element);

	if (openedCards.length === 1) { //primeira jogada 
        previousGif = gifName;
	} else {  //segunda jogada
		if (gifName === previousGif) { 
            openedCards[1].classList.add("pairFound");
            openedCards[0].classList.add("pairFound");
            pairs.push(openedCards[1]);
            pairs.push(openedCards[0]);
            openedCards = [];
		} else {
            myTimeout = setTimeout(() => {
            openedCards[1].classList.remove("clicked");
            openedCards[0].classList.remove("clicked");
            openedCards = [];
          }, 1000);
        }
	}
	if (pairs.length === cardsNum) {
        clearInterval(clockCount);
        clearTimeout(myTimeout);
		endGame();
	}
}

function endGame() {
	alert(`Você ganhou em ${cont} jogadas em ${seconds} segundos!`);
    
    let reset = prompt("Você gostaria de reiniciar o jogo?");
    if (reset === "sim"){
        window.location.reload()
    }
}



