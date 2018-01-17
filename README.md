# large-number-names [![Build Status](https://travis-ci.org/skamansam/large-number-names.svg?branch=master)](https://travis-ci.org/skamansam/large-number-names) [![Coverage Status](https://coveralls.io/repos/github/skamansam/large-number-names/badge.svg?branch=master)](https://coveralls.io/github/skamansam/large-number-names?branch=master)
NPM module for getting names of large numbers

## What?
Did you know that `10e33` (1 with 33 zeroes) is called a `"Decillion"` in the US and UK? Did you also know that it can be called a `"Thousand quintillion"` or  even a `"Quintilliard"` in some langauges? Furthermore, did you know there is a proposal for Greek numbers wherein that same number is called a `"Hendekillion"`? Well, now you can use this handy-dandy little library to find the names of positive integer values!

### Features! 
1. the short scale (US, English Canadian, Australian, and modern British)
2. the long scale (continental Europe, older British, and French Canadian)
3. the proposed Greek dictionary (Russ Rowlett's scale)
4. the traditional British scale (in development, version 1.3.0)
5. abbreviations/symbols for the previous names (in development, version 1.4.0)
6. simplified gaming abbreviations (like 'AA', 'BB', etc) (in development, version 1.5.0)
7. module inclusion for even tighter js libs! (planned for version 2.0.0)
## Why?
I am developing a [playground for incremental games](https://skamansam.github.io/tappers-paradise), and I noticed there is a significant lack of libraries that do even a single one of these scales, so I decided to make my code a module so others can enjoy the fruits of my labour!

## How?
Here is the technical bit! As an illustration, I will show you some code. 

```javascript
import * as Numbers from 'large-number-names'

Numbers.humanReadable('1e33', SHORT)
// -> 'Decillion'

Numbers.humanReadable('1e33', NEW_GREEK)
// -> 'Hendekillion'

Numbers.humanReadable('1e33', LONG)
// -> 'Thousand quintillion'

Numbers.humanReadable('1e33', INTL)
// -> 'Quintilliard'

Numbers.humanReadable('1e33', GAME)
// -> 'GG'

Numbers.humanReadable('1e33', LONG_ABBR)
// -> 'ThQu'

Numbers.humanReadable('1e33', SHORT_ABBR)
// -> 'Dec'

Numbers.humanReadable('1e36', SHORT_ABBR)
// -> 'Und'

Numbers.humanReadable('1e39', SHORT_ABBR)
// -> 'Dud'

Numbers.humanReadable('1e33', INTL_ABBR)
// -> 'Quint'

function myFun(num, len) {
  if (len >= 24) return 'Z' + myFun(num, len - 24)
  return String.fromCharCode(len + 96)
}
Numbers.humanReadable('1e33', myFun)
// -> 'Zi'

```
