
//Color Matching game. There are 16 cards (8 pairs of colors). Objective is to match all pairs.

//Create cards. Add cards to array. List colors of cards in this array.
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
//Create am empty array to add shuffled cards.
var shuffledArray = [];

var shuffleCards = function() {
	//created a duplicate array of cardsArray. This array will get emptied out as cards are moved to the shuffledArray.
	var cardsArrayCopy = cardsArray.slice(0);
		//Created a loop to pick a random card from the cardsArrayCopy. Random card from cardsArrayCopy gets added to shuffled array. 
		//The random card then gets removed from the cardsArrayCopy. 
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
		//empty out the shuffledArray so new cards can be added to it.
		shuffledArray.length = 0;
		//Invoke shuffleCards function to shuffle cards.
		shuffleCards();
		//Remove the existing container div (that contains the card divs) in order to recreate the board.
		var container = document.getElementById("container");
		document.body.removeChild(container);
		//Recreate board for a new game. This will match cards with the newly shuffled colors.
		createCards();
	}
}

//Check for matches in the cardsTurnedOver array.
var checkMatch = function() {
	var cardItems = cardsTurnedOver.length;
	//If there are more than 0 cards and if the number of cards can be divided by 2 (i.e. a pair of cards), we can check for a match.
	if ((cardItems % 2 === 0) && (cardItems !== 0)) {	
		//Checks the last card and the card before the last in the array to see if they match.
		if ((cardsTurnedOver[cardItems - 2].textContent === cardsTurnedOver[cardItems - 1].textContent)) {
			alert(`You've matched the ${(cardsTurnedOver[cardItems - 1].textContent)} cards.`);	
			//Run checkGameEnd function to see if game is over.
			checkGameEnd();
		} else {
			document.getElementById("divTwo").style;
			// alert(`Sorry, try again.`);
			//console.log(cardsTurnedOver);
			//If cards don't match, flip the last card and the card before the last in the array (return to original position).
			//Set the card color and font color to the orignal card. Add event listener so card can be clicked again.
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

//Flip card over.
var flipCard = function(event) {
	//save the card just seleveted.
	var cardSelected = event.target;
	//console.log(cardSelected);
	//Add the card just selected to the cardsTurnedOver array.
	cardsTurnedOver.push(cardSelected);
	//Get the color of this card from the color options on the shuffledArray object. Set the card color and change font color
	//to black so the card name (which displays color name) can be seen. Remove the event listener so that this card cannot
	//be clicked again (no inadvertant matches from clicking the same card twice.)
	var cardColors = shuffledArray[cardSelected.id].color;
	cardSelected.style.backgroundColor = cardColors;
	cardSelected.style.color = "black";
	cardSelected.removeEventListener("click", flipCard);
	//Run checkMatch function to see if there are possible matches.
	checkMatch();
}

//Create a board of cards to play.
var createCards = function() {
	//Create a new div- cards container. This will hold the individual card items.
	var div = document.createElement("div");
	var divName = div.setAttribute("id", "container");
	document.body.appendChild(div);
	//Create each card item, set its text and color. Add event listener and append card to the cards container.
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

//Creates 2 button-like items- "Its a match" and "Try again".
var features = function() {
	//Create a features div. This will hold 2 divs that contain the 'Its's a match' and 'No match' features.
	var divFeatures = document.createElement("div");
	//This is the 1st div for the 'It's a match' feature. Para inside the div has the text.
	var divOne = document.createElement("div");
	var paraOne = document.createElement("p");
	divOne.setAttribute("id", "divOne");
	paraOne.textContent = "Yay! It's a match!";
	divOne.appendChild(paraOne);
	divFeatures.appendChild(divOne);
	//This is the 2nd div for the 'No match' feature. Para inside the div has the text.
	var divTwo = document.createElement("div");
	var paraTwo = document.createElement("p");
	divTwo.setAttribute("id", "divTwo");
	paraTwo.textContent = "No match. Please try again."; 
	divTwo.appendChild(paraTwo);
	divFeatures.appendChild(divTwo);
	var divContainer = document.getElementById("container");
	var divFeaturesAdded = document.body.insertBefore(divFeatures, divContainer);
}
features();















		




















