$(document).ready(function() {

	$('#reset').click(function() {
    	$('img').remove();
    	$('.score h1').remove();
    });

    // sketcher building and listening for mouse movement
    $('#start').click(function() {
    	$('img').remove();
    	$('.score h1').remove();
        playGame();
    });
});



//Card face finder

function cardFace(suit, figure){
	suits = {1: "clubs", 2: "diamonds", 3: "hearts", 4: "spades"};
	figures = {1: "ace", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "jack", 12: "queen", 13: "king"};

	var c = figures[figure] + "_of_" + suits[suit] + ".svg";

	return c;
}
//Deck_constructor
function deck(){
	this.create = function(){
  	var cardArray = [];
  	var i = 1;
  	var j = 1;
  		for(i = 1; i < 14; i++){
  			for(j = 1; j < 5; j++){
  				//console.log(j, i);
  				cardArray.push(new Card(j, i));
  			}
  		}
  	return shuffle(shuffle(cardArray));
  };
}

//check The Deck Constructor
function deckChecker(){
	var array = new deck();
	var array = array.create();
	for(i = 0; i < 52; i++){
		//console.log(array[i]);
	  console.log(array[i].getNumber() + " of suit "+array[i].getSuit());
	}
}

//function for Deck suffling
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	return a;
}

////////////////////////////////

// Card Constructor
function Card(suit, number){
	var CardSuit = suit;
	var CardNumber = number;
	this.getSuit = function(){
		return CardSuit;
	};
	this.getNumber = function(){
		return CardNumber;
	};
	this.getValue = function(){
    if( number === 1) {
        return 11;
    } else if( number > 9) {
        return 10;
    } else {
    return number;
    }
	};
}

var deal = function(whos){
	var newCard = gameDeck.pop();

	// I would like to automate the correct div selection, but it dosn't work for now.
	//var div_target = "'." + whos + "'";
	//$(div_target).prepend('<img id="theImg" src="cards/' + cardFace(randomSuit, randomRank) + '" />')

	if(whos == "p"){
		$('.players_cards').prepend('<img id="theImg" width="12%" height="12%" src="cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" />');
	} else if(whos == "b") {
		$('.dealers_cards').prepend('<img id="theImg" width="12%" height="12%" src="cards/' + cardFace(newCard.getSuit(), newCard.getNumber()) + '" />');
	}
	return newCard;
};


function Hand(whos){
	var who = whos;
	var cardArray = [];
		for(i = 0; i < 2; i++) {
    cardArray[i] = deal(who);
	}
	this.getHand = function() {
    return cardArray;
	};
	this.score = function(){
		var handSum = 0;
		for(i=0;i<cardArray.length;i++){
		handSum += cardArray[i].getValue();
		//console.log("Card " + (i+1) + " = " + cardArray[i].getValue());
        if(handSum > 21 && (cardArray[0].getNumber() === 1 || cardArray[1].getNumber() === 1 || cardArray[2].getNumber() === 1)){
			if(cardArray[0].getNumber() === 1 && cardArray[1].getNumber() === 1 && cardArray[2].getNumber() === 1){
				handSum -= 30;
			} else if ((cardArray[0].getNumber() === 1 && cardArray[1].getNumber() === 1) || (cardArray[1].getNumber() === 1 && cardArray[2].getNumber() === 1) || (cardArray[0].getNumber() === 1 && cardArray[2].getNumber() === 1)){
					handSum -= 20;
					} else {
					handSum -= 10;
					}
			}
		}

        //console.log("handSum in function is " + handSum);
        return handSum;
	};
	this.printHand = function(){
		var string = "";
		for(i=0;i<cardArray.length;i++){
			string = string + cardArray[i].getNumber() + " of suit "+cardArray[i].getSuit()+", ";
		}
		return string;
	};
	this.hitMe = function(whos){
    cardArray.push(deal(whos));
	this.getHand();
};
}

var playAsDealer = function(){
	var dealerHand = new Hand("b");
	alert("Dealer has: " + dealerHand.printHand() + ". Dealer's score is: " + dealerHand.score());
	while(dealerHand.score() < 17){
		dealerHand.hitMe("b");
		alert("Dealer has dicided to take another card. He now has: " + dealerHand.printHand() + ". Dealer's score is: " + dealerHand.score());
	}
		alert("Dealer has: " + dealerHand.printHand() + ". Dealer's score is: " + dealerHand.score());
		//console.log(dealerHand.printHand());
		$('.dealer .score').prepend("<h1>Dealer's Score: " + dealerHand.score() + "</h1>" );
		return dealerHand;
};

var playAsUser = function(){
	var playerHand = new Hand("p");
	if(playerHand.score() < 21){
		var decision = confirm("Your hand is "+ playerHand.printHand() + ". Your score is: " + playerHand.score() + ": Hit OK to hit (take another card) or Cancel to stand");
	} else {
		var decision = false;
	}
	while(decision === true && playerHand.score() < 21){
		playerHand.hitMe("p");
		if(playerHand.score() < 21){
		decision = confirm("Your hand is "+ playerHand.printHand() + ". Your score is: " + playerHand.score() + ": Hit OK to hit (take another card) or Cancel to stand");
		} else {
			alert("Now You have: " + playerHand.printHand() + ". Your score is: " + playerHand.score());
		}
	}
	if(decision === false){
		alert("Now You have: " + playerHand.printHand() + ". Your score is: " + playerHand.score());
	}
	//alert("Now You have: " + playerHand.printHand() + ". Your score is: " + playerHand.score());
	//console.log(playerHand.printHand());
	//
	$('.player .score').prepend("<h1>Player's Score: " + playerHand.score() + "</h1>" );
	return playerHand;
};

var declareWinner = function(userHand, dealerHand){
	var uS = userHand.score();
	var dS = dealerHand.score();
	if(uS > 21){
      if( dS >21){
		alert("You tied! Your score was " + uS + ", and the dealer score was " + dS);
          return "You tied!";
      }
      else{
		alert("You lose! Your score was " + uS + ", and the dealer score was " + dS);
      return "You lose!";
      }
  }
  else if(dS>21){
	alert("You win! Your score was " + uS + ", and the dealer score was " + dS);
       return "You win!";
 }
  else if(uS>dS){
	alert("You win! Your score was " + uS + ", and the dealer score was " + dS);
      return "You win!";
  }
  else if(uS===dS){
	alert("You tied! Your score was " + uS + ", and the dealer score was " + dS);
      return "You tied!";
  }
  else{
	alert("You lose! Your score was " + uS + ", and the dealer score was " + dS);
      return "You lose!";
  }
 };

var playGame = function(){
	var gdeck = new deck();
	// global variable
	gameDeck = gdeck.create();
	var playerHand = playAsUser();
	var dealerHand = playAsDealer();
	declareWinner(playerHand, dealerHand);
};