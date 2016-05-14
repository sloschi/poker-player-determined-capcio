
module.exports = {
    
    LIMITS: {
        FOLD: 0.3,
        PLAY: 0.9,
        YOLO: 1
    },

    HAND: {
        HIGHCARD: 0,
        HASQUEENORHIGHER: 0.0875,
        PAIR: 0.125,
        TWO: 0.27,
        THREEOFAKIND: 0.28,
        STRAIGHT: 0.29,
        FLUSH: 0.310,
        FULLHOUSE: 0.311,
        QUADS: 0.312,
        STRAIGHTFLUSH: 0.313,
        ROYALFLUSH: 0.318,

        FLUSHDRAW: 1,
        STRAIGHTDRAW: 1,
        GUTSHOTSTRAIGHTDRAW: 1
    },

    ROUNDMULTIPLIER: {
        PREFLOP: 8,
        FLOP: Math.PI,
        TURN: 3,
        RIVER: 2.7
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