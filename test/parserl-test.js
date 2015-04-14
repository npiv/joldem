var expect = require("expect.js");

describe("The parser", function () {
    var parse = require("../lib/parser");
    var tokenize = require("../lib/tokenizer");
    
    it("doesn't parse empty", function() {
        expect(parse("").length).to.eql(0)
    });

    it("parses from lvl 4to3 correctly", function () {
        var fromTo = {
            "99-JJ": ["99", "tt", "jj"],
            "99+": ["99", "tt", "jj", "qq", "kk", "aa"],
            "AQ+": ["aq", "ak"],
            "AJo-AQo": ["ajo", "aqo"]
        };

        for (var key in fromTo) {
            expect(
                parse(key, 3)
            ).to.eql(
                fromTo[key]
            )
        }
    });

    it("parses from lvl 3to2 correctly", function () {
        var fromTo = {
            "99": ["99"],
            "AQ": ["aqs", "aqo"]
        };

        for (var key in fromTo) {
            expect(
                parse(key, 2)
            ).to.eql(
                fromTo[key]
            )
        }
    });

    it("parses from lvl 2to1 correctly", function () {
        var fromTo = {
            "99": 6,
            "aqs": 4,
            "aqo": 12
        };

        for (var key in fromTo) {
            expect(parse(key, 1).length).to.be(fromTo[key]);
            expect(tokenize(parse(key, 1)).slice(0,2)).to.eql(key.slice(0,2).toUpperCase());
        }
    });

});
