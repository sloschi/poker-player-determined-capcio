var TAG = require('./TAG');
var valueMap = require('./valuemap');
var bluff = require('./bluff');
var handEvaluator = require('./handEvaluator');

module.exports = function calculateBet(gameState) {
  console.log(TAG.State, 'gameState', gameState);
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  console.log(TAG.Player, 'holeCards', holeCards);
  var communityCards = gameState.community_cards;
  console.log(TAG.State, 'communityCards', communityCards);
  var cards = holeCards.concat(communityCards);
  console.log(TAG.Player, 'cards', cards);
  var cardValue = cards.reduce(function (prev, next) {
    console.log(TAG.Player, 'card', next);
    return prev + valueMap.CARD[next.rank];
  }, 0);

  var averageCardValue = cardValue / cards.length;
  console.log(TAG.Player, 'average card value', averageCardValue);
  var handValue = handEvaluator.evaluate(gameState);
  if (handValue >= valueMap.LIMITS.YOLO) {
    return gameState.players[gameState.in_action].stack;
  }
  else if (handValue >= valueMap.LIMITS.TRIBET) {
    return gameState.current_buy_in + 3 * gameState.minimum_raise; 
  }
  else if(handValue >= valueMap.LIMITS.PLAY) {
    return gameState.current_buy_in + gameState.minimum_raise;
  }
  else if (handValue >= valueMap.LIMITS.MEHPLAY) {
    return gameState.current_buy_in;
  } else if (handValue >= valueMap.LIMITS.FOLD && gameState.current_buy_in < gameState.big_blind * 3) {
    return gameState.current_buy_in;
  } else {
    return 0;
  }
};
