var valueMap = require('./valueMap');

module.exports = function calculateBet(gameState) {
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  var communityCards = gameState.community_cards;

  var cards = holeCards.concat(communityCards);

  var cardValue = cards.reduce(function (prev, next) {
    return prev + valueMap.CARD[next.rank];
  }, 0);

  var averageCardValue = cardValue / cards.length;

  return averageCardValue > 9 ? gameState.pot : gameState.current_buy_in;
};
