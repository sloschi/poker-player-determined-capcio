var chai = require('chai');
var Promise = require('promise-polyfill');
var player = require('./player');

var showDowngameState = {
    tournament_id: '56fa32da3fe8b10003000003',
    game_id: '5736f51b275a2c00030000a9',
    round: 0,
    players:
    [{
        name: 'Determined Capcio',
        stack: 0,
        status: 'out',
        bet: 0,
        hole_cards: [Object],
        version: 'never surrender',
        id: 0
    },
        {
            name: 'JPoke',
            stack: 0,
            status: 'out',
            bet: 0,
            version: 'Default Java folding player',
            id: 1
        },
        {
            name: 'Agreeable monkey',
            stack: 3000,
            status: 'active',
            bet: 0,
            hole_cards: [Object],
            version: 'Default Java folding player',
            amount_won: 3000,
            id: 2
        },
        {
            name: 'montypython',
            stack: 0,
            status: 'out',
            bet: 0,
            version: 'Default Python folding player',
            id: 3
        }],
    small_blind: 2,
    big_blind: 4,
    orbits: 0,
    dealer: 3,
    community_cards:
    [{ rank: '8', suit: 'spades' },
        { rank: 'J', suit: 'spades' },
        { rank: '3', suit: 'diamonds' },
        { rank: '9', suit: 'clubs' },
        { rank: '5', suit: 'clubs' }],
    current_buy_in: 0,
    pot: 0
}
    ;
var initialGameState = {
    tournament_id: '56fa32da3fe8b10003000003',
    game_id: '5736f5a2275a2c00030000ae',
    round: 0,
    players:
    [{
        name: 'Determined Capcio',
        stack: 996,
        status: 'active',
        bet: 4,
        hole_cards: [Object],
        version: 'never surrender',
        id: 0
    },
        {
            name: 'JPoke',
            stack: 943,
            status: 'active',
            bet: 57,
            version: 'Default Java folding player',
            id: 1
        },
        {
            name: 'Agreeable monkey',
            stack: 0,
            status: 'active',
            bet: 1000,
            version: 'Default Java folding player',
            id: 2
        },
        {
            name: 'montypython',
            stack: 0,
            status: 'out',
            bet: 0,
            version: 'Default Python folding player',
            id: 3
        }],
    small_blind: 2,
    big_blind: 4,
    orbits: 0,
    dealer: 2,
    community_cards: [],
    current_buy_in: 1000,
    pot: 1061,
    in_action: 0,
    minimum_raise: 943,
    bet_index: 5
};

new Promise(function (resolve, reject) {
    chai.should();
    player.bet_request(initialGameState, function (betValue) {
        console.log('bet result', betValue);
        resolve(5);
    })
}).then(function (betValue) {
    betValue.should.equal(5);
});

player.showdown(showDowngameState);
