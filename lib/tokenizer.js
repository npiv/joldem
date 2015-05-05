var model = require("./model");
var util = require("./util");

function formatForOutput(combo) {
    return combo
        .split("")
        .map(function(c) { return /[akqtj]/.test(c) ? c.toUpperCase() : c})
        .join("");
}

/**
 * Grouping AcKc... into AKs leaving rest untouched
 */
function level1To2(comboList) {

    function addOrCreate(obj, combo) {
        var key = combo[0]+""+combo[2];
        if (key in obj) {
            obj[key].push(combo);
        }
        else {
            obj[key] = [combo];
        }
    }

    var suitedCombos = {},
        offsuitCombos = {},
        pairCombos = {},
        endResult = [];

    util.unique(comboList).forEach(function(combo) {
        if (combo.length <= 3 || /[\+-]+/.test(combo)) {
            endResult.push(combo);
        }
        else if (combo[0] == combo[2]) {
            addOrCreate(pairCombos, combo);
        }
        else if (combo[1] == combo[3]) {
            addOrCreate(suitedCombos, combo);
        }
        else {
            addOrCreate(offsuitCombos, combo);
        }
    });

    function addResults(map, expectedCount, postFix) {
        for (var k in map) {
            if (map[k].length == expectedCount) {
                endResult.push(k+postFix);
            }
            else {
                endResult = endResult.concat(map[k]);
            }
        }
    }

    addResults(suitedCombos, 4, "s");
    addResults(offsuitCombos, 12, "o");
    addResults(pairCombos, 6, "");

    return endResult;
}

/**
 * grouping AKs,AKo into AK leaving rest untouched
 */
function level2To3(comboList) {
    var groupedCombos = {},
        endResult = [];

    comboList.forEach(function(combo) {
        if (combo[2] == "s" || combo[2] == "o") {
            var key = combo.slice(0,2);
            if (key in groupedCombos) {
                groupedCombos[key].push(combo);
            }
            else {
                groupedCombos[key] = [combo];
            }
        }
        else {
            endResult.push(combo);
        }
    });

    for (var k in groupedCombos) {
        if (groupedCombos[k].length == 2) {
            endResult.push(k);
        }
        else {
            endResult.push(groupedCombos[k][0]);
        }
    }

    return endResult;
}

/**
 * grouping 22,33,44 into 22-44 leaving rest untouched
 */
function level3To4(comboList) {
    var endResult = [];

    function handleNonPocketChain(chain, result, namingFnc) {
        if (chain.length > 1) {
            result.push(namingFnc(chain[0], chain[chain.length-1]));
        }
        else {
            result.push(chain[0]);
        }
    }

    function group(filterFnc, namingFnc) {
        var found = comboList
            .filter(filterFnc)
            .sort(function(a,b) { return model.ranks.indexOf(b[1]) - model.ranks.indexOf(a[1])});

        if (found.length > 0) {
            var chain = [found[0]];
            for (var i = 1; i < found.length; i++) {
                var indexOfPrevious = model.ranks.indexOf(found[i - 1][1]);
                var indexOfCurrent = model.ranks.indexOf(found[i][1]);
                if (indexOfPrevious - indexOfCurrent == 1) {
                    chain.push(found[i]);
                }
                else {
                    handleNonPocketChain(chain, endResult, namingFnc);
                    chain = [found[i]];
                }
            }
            handleNonPocketChain(chain, endResult, namingFnc);
        }
    }

    group(
        function(c) { return c[0] == c[1]; },
        function(a,b) {
            if (b == "aa") return a+"+";
            else return a + "-" + b;
        }
    );

    function namer(i, postfix) {
        return function(a,b) {
            if (b[1] == model.ranks[ri+1]) return a.slice(0,2)+postfix+"+";
            else return a.slice(0,2) + postfix + "-" + b.slice(0,2) + postfix;
        };
    }

    function allDetector(c) {
        return c[0] == model.ranks[ri] && c[0] != c[1] && c.length == 2;
    }

    function suitedDetector(c) {
        return c[0] == model.ranks[ri] && c[0] != c[1] && c[2] == 's';
    }

    function offSuitDetector(c) {
        return c[0] == model.ranks[ri] && c[0] != c[1] && c[2] == 'o';
    }

    var ri;
    for (ri = 0; ri < model.ranks.length; ri++) {
        group(allDetector,namer(ri, ""));
    }

    for (ri = 0; ri < model.ranks.length; ri++) {
        group(suitedDetector, namer(ri, "s"));
    }

    for (ri = 0; ri < model.ranks.length; ri++) {
        group(offSuitDetector,namer(ri, "o"));
    }

    return endResult.concat(
        comboList.filter(function(combo) { return combo.length == 4 })
    );
}

function tokenize(comboList, level) {
    if (typeof(level)==='undefined') level = 4;
    if (comboList) {
      comboList = comboList.map(function(tok) { return tok.toLowerCase() });
    }

    comboList = level1To2(comboList);
    if (level > 2) {
        comboList = level2To3(comboList);
    }
    if (level > 3) {
        comboList = level3To4(comboList);
    }

    return comboList.map(formatForOutput).join(" ");
}

module.exports = tokenize;
