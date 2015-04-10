var expect = require("expect.js");

describe("The tokenizer", function () {
    var tok = require("../lib/tokenizer");

    it("parses from lvl 3to4 correctly", function () {
        var toFrom = {
            "99-JJ": ["99", "tt", "jj"],
            "99+": ["99", "tt", "jj", "qq", "kk", "aa"],
            "AQ+": ["aq", "ak"],
            "AJo-AQo": ["ajo", "aqo"]
        };

        for (var key in toFrom) {
            expect(
                tok(toFrom[key])
            ).to.eql(
                key
            )
        }
    });

    it("parses from lvl 2to3 correctly", function () {
        var toFrom = {
            "99": ["99"],
            "AQ": ["aqs", "aqo"]
        };

        for (var key in toFrom) {
            expect(
                tok(toFrom[key], 3)
            ).to.eql(
                key
            )
        }
    });
});