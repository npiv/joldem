*******************************************************
Joldem: Holdem range parser and tokenizer in Javascript
*******************************************************

Joldem parses and tokenizes ranges in the commonly known formats as you would see in forums or twoplustwo.

## Parsing

```javascript
joldem.parse("22") === ["2h2s", "2h2c", "2h2d", "2s2c", "2s2d", "2c2d"]
joldem.parse("a2s") === ["ah2h", "as2s", "ac2c", "ad2d"]

joldem.parse("aq+") === [
  "ahqh", "asqs", "acqc", "adqd", "ahqs", "ahqc", "ahqd", "asqh", "asqc", "asqd", "acqh", 
  "acqs", "acqd", "adqh", "adqs", "adqc", "ahkh", "asks", "ackc", "adkd", "ahks", "ahkc", 
  "ahkd", "askh", "askc", "askd", "ackh", "acks", "ackd", "adkh", "adks", "adkc"]
```

By default parse will decompose a range into it's lowest parts. But sometimes we may want to keep a range in a higher form. 

Ranges are represented by 3 levels of accuracy:

* Level 1: The exact holecards in the form AcKc or 9s9h
* Level 2: Combos in the form AKs, AKo, AK or 99
* Level 3: Ranges of combos in the form AQo+ or 22-77

When parsing level 1 is the default. But we can override this to keep the range in a higher form.

```javascript
joldem.parse("aq+", 2) === ["aqs", "aqo", "aks", "ako"]
joldem.parse("aq+", 3) === ["aq", "ak"]
```

## Tokenizing

If we want to bring holecards back to a range we tokenize.
```javascript
  joldem.tokenize(["aq", "ak"]) === "AQ+"
  joldem.tokenize(["ajs", "aq", "ak"]) === "AQ+ AJs"
```

Similarly as with parsing the 3 ranges come into effect. The default is to parse into the highest possible form or level 3. But we can override this

```javascript
  joldem.tokenize(["ajs", "aq", "ak"], 2) === "AJs AQ AK"
```

## Installing, Using the library.

### NPM

```
npm install joldem
var joldem = require("joldem");
```

### Webpage

download https://raw.githubusercontent.com/npiv/joldem/master/joldem.min.js
```html
<script src="joldem.js"></script>
```

joldem will then register itself as joldem and can be used in the form joldem.parse, joldem.tokenize
