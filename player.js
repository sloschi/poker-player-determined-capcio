
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    bet(calculateBet(game_state.players[game_state.in_action].hole_cards, game_state.community_cards));
  },

  showdown: function(game_state) {

  },
  
  calculateBet: function (ownCards, communityCards) {
    return 100;
  }
};
