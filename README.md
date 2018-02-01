# large-number-names [![Build Status](https://travis-ci.org/skamansam/large-number-names.svg?branch=master)](https://travis-ci.org/skamansam/large-number-names) [![Coverage Status](https://coveralls.io/repos/github/skamansam/large-number-names/badge.svg?branch=master)](https://coveralls.io/github/skamansam/large-number-names?branch=master)
NPM module for getting names of large numbers

## What?
Did you know that `10e33` (1 with 33 zeroes) is called a `"Decillion"` in the US and UK? Did you also know that it can be called a `"Thousand quintillion"` or  even a `"Quintilliard"` in some langauges? Furthermore, did you know there is a proposal for Greek numbers wherein that same number is called a `"Hendekillion"`? Well, now you can use this handy-dandy little library to find the names of positive integer values!

### Features! 
1. Output using the short scale (US, English Canadian, Australian, and modern British)
2. Output using the long scale (continental Europe, older British, and French Canadian)
3. Output using the proposed Greek scale (Russ Rowlett's scale)
4. Output using the traditional European scale ("-illiard" scale)
5. Output using simplified gaming abbreviations (like 'AA', 'BB', etc)
6. Output using abbreviations/symbols for the previous scales (in development, version 1.4.0+)
7. module inclusion for even tighter js libs! (planned for version 2.0.0)
8. Great tests! This module has over 500 tests to ensure the best accuracy possible. 

## Why?
I am developing a [playground for incremental games](https://skamansam.github.io/tappers-paradise), and I noticed there is a significant lack of libraries that do even a single one of these scales, so I decided to make my code a module so others can enjoy the fruits of my labour!

## How?
Here is the technical bit! As an illustration, I will show you some code. 

```javascript
import * as NumberWord from 'large-number-names'

NumberWord.humanReadable('1e33', NumberWord.SHORT)
// -> 'Decillion'

NumberWord.humanReadable('1e33')
// -> 'Decillion'

NumberWord.humanReadable('1e33', NumberWord.GREEK)
// -> 'Hendekillion'

NumberWord.humanReadable('1e33', NumberWord.LONG)
// -> 'Thousand quintillion'

NumberWord.humanReadable('1e33', NumberWord.INTL)
// -> 'Quintilliard'

NumberWord.humanReadable('1e33', NumberWord.GAME)
// -> 'GG'

Numbers.humanReadable('1e33', (num, len) => {
  if (len >= 26) return 'Z' + myFun(num, len - 26)
  return String.fromCharCode(len + 96)
})
// -> 'Zi'

```

The function `humanReadable()` is the main entry point into the library. It takes two parameters:
1. the large number. This can be a number that JS can understand, up to `1e303`, or a string of any positive number. For more on what this value can be, see the docs for decimal.js, [here](https://www.npmjs.com/package/decimal.js)
2. an integer that corresponds to an output mode. The output modes are exported constants: SHORT, GREEK, LONG, INTL, and GAME. see [#output_modes] for what these mean. This value can also be a function that will be passed in the number and the length of the number, minus one. 

## Output Modes
I have based some of these output modes on the wikipedia article on [names of large numbers](https://en.wikipedia.org/wiki/Names_of_large_numbers), except where noted. I highly recommend reading this article to get a better idea of what is expected.

### SHORT
This is the default mode. It is most commonly used in the US and Britain. It has numbers like Decillion (10^33), Quadrillion (10^15), Quintillion (10^18), and Quinquagintacentillion (10^453).

### LONG
This is also called the Traditional British scale. It is very much like the 
short dictionary, but prefixes "Thousand" to every value as the next triplet word. It contains numbers like Decillion (10^60), Thousand Decillion (10^63).

### GREEK
This is really just a proposed scale, intended as a super simplification using the Greek alphabet instead of the Latin one which all the others use. 
It uses names such as Icosipentillion (10^75), Pentadekillion (10^45), and Hexadekillion (10^48). 

**NOTE**: this implementation is additive past 10^92. This means when the number is over 10^92, it uses Triacontillion as the base. For example,10^153 is "Icosihenillion Triacontillion" and 10^393 is "Icosihenillion Triacontillion Triacontillion Triacontillion." This is to be able to use it for infintely large numbers.

### INTL
This is also called the Traditional European Scale. It is the same as the traditional british (LONG scale), but instead of prefixing "thousand," it adds the suffix "illiard." It contains numbers like Decillion (10^60), Decilliard (10^63)

### GAME
This is not a real large number scale, but is commonly used in games that print the scale for large numbers. It uses the base abbreviations to Trillions, then uses 'AA', 'AB', 'AC', etc. This implementation will continue adding digits as necessary for infinitely large numbers. It is basically base 26 numbering, where A is 0 and Z is 25.
