var model = require("./model");
var util = require("./util");

function level4To3(combo) {
    // nothing to do
    if (!/[\+-]+/.test(combo)) {
        return [combo];
    }

    function nonpp(combo) {
        if (combo[2] == "+" || combo[3] == "+") {
            var chunk = combo.split("+")[0];
            var chunkTo = chunk[0] + model.ranks[model.ranks.indexOf(chunk[0]) + 1];
            combo = chunk + "-" + chunkTo;
        }

        var from = combo.split("-")[0];
        var to = combo.split("-")[1];
        var appendage = from.length > 2 ? from[2] : "";

        var combos = [];
        for (var i = model.ranks.indexOf(from[1]); i >= model.ranks.indexOf(to[1]); i--) {
            combos.push(from[0] + "" + model.ranks[i] + appendage);
        }
        return combos;
    }

    function pp(combo) {
        if (combo[2] == "+") {
            combo = combo.slice(0, 2) + "-AA";
        }

        var rankFrom = model.ranks.indexOf(combo[0]);
        var rankTo = model.ranks.indexOf(combo[3]);

        var combos = [];
        for (var i = rankFrom; i >= rankTo; i--) {
            if (i in model.ranks) {
                combos.push(model.ranks[i] + "" + model.ranks[i]);
            }
        }
        return combos;
    }

    if (combo[0] == combo[1]) {
        return pp(combo);
    }
    else {
        return nonpp(combo);
    }
}

function level3To2(combo) {
    if (combo[0] != combo[1] && combo.length == 2) {
        return [combo+"s", combo+"o"];
    }
    else {
        return combo;
    }
}

function level2To1(combo) {
    var i, j;
    var combos = [];
    if (combo.length == 2) {
        for (i = 0; i < model.suits.length; i++) {
            for (j = i+1; j < model.suits.length; j++) {
                combos.push(combo[0] + model.suits[i] + combo[0] + model.suits[j]);
            }
        }
        return combos;
    }

    if (combo.length == 3) {
        if (combo[2] == "s") {
            for (i = 0; i < model.suits.length; i++) {
                combos.push([combo[0], model.suits[i], combo[1], model.suits[i]].join(""));
            }
            return combos;
        }
        else {
            for (i = 0; i < model.suits.length; i++) {
                for (j = 0; j < model.suits.length; j++) {
                    if (i != j) {
                        combos.push([combo[0], model.suits[i], combo[1], model.suits[j]].join(""));
                    }
                }
            }
            return combos;
        }
    }

    return [combo];
}

function cleanRawInput(combo) {
    combo = combo.toLowerCase();

    var c1,c2;
    if (model.suits.indexOf(combo[1]) >= 0) {
        c1 = model.ranks.indexOf(combo[0]);
        c2 = model.ranks.indexOf(combo[2]);
        if (c1 > c2) return combo.slice(2,4) + combo.slice(0,2);
    }
    else {
        c1 = model.ranks.indexOf(combo[0]);
        c2 = model.ranks.indexOf(combo[1]);
        if (c1 > c2) return combo[1] + combo[0] + combo.slice(2);
    }
    return combo;
}

function parse(str, level) {
    if (typeof(level) === 'undefined') level = 1;

    var combos = str.split(/[ ,]+/).map(cleanRawInput);

    combos = util.flatMap(combos, level4To3);

    if (level < 3) {
        combos = util.flatMap(combos, level3To2);
    }

    if (level < 2) {
        combos =  util.flatMap(combos, level2To1);
    }

    return combos;
}

module.exports = parse;