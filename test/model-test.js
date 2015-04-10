var expect = require("expect.js");
var _ = require("lodash");

describe("The model", function () {
    var model = require("../lib/model");

    it("makes a 52 card deck", function () {
        expect(model.makeDeck().length).to.be(52);
    });

    it("deals random cards", function () {
        for (var i = 0; i < 10; i++) {
            var cards = model.deal(i);
            expect(cards.length).to.be(i);
            expect(_.unique(cards).length).to.be(i);
        }
    });
});