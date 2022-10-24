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

let cont = 0;
let previousElement = "";

function play(element, id) {
    cont++;
    element.classList.add("clicked");
    const openedCards = document.querySelectorAll(".clicked");
    console.log(openedCards)
	if (openedCards.length !== 0) { //primeira jogada 
        previousElement = id;

	} else {  //segunda jogada
		if (previousElement === id) { 
			element.classList.add("pairFound");
            previousElement.classList.add("pairFound");

            previousElement = "";

            setTimeout(() => {
                openedCards[0].classList.remove('clicked');
                openedCards[1].classList.remove('clicked');
            }, 1000);
		} else {
            previousElement = "";
            setTimeout(() => {
                openedCards[0].classList.remove('clicked');
                openedCards[1].classList.remove('clicked');
            }, 1000);
        }
	}
	if (document.querySelectorAll(".pairFound").length === cardsNum) {
		endGame();
	}
}

function endGame() {
	alert(`Você ganhou em ${cont} jogadas!`);
    let reset = prompt("Você gostaria de reiniciar o jogo? [sim / não]");
    if (reset === "sim"){
        window.location.reload()
    }
}


