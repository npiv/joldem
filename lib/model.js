var util = require("./util");

var model = {
    ranks: ['a','k','q','j','t','9','8','7','6','5','4','3','2'],

    suits: ['h','s','c','d'],

    makeDeck: function() {
        return util.flatten(
            model.ranks.map(function(rank) {
                return model.suits.map(function(suit) { return rank + suit; });
            })
        );
    },

    deal: function(n) {
        return util.shuffle(model.makeDeck()).slice(0,n);
    }
};

module.exports = model;