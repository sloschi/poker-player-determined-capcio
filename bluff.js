var TAG = require('./TAG');

module.exports = function bluff(gameState) {
    var playerStats = gameState.players[gameState.in_action];
    console.log(TAG, 'BLUFFF, all in');
    return playerStats.stack;
}