
function ownbet(game_state, bet) {
  bet(100);
}

module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    try {
      ownbet(game_state, bet);
    } catch (error) {
      console.error('error occurred fix it and redeploy, playing random now', error);
      if(Math.random(1) > 0.5) {
        bet(game_state.current_buy_in);
      }
      else {
        bet(0);
      }
    }
  },

  showdown: function(game_state) {

  }
  
  
};
