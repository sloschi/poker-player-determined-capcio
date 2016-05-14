var TAG = 'CAPCIO';

var valueMap = require('./valuemap');

function calculateBet(gameState) {
  var holeCards = gameState.players[gameState.in_action].hole_cards;
  var communityCards = gameState.community_cards;

  return 100;
}

module.exports = {
  VERSION: "Default JavaScript folding player",

  bet_request: function (game_state, bet) {
    console.log(TAG, 'got bet request', game_state)
    try {
      bet(calculateBet(game_state));
    } catch (error) {
      console.error(TAG, 'error occurred fix it and redeploy, playing random now', error);
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
