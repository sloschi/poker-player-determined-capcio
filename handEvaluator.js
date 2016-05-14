var valueMap = require('./valuemap.js');
var humanVariation = 1;

module.exports = {
    evaluate: function (gameState) {
        var holeCards = gameState.players[gameState.in_action].hole_cards;
        var communityCards = gameState.community_cards;
        var cards = holeCards.concat(communityCards);
        
        var multiplierMap = {
            2: valueMap.ROUNDMULTIPLIER.PREFLOP,
            5: valueMap.ROUNDMULTIPLIER.FLOP,
            6: valueMap.ROUNDMULTIPLIER.TURN,
            7: valueMap.ROUNDMULTIPLIER.RIVER
        }
        
        var roundMultiplier = multiplierMap[cards.length];
        
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
        
        var handValue = valueMap.HAND.HIGHCARD;
        
        if (pairCount === 1 && hasSet) {
            // full house
            handValue = valueMap.HAND.FULLHOUSE;
        }
        
        if (pairCount === 2) {
            // two pair
            handValue = valueMap.HAND.TWO;
        }
        
        if (pairCount === 1) {
            // pair
            handValue = valueMap.HAND.PAIR;
        }
        
        if (hasSet) {
            handValue = valueMap.HAND.THREEOFAKIND;
        }
        
        if (hasQuads) {
            handValue = valueMap.HAND.QUADS;
        }
        
        holeCards.forEach(function (card) {
            if (card.rank === 'Q' || card.rank === 'K' || card.rank === 'A') {
                isQueenOrHigher = true;
            }
        });
        
        if (isQueenOrHigher) {
            handValue = valueMap.HAND.HASQUEENORHIGHER;
        }
        
        return handValue * roundMultiplier;
    }
};