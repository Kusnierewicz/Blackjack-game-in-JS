$(document).ready(function() {

	$('#reset').click(function() {
    	$('img').remove();
    });

    // sketcher building and listening for mouse movement
    $('#start').click(function() {
    	$('img').remove();
        playGame();
    });
});



//Card face finder

function CardFace(suit, figure){
	suits = {1: "clubs", 2: "diamonds", 3: "hearts", 4: "spades"};
	figures = {1: "ace", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "jack", 12: "queen", 13: "king"};

	var link = figures[figure] + "_of_" + suits[suit] + ".svg";

	return link;
}
//Deck_upgrade_dosn't work properly yet
function Deck(){
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

////////////////////////////////
//Deck Constructor Basic
function deck_basic(){
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
}

//check The Deck Basic Constructor
//for(i = 0; i < 52; i++){
//  console.log(array[i].getNumber() + " of suit "+array[i].getSuit());
//}

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
	var randomSuit = Math.floor(Math.random()*4+1);
	var randomRank = Math.floor(Math.random()*13+1);
	var newCard = new Card(randomSuit, randomRank);

	// I would like to automate the correct div selection, but it dosn't work for now.
	//var div_target = "'." + whos + "'";
	//$(div_target).prepend('<img id="theImg" src="cards/' + CardFace(randomSuit, randomRank) + '" />')

	if(whos == "p"){
		$('.players_cards').prepend('<img id="theImg" width="50%" height="50%" src="cards/' + CardFace(randomSuit, randomRank) + '" />');
	} else if(whos == "b") {
		$('.brokers_cards').prepend('<img id="theImg" width="50%" height="50%" src="cards/' + CardFace(randomSuit, randomRank) + '" />');
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
	while(dealerHand.score() < 17){
		alert("Dealer has: " + dealerHand.printHand());
		dealerHand.hitMe("b");
		alert("Now Dealer gets: " + dealerHand.printHand());
	}
		alert("Dealer has: " + dealerHand.printHand());
		console.log(dealerHand.printHand());
		return dealerHand;
};

var playAsUser = function(){
	var playerHand = new Hand("p");
	var decision = confirm("Your hand is "+ playerHand.printHand() + ": Hit OK to hit (take another card) or Cancel to stand");
	while(decision === true){
		playerHand.hitMe("p");
		decision = confirm("Your hand is "+ playerHand.printHand() + ": Hit OK to hit (take another card) or Cancel to stand");
	}
	alert("Now You have: " + playerHand.printHand());
	console.log(playerHand.printHand());
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
	var playerHand = playAsUser();
	var dealerHand = playAsDealer();
	declareWinner(playerHand, dealerHand);
};

//console.log("debugging!");
//alert("debugging");
//playGame();
//playAsDealer();
//playAsUser();

//var myHand = new Hand();
//console.log("score is " + myHand.score());


//console.log("debugging!2");
//myHand.hitMe();

//myHand.printHand();

//myHand.score();
