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

var deal = function(){
	var randomSuit = Math.floor(Math.random()*4+1);
	var randomRank = Math.floor(Math.random()*13+1);
	var newCard = new Card(randomSuit, randomRank);
	return newCard;
};


function Hand(){
	var cardArray = [];
		for(i = 0; i < 2; i++) {
    cardArray[i] = deal();
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
	this.hitMe = function(){
    cardArray.push(deal());
	this.getHand();
};
}

var playAsDealer = function(){
	var dealerHand = new Hand();
	while(dealerHand.score() < 17){
		alert("Dealer has: " + dealerHand.printHand());
		dealerHand.hitMe();
		alert("Now Dealer gets: " + dealerHand.printHand());
	}
		alert("Dealer has: " + dealerHand.printHand());
		return dealerHand;
};

var playAsUser = function(){
	var playerHand = new Hand();
	var decision = confirm("Your hand is "+ playerHand.printHand() + ": Hit OK to hit (take another card) or Cancel to stand");
	while(decision === true){
		playerHand.hitMe();
		decision = confirm("Your hand is "+ playerHand.printHand() + ": Hit OK to hit (take another card) or Cancel to stand");
	}
	alert("Now You have: " + playerHand.printHand());
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
alert("debugging");
playGame();
//playAsDealer();
//playAsUser();

//var myHand = new Hand();
//console.log("score is " + myHand.score());


//console.log("debugging!2");
//myHand.hitMe();

//myHand.printHand();

//myHand.score();

