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
        
        var isRoyalFlush = false;
        var isStraightFlush = false;
        var isQuads = false;
        var isFullHouse = false;
        var isFlush = false;
        var isStraight = false;
        var isThreeOfAKind = false;
        var isTwoPair = false;
        var isPair = false;
        var isQueenOrHigher = false;
        
        Object.keys(rankCounts).forEach(function (rankKey) {
            var count = rankCounts[rankKey];
            if (count === 2) {
                pairCount++;
            }
            
            if (count === 3) {
                isThreeOfAKind = true;
            }
            
            if (count === 4) {
                isQuads = true;              
            }
        });
        
        isFullHouse = pairCount === 1 && isThreeOfAKind;
        isTwoPair = pairCount === 2;
        isPair = pairCount === 1;
        
        holeCards.forEach(function (card) {
            if (card.rank === 'Q' || card.rank === 'K' || card.rank === 'A') {
                isQueenOrHigher = true;
            }
        });
        
        Object.keys(suitCounts).forEach(function (suitKey) {
            if (suitCounts[suitKey] === 5) {
                isFlush = true;
            }
        });
        
        var orderedCards = cards.map(function (card) {
            return valueMap.CARD[card.rank];
        }).sort(function (a, b) { return a > b; });
        
        var tmpStraight = true;
        orderedCards.reduce(function (prevCard, nextCard) {
            if (tmpStraight) {
                tmpStraight = nextCard === prevCard + 1;          
            }
        }, orderedCards[0]);
        
        isStraight = tmpStraight;
        
        isStraightFlush = isFlush && isStraight;
        
        var handValue = valueMap.HAND.HIGHCARD;
        
        switch (true) {
            case isRoyalFlush:
            case isStraightFlush: handValue = valueMap.HAND.STRAIGHTFLUSH; break;
            case isQuads: handValue = valueMap.HAND.QUADS; break;
            case isFullHouse: handValue = valueMap.HAND.FULLHOUSE; break;
            case isFlush: handValue = valueMap.HAND.FLUSH; break;
            case isStraight: handValue = valueMap.HAND.STRAIGHT; break;
            case isThreeOfAKind: handValue = valueMap.HAND.THREEOFAKIND; break;
            case isTwoPair: handValue = valueMap.HAND.TWO; break;
            case isPair: handValue = valueMap.HAND.PAIR; break;
            case isQueenOrHigher: handValue = valueMap.HAND.HASQUEENORHIGHER; break;
            default:
            break;
        }
        
        return handValue * roundMultiplier;
    }
};