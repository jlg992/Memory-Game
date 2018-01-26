//Keep track of number of matches
let matches = 0;

// Select the ul for the cards
const deck = document.querySelector('.deck');

// Select button for reshuffling and laying out cards
const repeatButton = document.querySelector('.fa-repeat');

/*
 * Create a list that holds all of your cards
 */
const cardValues = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
               "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
               "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
               "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle",
               "fa fa-paper-plane-o", "fa fa-cube"];

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
        let i = document.createElement('i');
        deck.appendChild(li).setAttribute("class", "card");
        li.appendChild(i).setAttribute("class", cardValue);
    }
}

// Clear the cards
function removeCards() {
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
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
   e.target.classList.add('show');
   e.target.classList.add('open');
 }
}

//Display Final score
let p = document.createElement("p");
let modalContent = document.querySelector('.modal-content');
function displayFinalScore() {
   let textNode  = document.createTextNode(`You matched all the cards in ${numMoves} moves.`);
   modal.style.display = "block";
   p.appendChild(textNode);
   modalContent.appendChild(p);
}

//Add cards to list of open cards
let openCardsList = []; //list to hold open cards
function addToList(e) {
 if (e.target.matches("li.card") && (openCardsList.length < 2)) {
   openCardsList.push(e.target);
   //Check for matches
   if (openCardsList.length === 2) {
     if (openCardsList[0].firstChild.getAttribute('class')
        === openCardsList[1].firstChild.getAttribute('class')) {
        openCardsList[0].classList.add('match');
        openCardsList[1].classList.add('match');
        matches++;
        if (matches === 8) {
           stopClock();
           setTimeout(displayFinalScore, 1000);
        }
        incrementMoves();
        emptyCardList();
     }
     else {
       //hide cards that don't match
       setTimeout(function hideCards() {
        openCardsList[0].classList.remove('show');
        openCardsList[0].classList.remove('open');
        openCardsList[1].classList.remove('show');
        openCardsList[1].classList.remove('open');
        incrementMoves();
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

//Record the length of a game
let seconds = 00;
let mseconds = 00;
let minutes = 00;
let appendMseconds = document.getElementById("mseconds")
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let Interval;

function startTimer () {
 mseconds++;

 if(mseconds < 9){
   appendMseconds.innerHTML = "0" + mseconds;
 }

 if (mseconds > 9){
   appendMseconds.innerHTML = mseconds;
 }

 if (mseconds > 99) {
   console.log("seconds");
   seconds++;
   appendSeconds.innerHTML = "0" + seconds;
   mseconds = 0;
   appendMseconds.innerHTML = "0" + 0;
 }

 if (seconds > 9){
   appendSeconds.innerHTML = seconds;
 }

 if (seconds > 59) {
   console.log("minutes");
   minutes++;
   appendMinutes.innerHTML = "0" + minutes;
   seconds = 0;
   appendSeconds.innerHTML = "0" + 0;
 }

}

function startClock() {
   clearInterval(Interval);
   Interval = setInterval(startTimer, 10);
}


function stopClock() {
   clearInterval(Interval);
}


function resetClock() {
   clearInterval(Interval);
  mseconds = "00";
 seconds = "00";
 minutes = "00";
  appendMseconds.innerHTML = mseconds;
 appendSeconds.innerHTML = seconds;
 appendMinutes.innerHTML = minutes;
}

// Get the modal
let modal = document.getElementById('myModal');

//Display number of Moves
let numMovesDisplay = document.querySelector('.moves');
numMoves = 0;
numMovesDisplay.innerText = numMoves;


deck.addEventListener('click', function(e) {
  startClock();
  displaySymbol(e);
  addToList(e);
});

//set up event listener for resetting deck layout
repeatButton.addEventListener('click', function(){
   resetClock();
 emptyCardList();
 matches = 0;
 numMoves = 0;
 numMovesDisplay.innerText = numMoves;
 removeCards();
 layoutCards();
});


layoutCards();
