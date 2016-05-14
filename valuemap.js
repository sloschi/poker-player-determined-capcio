
module.exports = {

    HAND: {
        HIGHCARD: 0.1,
        HASQUEENORHIGHER: 0.15,
        PAIR: 0.2,
        TWO: 0.3,
        THREEOFAKIND: 0.4,
        STRAIGHT: 0.5,
        FLUSH: 0.6,
        FULLHOUSE: 0.7,
        QUADS: 0.75,
        STRAIGHTFLUSH: 0.8,
        ROYALFLUSH: 1,

        FLUSHDRAW: 1,
        STRAIGHTDRAW: 1,
        GUTSHOTSTRAIGHTDRAW: 1
    },

    ROUNDMULTIPLIER: {
        PREFLOP: 4,
        FLOP: 3,
        TURN: 2,
        RIVER: 1
    },

    CARD: {
        2: 1,
        3: 2,
        4: 3,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 9,
        10: 10,
        J: 11,
        Q: 12,
        K: 13,
        A: 14
    }
};