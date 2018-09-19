//16 cards game. Match 8 pais of cards. 1 player. Randomize card arrangement
//Pick a card and flip it over. Pick a second card and flip it over. 
//If cards match, match alert and cards stay up. Player gets one point
//If no match, cardsface down.
//game ends when 8 pairs up or cardsTurnedOver ===16.


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

//New array for cards flipped over.
var cardsTurnedOver = []; 

//Check for end of game.
var checkGameEnd = function() {
	if (cardsTurnedOver.length === 16) {
		alert("Congratulations! You've matched all the card colors correctly.");

		for (i = 0; i < cardsTurnedOver.length; i++) {
			cardsTurnedOver[i].style.backgroundColor = "#588c7e";
			cardsTurnedOver[i].style.color = "#588c7e";
			cardsTurnedOver[i].addEventListener("click", flipCard);
		}
	}
}

//Check for matches.
var checkMatch = function() {
	var cardItems = cardsTurnedOver.length;
	console.log(cardItems);

	if ((cardItems % 2 === 0) && (cardItems !== 0)) {	
		if ((cardsTurnedOver[cardItems - 2].textContent === cardsTurnedOver[cardItems - 1].textContent)) {
			alert(`You've matched the ${(cardsTurnedOver[cardItems - 1].textContent)} cards.`);	
			checkGameEnd();
		} else {
			alert(`Sorry, try again.`);
			console.log(cardsTurnedOver);
			cardsTurnedOver[cardItems - 2].style.backgroundColor = "#588c7e";
			cardsTurnedOver[cardItems - 2].style.color = "#588c7e";
			cardsTurnedOver[cardItems - 2].addEventListener("click", flipCard);
			cardsTurnedOver[cardItems - 1].style.backgroundColor = "#588c7e";
			cardsTurnedOver[cardItems - 1].style.color = "#588c7e";
			cardsTurnedOver[cardItems - 1].addEventListener("click", flipCard);
			cardsTurnedOver.pop();
			cardsTurnedOver.pop();
			console.log(cardsTurnedOver);	
		}
	}
}	

//Flip card over
var flipCard = function(event) {
	var cardSelected = event.target;
	console.log(cardSelected);
	cardsTurnedOver.push(cardSelected);
	var cardColors = cardsArray[cardSelected.id].color;
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

	for (i = 0; i <= 15; i++) {
		var card = document.createElement("div");
		card.setAttribute("id", i);
		card.classList.add("card");
		var cardColorName = cardsArray[i].color
		card.textContent = cardColorName;
		card.addEventListener("click", flipCard);
		div.appendChild(card);		
	}
}
console.log(createCards());





		




















