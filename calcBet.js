var TAG = require('./TAG');
var valueMap = require('./valueMap');
var bluff = require('./bluff');
var handEvaluator = require('./handEvaluator');

module.exports = function calculateBet(gameState) {
  console.log(TAG, 'gameState', gameState);
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  console.log(TAG, 'holeCards', holeCards);
  var communityCards = gameState.community_cards;
  console.log(TAG, 'communityCards', communityCards);
  var cards = holeCards.concat(communityCards);
  console.log(TAG, 'cards', cards)
  var cardValue = cards.reduce(function (prev, next) {
    console.log(TAG, 'card', next);
    return prev + valueMap.CARD[next.rank];
  }, 0);

  var averageCardValue = cardValue / cards.length;
  console.log(TAG, 'average card value', averageCardValue);
  var handValue = handEvaluator.evaluate(gameState);
  if(handValue < valueMap.HAND.HASQUEENORHIGHER) {
    if(math.random() < 0.05) {
      return bluff(gameState);
    }
    else {
      return 0;
    }
  }

  return averageCardValue > 9 ? gameState.pot : (averageCardValue < 2 && Math.random(1) < 2) ? bluff(gameState) : gameState.current_buy_in;
};
