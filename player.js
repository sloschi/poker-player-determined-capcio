var valueMap = require('./valuemap');

function calculateBet(gameState) {
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  var communityCards = gameState.community_cards;

  var cards = holeCards.concat(communityCards);
  
  var cardValue = cards.reduce(function (prev, next) {
    return prev + valueMap.CARD[next];
  }, 0);

  var averageCardValue = cardValue / cards.length;

  return averageCardValue > 9 ? gameState.pot : gameState.current_buy_in;
}

module.exports = {

  VERSION: "never surrender",

  bet_request: function (game_state, bet) {
    try {
      bet(calculateBet(game_state));
    } catch (error) {
      console.error('error occurred fix it and redeploy, playing random now', error);
      if (Math.random(1) > 0.5) {
        bet(game_state.current_buy_in);
      }
      else {
        bet(0);
      }
    }
  },

  showdown: function (game_state) {

  }
};
