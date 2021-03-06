var TAG = require('./TAG');

var calculateBet = require('./calcBet');

module.exports = {
  VERSION: "never surrender",

  bet_request: function (game_state, bet) {
    console.log(TAG.State, 'got bet request');
    try {
      bet(calculateBet(game_state));
    } catch (error) {
      console.error(TAG.Error, 'error occurred fix it and redeploy, playing random now', error);
      if (Math.random(1) > 0.5) {
        bet(game_state.current_buy_in);
      }
      else {
        bet(0);
      }
    }
  },

  showdown: function (game_state) {
    console.log(TAG.State, 'showdown');
  }
};
