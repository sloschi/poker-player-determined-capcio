var valueMap = require('./valueMap');
var bluff = require('./bluff');

module.exports = function calculateBet(gameState) {
  console.log('gameState', gameState);
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  console.log('holeCards', holeCards);
  var communityCards = gameState.community_cards;
  console.log('communityCards', communityCards);
  var cards = holeCards.concat(communityCards);
  console.log('cards', cards)
  var cardValue = cards.reduce(function (prev, next) {
    console.log('card', next);
    return prev + valueMap.CARD[next.rank];
  }, 0);

  var averageCardValue = cardValue / cards.length;
  console.log('average card value', averageCardValue);

  return averageCardValue > 9 ? gameState.pot : (averageCardValue < 2 && Math.random(1) < 2) ? bluff(gameState) : gameState.current_buy_in;
};
