var valueMap = require('./valuemap.js');

module.exports = {
    evaluate: function (gameState) {
        var holeCards = gameState.players[gameState.in_action].hole_cards;
        var communityCards = gameState.community_cards;
        var cards = holeCards.concat(communityCards);
        
        var rankCounts = {};
        
        cards.forEach(function (card) {
           if (rankCounts[card.rank] !== undefined) {
               rankCounts[card.rank]++;
           } else {
               rankCounts[card.rank] = 1;
           }
        });
        
        var suitCounts = {};
        
        cards.forEach(function (card) {
           if (suitCounts[card.suit] !== undefined) {
               suitCounts[card.suit]++;
           } else {
               suitCounts[card.suit] = 1;
           }
        });
        
        // pair evaluation
        var pairCount = 0;
        var hasSet = false;
        var hasQuads = false;
        var isStraight = false;
        var isQueenOrHigher = false;
        
        Object.keys(rankCounts).forEach(function (rankKey) {
            var count = rankCounts[rankKey];
            if (count === 2) {
                pairCount++;
            }
            
            if (count === 3) {
                hasSet = true;
            }
            
            if (count === 4) {
                hasQuads = true;              
            }
        });
        
        if (pairCount === 1 && hasSet) {
            // full house
            return valueMap.HAND.FULLHOUSE;
        }
        
        if (pairCount === 2) {
            // two pair
            return valueMap.HAND.TWO;
        }
        
        if (pairCount === 1) {
            // pair
            return valueMap.HAND.PAIR;
        }
        
        if (hasSet) {
            return valueMap.HAND.THREEOFAKIND;
        }
        
        if (hasQuads) {
            return valueMap.HAND.QUADS;
        }
        
        holeCards.forEach(function (card) {
            if (card.rank === 'Q' || card.rank === 'K' || card.rank === 'A') {
                isQueenOrHigher = true;
            }
        });
        
        if (isQueenOrHigher) {
            return valueMap.HAND.HASQUEENORHIGHER;
        }
        
        return valueMap.HAND.HIGHCARD;
    }
};