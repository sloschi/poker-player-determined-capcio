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

  return handValue >= valueMap.LIMITS.FOLD ? gameState.pot : 0;
};
