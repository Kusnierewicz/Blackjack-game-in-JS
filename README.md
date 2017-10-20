# The Codecademy assigment: Build Blackjack Game in JavaScript. You can check my progress [here](http://kusnierewicz.github.io/Blackjack-game-in-JS/)

My first game ever made. It's simple JavaScript game to play in your browser with some stylish graphics now :)).

Challenge can be found [here](https://www.codecademy.com/courses/blackjack-part-1/0/1)

## Game highlights

* Ace as a special card is avalueted as "1" or "11" depending on player cards at Hand. When a player draws an Ace and the score exceeds 21, Ace value changes to 1.
* The Card Deck is generated and then shuffled twice before the start of the game.
* Player can't get any more cards after he reaches "21" or gets passed it.
* There is phase One with Two cards per player. Than player decides what to do, hit or stand.
* Only one card of Dealer is visible in phase One. Then in the end, his Hand is revealed.

## Difference vs original rules

* AI of the dealer is very simple. He is drawing next card if his score is below "17". Even if a player has already lost.

## All this works thanks to materials I used:

* [Cards at Hand visualisation](http://thecodeplayer.com/walkthrough/make-an-accordian-style-slider-in-css3)
* [Fancy Buttons](http://cssdeck.com/labs/fancy-3d-button?utm_source=bypeople)
* [Glowing Title](http://enjoycss.com/gallery/text_effects/39#)

### Blacjack Game overview:

Blackjack, also known as twenty-one, is a comparing card game between usually several players and a dealer, where each player in turn competes against the dealer, but players do not play against each other. It is played with one or more decks of 52 cards, and is the most widely played casino banking game in the world.[1]. The objective of the game is to beat the dealer in one of the following ways:

   1. Get 21 points on the player's first two cards (called a "blackjack" or "natural"), without a dealer blackjack;
   2. Reach a final score higher than the dealer without exceeding 21; or
   3. Let the dealer draw additional cards until their hand exceeds 21.

More info in [Wikipedia](https://en.wikipedia.org/wiki/Blackjack)

## License

\* See [license.txt](https://github.com/Kusnierewicz/Blackjack-game-in-JS/blob/master/LICENSE.txt) for usage details.
