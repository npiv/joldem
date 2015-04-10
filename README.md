******
Joldem
******

A small utility library to parse and tokenize poker ranges in the standard format as
usually seen on twoplustwo.

A range can be represented at 3 levels of accuracy:

* Level 1: The exact holecards in the form AcKc or 9s9h
* Level 2: Combos in the form AKs, AKo, AK or 99
* Level 3: Ranges of combos in the form AQo+ or 22-77

var joldem = require("joldem");

```
joldem.parse("22-77", 2) === ["22", "33", "44", "55", "66", "77"];
joldem.parse("22-77", 1) === ["2c2s", "2c2d", ...., "7c7s", "7c7d"];
```