
//Color Matching game. There are 16 cards (8 pairs of colors)
//Create cards. Add cards to array.
var cardsArray = [
{color: "blue"},
{color: "blue"},
{color: "red"},
{color: "red"},
{color: "green"},
{color: "green"},
{color: "yellow"},
{color: "yellow"},
{color: "purple"},
{color: "purple"},
{color: "orange"},
{color: "orange"},
{color: "pink"},
{color: "pink"},
{color: "grey"},
{color: "grey"},
];

//Create a duplicate of the cardsArray called cardsArrayCopy. Create an empty array to hold the shuffled cards. Pick a random card. Push random card into the shuffled array.
//Remove card from the cardsArrayCopy.
var shuffledArray = [];

var shuffleCards = function() {
	var cardsArrayCopy = cardsArray.slice(0);
		for (i = 0; i < 16; i++) {
			var randomCard = Math.floor(Math.random() * (cardsArrayCopy.length));
			// console.log(randomCard);
			shuffledArray.push(cardsArrayCopy[randomCard]);
			cardsArrayCopy.splice(randomCard, 1);
		}
		console.log(shuffledArray);
	}
shuffleCards();

//New array for cards flipped over.
var cardsTurnedOver = []; 

// //Check for end of game.
var checkGameEnd = function() {
	if (cardsTurnedOver.length === 16) {
		alert("Congratulations! You've matched all the card colors correctly.");
		shuffledArray.length = 0;
		shuffleCards();
		var container = document.getElementById("container");
		document.body.removeChild(container);
		createCards();
	}
}

//Check for matches.
var checkMatch = function() {
	var cardItems = cardsTurnedOver.length;

	if ((cardItems % 2 === 0) && (cardItems !== 0)) {	
		if ((cardsTurnedOver[cardItems - 2].textContent === cardsTurnedOver[cardItems - 1].textContent)) {
			alert(`You've matched the ${(cardsTurnedOver[cardItems - 1].textContent)} cards.`);	
			checkGameEnd();
		} else {
			alert(`Sorry, try again.`);
			//console.log(cardsTurnedOver);
			cardsTurnedOver[cardItems - 2].style.backgroundColor = "#588c7e";
			cardsTurnedOver[cardItems - 2].style.color = "#588c7e";
			cardsTurnedOver[cardItems - 2].addEventListener("click", flipCard);
			cardsTurnedOver[cardItems - 1].style.backgroundColor = "#588c7e";
			cardsTurnedOver[cardItems - 1].style.color = "#588c7e";
			cardsTurnedOver[cardItems - 1].addEventListener("click", flipCard);
			cardsTurnedOver.pop();
			cardsTurnedOver.pop();	
		}
	}
}	

//Flip card over
var flipCard = function(event) {
	var cardSelected = event.target;
	//console.log(cardSelected);
	cardsTurnedOver.push(cardSelected);
	var cardColors = shuffledArray[cardSelected.id].color;
	cardSelected.style.backgroundColor = cardColors;
	cardSelected.style.color = "black";
	cardSelected.removeEventListener("click", flipCard);
	checkMatch();
}

//Create a board of cards to play.
var createCards = function() {
	var div = document.createElement("div");
	var divName = div.setAttribute("id", "container");
	document.body.appendChild(div);

	for (i = 0; i < 16; i++) {
		var card = document.createElement("div");
		card.setAttribute("id", i);
		card.classList.add("card");
		var cardColorName = shuffledArray[i].color;
		card.textContent = cardColorName;
		card.addEventListener("click", flipCard);
		div.appendChild(card);		
	}
}
createCards();













		




















