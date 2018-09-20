
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
		//Select the 'congrats' feature and add animation to make color change.
		var congrats = document.getElementById("congrats");
		congrats.classList.add("animation-class");
		congratsTimeout();
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
			//Get 'match' feature and add animation to it to make the button change color.	
			var getMatch = document.getElementById("match");
			getMatch.classList.add("animation-class");
			matchTimeout();
			//Run checkGameEnd function to see if game is over.
			checkGameEnd();
		} else {
			//Get 'no match' feature and add animation to it to make button change color.
			var noMatch = document.getElementById("noMatch");
			noMatch.classList.add("animation-class");
			noMatchTimeout();
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
	var divContainer = document.createElement("div");
	divContainer.setAttribute("id", "container");
	//Create each card item, set its text and color. Add event listener and append card to the cards container.
	for (i = 0; i < 16; i++) {
		var card = document.createElement("div");
		card.setAttribute("id", i);
		card.classList.add("card");
		var cardColorName = shuffledArray[i].color;
		card.textContent = cardColorName;
		card.addEventListener("click", flipCard);
		divContainer.appendChild(card);	
		document.body.appendChild(divContainer);	
	}
}
createCards();

//Match alert. This function creates a feature that lights up when cards are matched. 
var matchAlert = function() {
	// Para inside the div has the text.
	var divOne = document.createElement("div");
	var paraOne = document.createElement("p");
	divOne.setAttribute("id", "match");
	paraOne.textContent = "Yay! It's a match!";
	divOne.appendChild(paraOne);
	var divContainer = document.getElementById("container");
	document.body.insertBefore(divOne, divContainer);
}
matchAlert();

//No match. This function creates a features that lights up when cards selected do not match.
var noMatch = function() {
	//Para inside the div has the text.
	var divTwo = document.createElement("div");
	var paraTwo = document.createElement("p");
	divTwo.setAttribute("id", "noMatch");
	paraTwo.textContent = "No match. Please try again."; 
	divTwo.appendChild(paraTwo);
	var divContainer = document.getElementById("container");
	document.body.insertBefore(divTwo, divContainer);
}
noMatch();

//Congratulations. This function creates a features that lights up when all cards on the board have been matched.
var congrats = function() {
	//Para inside the div has the text.
	var divThree = document.createElement("div");
	var spanThree = document.createElement("span");
	spanThree.setAttribute("id", "congrats");
	spanThree.textContent = "Congratulations! Game over.";
	divThree.appendChild(spanThree);
	document.body.appendChild(divThree);
}
congrats();

//If there's a match: create a Set timeout to remove animation from Match feature after 2 secs (animation lasts for 1 secs).
var matchTimeout = function() {
	var matchTimeout = setTimeout(function() {
	var getMatch = document.getElementById("match").classList.remove("animation-class");
	}, 2000);
}

//If no match: create a Set timeout to remove animation from noMatch feature after 2 secs (animation lasts for 1 secs).
var noMatchTimeout = function() {
	var noMatchTimeout = setTimeout(function() {
	var noMatch = document.getElementById("noMatch").classList.remove("animation-class");
	}, 2000);
}

//If no match: create a Set timeout to remove animation from congrats feature after 2 secs (animation lasts for 1 secs).
var congratsTimeout = function() {
	var congratsTimeout = setTimeout(function() {
		var congrats = document.getElementById("congrats").classList.remove("animation-class");
	}, 2000);
}












		




















