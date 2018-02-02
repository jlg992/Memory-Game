
# Memory Game Project

## How the game works

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

 - The player flips one card over to reveal its underlying symbol.
 - The player then turns over a second card, trying to find the
   corresponding card with the same symbol.
 - If the cards match, both cards stay flipped over.
 - If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

## Scoring

The game displays a star rating (from 1-3) that reflects your performance. At the beginning of a game, it displays 3 stars. After 15 moves, it changes to a 2 star rating. After 25 moves, it changes to a 1 star rating.

## Timing

When the player starts a game, i.e. clicks the first card, the timer starts. Once the player wins the game by matching all cards, the timer stops.

## Notes

 - Starter code provided by [Udacity](https://www.udacity.com/) to assist with HTML, CSS, and shuffle function
