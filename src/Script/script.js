window.onload = startGame;

let imgArray = [
	'../src/Images/bobrossparrot.gif',
	'../src/Images/explodyparrot.gif',
	'../src/Images/fiestaparrot.gif',
	'../src/Images/metalparrot.gif',
	'../src/Images/revertitparrot.gif',
	'../src/Images/tripletsparrot.gif',
	'../src/Images/unicornparrot.gif'
];

let gameArea = document.querySelector(".game-area");
let gameCards = [];
let cardsNum = 0;
let cont = 0;
let previousGif = "";
let openedCards = [];
let pairs = [];

let seconds = 0;
let minutes = 0;
let myTimeout = 0;

let time = document.querySelector(".clock");
const clockCount = setInterval(() => {
    seconds++;
    time.innerHTML = `${seconds}s`;
  }, 1000);

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
		gameCards.push(imgArray[i]);
		gameCards.push(imgArray[i]);
	}
    gameCards.sort(shuffle); 
	return gameCards;
}

function shuffle() { 
	return Math.random() - 0.5; 
}

function placeCards() {
	for (let j = 0; j < cardsNum; j++) {
        gameArea.innerHTML += `
        <div id="'${j + 1}'" class="card" onclick="play(this, '${gameCards[j]}')">
            <div class="face hidden"><img src="../src/Images/front.png"></div>
            <div class="face opened"><img src="${gameCards[j]}"></div>
        </div>`;
	}
}

function play(element, id, gifName) {
    cont++;
    element.classList.add("clicked");
    openedCards.push(element);

	if (openedCards.length === 1) { //primeira carta 
        previousGif = gifName;
        prevCardId = id;
	} else {  //segunda carta
		if (gifName === previousGif && id === prevCardId) { 
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



