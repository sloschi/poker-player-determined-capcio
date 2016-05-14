module.exports = function bluff(gameState) {
    var playerStats = gameState.players[gameState.in_action];
    
    return playerStats.stack;
}