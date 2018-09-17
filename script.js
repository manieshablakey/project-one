//6 card game. Match 6 pairs of colors (16 cards total). 2 players. Randomize card arrangement.(3 by 2 row)
//Player 1- picks one card. flips it over. picks a second card. flips it over. 
//Player 1- if card 1 === card 2, its a match (match alert). Keep cards facing up. Player 1 gets 1 point. Player 1 gets another turn.
//Player 1 - if card 1 !== card 2 , no match (no match alert). Turn cards over. Turn goes to player 2.

//Player 2 = if card 1 === card, its a match (match alert). Keep cards facing up. Player 2 gets 1 point. Player 2 gets another turn.
//Plater 2- if card 1 !== card 2, no match (no match alert). Turn cards over. Turn goes to player 1.

//Game ends when all cards a facing up (matches ==)

//Create cards. Add cards to array.
var cardsArray = [
{color: "blue"},
{color: "blue"},
{color: "red"},
{color: "red"},
];

var turn;
var cardsTurnedOver = []; 

//Flip card over
var flipCard = function(event) {
	var cardSelected = event.target;
	var cardSelectedId = parseInt(event.target.id);
	var cardColors = cardsArray[cardSelectedId].color;
	cardSelected.style.backgroundColor = cardColors;
	cardsTurnedOver.push(cardsArray[cardSelectedId].color);
	//console.log("This is cardsTurnedOVer array: " + cardsTurnedOver);
		if (cardsTurnedOver.length === 2) {
			if (cardsTurnedOver[0] === cardsTurnedOver[1]) {
			alert("You found a match!");
			} else {
			alert("Sorry, try again.")
			}
		}
}

//Create a board of cards to play.
var createCards = function() {
	var div = document.createElement("div");
	var divName = div.setAttribute("id", "container");
	document.body.appendChild(div);
	for (i = 0; i <= 3; i++) {
		var card = document.createElement("div");
		card.setAttribute("id", i);
		card.classList.add("card");
		card.addEventListener("click", flipCard);
		div.appendChild(card);		
	}
}
createCards();



























