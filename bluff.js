module.exports = function bluff(gameState) {
    var playerStats = gameState.players[gameState.in_action];
    console.log('BLUFFF, all in');
    return playerStats.stack;
}