//Keep track of number of matches
let matches = 0;

// Select the ul for the cards
const deck = document.querySelector(".deck");

// Select button for reshuffling and laying out cards
const repeatButton = document.querySelector(".fa-repeat");

const scorePanel = document.querySelector(".score-panel");

//Selector for ul with the stars
const starsPanel = document.querySelector(".stars");
/*
 * Create a list that holds all of your cards
 */
const cardValues = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
               "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
               "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
               "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
               "fa fa-paper-plane-o", "fa fa-cube"];

let seconds = 0;
let mseconds = 0;
let minutes = 0;
let appendMseconds = document.getElementById("mseconds")
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let Interval;
let openCardsList = []; //list to hold open cards
// Get the modal
let modal = document.getElementById("myModal");

//Display number of Moves
let numMovesDisplay = document.querySelector(".moves");
let numMoves = 0;
numMovesDisplay.innerText = numMoves;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function layoutCards() {
    shuffle(cardValues);
    for (let cardValue of cardValues) {
        let li = document.createElement("li");
        let i = document.createElement("i");
        deck.appendChild(li).setAttribute("class", "card");
        li.appendChild(i).setAttribute("class", cardValue);
    }
}

//Set number of starting current
function resetStars() {
   if (scorePanel.childNodes.length === 7) {
      while (starsPanel.firstChild) {
        starsPanel.removeChild(starsPanel.firstChild);
     }
      let li1 = document.createElement("li");
      let li2 = document.createElement("li");
      let li3 = document.createElement("li");
     starsPanel.appendChild(li1).setAttribute("class", "fa fa-star");
     starsPanel.appendChild(li2).setAttribute("class", "fa fa-star");
     starsPanel.appendChild(li3).setAttribute("class", "fa fa-star");
   }
}

// Clear the cards
function removeCards() {
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
    }
}

//Function to remove stars
function removeStar() {
   starsPanel.removeChild(starsPanel.firstElementChild);
}


//Function to check number of moves
function checkMoveNumber(numberOfMoves) {
   if (numberOfMoves === 16) {
      removeStar();
   }
   else if (numberOfMoves === 26) {
      removeStar();
   }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Display the card's symbol
function displaySymbol(e) {
 if (e.target.matches("li.card") && (openCardsList.length < 2)) {
   e.target.classList.add("show");
   e.target.classList.add("open");
 }
}

//Display Final score
function displayFinalScore() {
   let button = document.createElement("button");
   let modalContent = document.querySelector(".modal-content");
   let timeStamp = document.querySelector(".timer");
   let p1 = document.createElement("p");
   let p2 = document.createElement("p");
   let p3 = document.createElement("p");
   let textNode  = document.createTextNode(`You matched all the cards in ${numMoves} moves.`);
   let textTimeNode  = document.createTextNode(`Time: ${timeStamp.innerText}s`);
   let textStarNode = document.createTextNode("Star Rating:")
   modal.style.display = "block";
   p1.appendChild(textNode);
   p2.appendChild(textTimeNode);
   p3.appendChild(textStarNode);
   let starsPanelClone = starsPanel.cloneNode(true);
   p3.appendChild(starsPanelClone);
   modalContent.appendChild(p1);
   modalContent.appendChild(p2);
   modalContent.appendChild(p3);
   let buttonText = document.createTextNode("Play again?");
   button.appendChild(buttonText);
   modalContent.appendChild(button);
   //event listener for closing modal
   button.addEventListener("click", function(){
      modal.style.display = "none";
      resetGame();
   })
}

//Add cards to list of open cards
function addToList(e) {
 if (e.target.matches("li.card") && (openCardsList.length < 2)) {
   openCardsList.push(e.target);
   //Check for matches
   if (openCardsList.length === 2) {
      if (openCardsList[0] === openCardsList[1]) {
         openCardsList.pop();
         return;
      }
     else if (openCardsList[0].firstChild.getAttribute("class")
        === openCardsList[1].firstChild.getAttribute("class")) {
        openCardsList[0].classList.add("match");
        openCardsList[1].classList.add("match");
        matches++;
        if (matches === 8) {
           stopClock();
           setTimeout(displayFinalScore, 1000);
        }
        incrementMoves();
        checkMoveNumber(numMoves);
        emptyCardList();
     }
     else {
       //hide cards that don't match
       setTimeout(function hideCards() {
        openCardsList[0].classList.remove("show");
        openCardsList[0].classList.remove("open");
        openCardsList[1].classList.remove("show");
        openCardsList[1].classList.remove("open");
        incrementMoves();
        checkMoveNumber(numMoves);
        emptyCardList();
      }, 1000);
     }
   }
 }
}

//Increment number of moves
function incrementMoves() {
   numMoves++;
   numMovesDisplay.innerText = numMoves;
}

//Empty cards list
function emptyCardList() {
   openCardsList = [];
}

//Function to record the length of a game
function startTimer () {
   mseconds++;

   if(mseconds < 9){
      appendMseconds.innerHTML = "0" + mseconds;
   }

   if (mseconds > 9){
      appendMseconds.innerHTML = mseconds;
   }

   if (mseconds > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      mseconds = 0;
      appendMseconds.innerHTML = "0" + 0;
   }

   if (seconds > 9){
      appendSeconds.innerHTML = seconds;
   }

   if (seconds > 59) {
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
   }
}

//function to start the timer
function startClock() {
   clearInterval(Interval);
   Interval = setInterval(startTimer, 10);
}

//function to stop the timer
function stopClock() {
   clearInterval(Interval);
}

//function to reset the timer to 00:00:00
function resetClock() {
   clearInterval(Interval);
   mseconds = "00";
   seconds = "00";
   minutes = "00";
   appendMseconds.innerHTML = mseconds;
   appendSeconds.innerHTML = seconds;
   appendMinutes.innerHTML = minutes;
}
//Clear modal content
function clearModal() {
   let modalContent = document.querySelector(".modal-content");
   while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
    }
}

//function to reset game
function resetGame() {
   resetClock();
   resetStars();
   emptyCardList();
   clearModal();
   matches = 0;
   numMoves = 0;
   numMovesDisplay.innerText = numMoves;
   removeCards();
   layoutCards();
}

//event listener to start the game/timer
deck.addEventListener("click", function(e) {
   startClock();
   displaySymbol(e);
   addToList(e);
});

//set up event listener for resetting deck layout
repeatButton.addEventListener("click", function(){
   resetGame();
});

layoutCards();
