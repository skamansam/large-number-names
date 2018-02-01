import Decimal from 'decimal.js'
let NumberClass = Decimal

/** Constant to let humanReadable() use the greek scale. */
export const GREEK_SCALE = 0

/** Constant to let humanReadable() use the greek scale. */
export const SHORT_SCALE = 1

/** Constant to let humanReadable() use the long english scale. ("thousands") */
export const LONG_SCALE = 2

/** Constant to let humanReadable() use the international scale. (using '-illiard') */
export const INTL_SCALE = 3

/** Constant to let humanReadable() use the game scale. (i.e. 'AA', 'AB', etc) */
export const GAME_SCALE = 4

/** Constant to let humanReadable() use abbreviations for the greek scale.*/
export const GREEK_SCALE_ABBR = 5

/** Constant to let humanReadable() use abbreviaitons for the short scale. */
export const SHORT_SCALE_ABBR = 6

/** Constant to let humanReadable() use abbreviations for the long scale. (using '') */
export const LONG_SCALE_ABBR = 7

/** Constant to let humanReadable() use abbreviations for the international scale. (using '-illiard') */
export const INTL_SCALE_ABBR = 8

/** 
 * This is the scale used to generate the greek scale dictionary values. 
 * This is taken from the Wikipedia page on names of large numbers. https://en.wikipedia.org/wiki/Names_of_large_numbers 
 */
export const GREEK_SCALE_DICT = [
  'Thousand', 'Million', 'Gillion',
  'Tetrillion', 'Pentillion', 'Hexillion',
  'Heptillion', 'Oktillion', 'Ennillion',
  'Dekillion', 'Hendekillion', 'Dodekillion',
  'Trisdekillion', 'Tetradekillion', 'Pentadekillion',
  'Hexadekillion', 'Heptadekillion', 'Oktadekillion',
  'Enneadekillion', 'Icosillion', 'Icosihenillion',
  'Icosidillion', 'Icositrillion', 'Icositetrillion',
  'Icosipentillion', 'Icosihexillion', 'Icosiheptillion',
  'Icosioktillion', 'Icosiennillion', 'Triacontillion'
]

/** 
 * This is the scale used to generate the dictionary values. 
 * This is taken from the Wikipedia page on names of large numbers. https://en.wikipedia.org/wiki/Names_of_large_numbers 
 */
export const SHORT_SCALE_DICT = {
  ultraLowValues: ['', 'Ten', 'Hundred'],
  lowValues: ['Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion'],
  onesPrefix: ['', 'un', 'duo', 'tre', 'quattuor', 'quinqua', 'se', 'septe', 'octo', 'nove'],
  tensPrefix: ['', 'deci', 'viginti', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta'],
  hundredsPrefix: ['', 'centi', 'ducenti', 'trecenti', 'quadringenti', 'quingenti', 'sescenti', 'septingenti', 'octingenti', 'nongenti'],
}

/**
 * The entry point for this library. The number given is automatically converted to the NumberClass given above. This defaults to using the Decimal library.
 * @param {(string|number)} n string or number representing a number. due to limitations in JS, strings are preferred and won't have a limit.
 * @param {(number|function)=SHORT} scale either one of the constants that use a scale in this library, or custom function that trakes a number and length as parameters
 */
export function humanReadable(n, scale = SHORT) {
  let num = new NumberClass(n)
  switch (scale) {
    case GREEK_SCALE:
      return newGreekScale(num, _places(n))
    case SHORT_SCALE:
      return shortScale(num, findShortN(n))
    case LONG_SCALE:
      return customScale(num, longScale)
    case INTL_SCALE:
      return customScale(num, longIntlScale)
    case GAME_SCALE:
      return customScale(num, gameScale)
    default:
      return customScale(num, scale)
  }
}
export default humanReadable

/**
 * Get the number of places in a number. This is used to get the length of the number, minus one.
 * So you can use this to do stuff like `3e${Number._places(`1e3`)}` to get '3e3' or 3000
 * @param {(number|Decimal|string)} n the number to get the number of places for. 
 * @returns {NumberClass} the number of digits in a number, minus 1
 */
export function _places(n) {
  let num = n
  if (!(n instanceof NumberClass)) {
    num = new NumberClass(n)
  }
  if (num < 10) {
    return 0
  }
  return NumberClass.floor(NumberClass.log10(NumberClass.abs(num))).toNumber()
}


/**
 * Run a custom function against the given number. The cusotm function is given two parameters: the number, and the length of the number, minus one.
 * @param {string|number|Decimal} n the number to which to apply the scale
 * @param {function} scaleFunction a function that takes in the parameters n, and the number of digits in the number, minus one.
 * @returns {*} the result of the function
 */
export function customScale(n, scaleFunction) {
  const numberLength = _places(n)
  return scaleFunction(n, numberLength)
}

/**
 * 
 * @param {*} n 
 * @param {*} len 
 */
function newGreekScale(n, len) {
  if (n === undefined || n < 1000) {
    return ''
  }
  const idx = Math.floor(len / 3) - 1
  let result = ''
  if (idx > GREEK_SCALE_DICT.length - 1) {
    const maxNumber = 1e90
    const maxDigits = 90
    let prefix = newGreekScale(n - maxNumber, len - maxDigits)
    result = (prefix !== '' ? prefix + ' ' : '') + GREEK_SCALE_DICT[GREEK_SCALE_DICT.length - 1]
  } else {
    result = GREEK_SCALE_DICT[idx]
  }
  return titleize(result)
}

/**
 * 
 * @param {*} n 
 */
export function findShortN(n) {
  let num = n
  if (!(n instanceof NumberClass)) {
    num = new NumberClass(n)
  }
  if (n < 1.00e6) {
    return 0
  }
  return Math.floor((NumberClass.log(num) - 3) / 3)
}

/**
 * 
 * @param {Decimal} n 
 * @param {Number} len 
 */
function shortScale(n, len) {
  if (len == 1000) return 'Millinillion'
  if (n < 10) return SHORT_SCALE_DICT.ultraLowValues[0]
  if (n < 100) return SHORT_SCALE_DICT.ultraLowValues[1]
  if (n < 1000) return SHORT_SCALE_DICT.ultraLowValues[2]
  if (len <= 10) return SHORT_SCALE_DICT.lowValues[len]
  const triad = len % 1000
  const onesIdx = triad % 10
  const tensIdx = Math.floor(triad / 10) % 10
  const hundredsIdx = Math.floor(triad / 100)
  let extraPrefix = 'illion'
  if (len > 1000) {
    extraPrefix = shortScale(n, Math.floor(len / 1000))
  }
  const onesTens = correctWords(SHORT_SCALE_DICT.onesPrefix[onesIdx], SHORT_SCALE_DICT.tensPrefix[tensIdx])
  let tensHundreds = correctWords(onesTens, SHORT_SCALE_DICT.hundredsPrefix[hundredsIdx])

  const lastLetter = tensHundreds[tensHundreds.length - 1]
  if (lastLetter == 'i' || lastLetter == 'a' || lastLetter == 'o')
    tensHundreds = tensHundreds.slice(0, tensHundreds.length - 1)

  return titleize(`${tensHundreds}${extraPrefix}`)
}

/**
 * 
 * @param {String} prefix 
 * @param {String} suffix 
 */
function correctWords(prefix, suffix) {
  if (suffix == '') return prefix
  if (prefix == '') return suffix

  const treOrSe = prefix == 'se' || prefix == 'tre'
  const lastLetter = prefix[prefix.length - 1]
  if (lastLetter != 'e') return `${prefix}${suffix}`

  const nextLetter = suffix[0]
  let conjoiner = ''

  switch (nextLetter) {
    case 'c':
      if (treOrSe) conjoiner = 's'
      break
    case 'o':
      conjoiner = 'x'
      break
    case 'v':
      conjoiner = treOrSe ? 's' : 'm'
      break
    case 'd':
      if (treOrSe) break
    case 's':
    case 'q':
    case 't':
      conjoiner = treOrSe ? 's' : 'n'
  }
  return `${prefix}${conjoiner}${suffix}`
}

/**
 * Capitalizes the first letter in the string, and lowercases the rest.
 * @param {String} string 
 */
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/** 
 * Capitalize each word in a phrase. The function name, `titleize` is a bit 
 * of a misnomer, as this function does not adhere to any known
 * title schema, such as APA, Chicago, AP, or MLA. This is to keep
 * this method small and fast.
 * This method depends on `capitalize()`
 * @param {string} string the string to titleize
 * @return {string} the titleized string
 */
export function titleize(string) {
  return string.split(' ').map( s => capitalize(s)).join(' ')
}

/** 
 * long scale - Traditional British
 * This scale takes the short scale and adds a thousand to each value above 1e6.
 */
function longScale(n, len) {
  if (len == 1000) return 'Millinillion'
  if (n < 10) return SHORT_SCALE_DICT.ultraLowValues[0]
  if (n < 100) return SHORT_SCALE_DICT.ultraLowValues[1]
  if (n < 1000) return SHORT_SCALE_DICT.ultraLowValues[2]
  if (n < 1e6) return SHORT_SCALE_DICT.lowValues[0]
  let triadLength = Math.floor(len / 3) - 1
  let prefixWord = (triadLength % 2 === 0) ? 'Thousand ' : ''
  return `${prefixWord}${shortScale(n, Math.floor((len) / 6))}`
}

/**
 * Long International Scale. 
 * This scale adds an '-illiard' to every thousands place.
 * @param {Decimal} the number we are working with 
 * @param {Number} len the length of the number. use `#humanReadable` to automatically set this
 */
function longIntlScale(n, len) {
  // long scale - traditional european
  if (len == 1000) return 'Millinillion'
  if (n < 10) return SHORT_SCALE_DICT.ultraLowValues[0]
  if (n < 100) return SHORT_SCALE_DICT.ultraLowValues[1]
  if (n < 1000) return SHORT_SCALE_DICT.ultraLowValues[2]
  if (n < 1e6) return SHORT_SCALE_DICT.lowValues[0]
  let triadLength = Math.floor(len / 3) - 1
  let word = shortScale(n, Math.floor((len) / 6))
  if (triadLength % 2 === 0){
    word = word.replace(/llion$/,'lliard')
  }
  return word
}

/**
 * This is an abbreviation scale commonly used in games. It starts with the 
 * familiar abbreviations through Trillion, then starts using 'AA', 'AB', etc. This 
 * scale can be calculated for numbers larger than any needed. THe _n_ parameter is not even used,
 * so you only need to pass in the length of the number.
 * Uses `#_toBaseAscii()`
 * @param {Decimal} n 
 * @param {Number} len 
 */
function gameScale(n, len) {
  const lowVal = ['', 'K', 'M', 'B', 'T']
  let triadLength = Math.floor(len / 3)
  if (len < 15) return lowVal[triadLength]
  return _toBaseASCII(triadLength - 5 + 26) // start at 'AA'
}

/**
 * Convert a number to its ASCII form. zero is `A`, 25 is `Z', and 26 is 'AA', etc.
 * @param {Number} num the number to convert. 
 * @param {Number} precision if not given, will calculate the precision based on the number. should be in base 26. (This is really the number of places you want.)
 */
export function _toBaseASCII(num, precision){
  if (num <= 25) return String.fromCharCode(65 + num)
  if(precision == undefined || precision == null) {
    precision = Math.floor(Math.log(num) / Math.log(26))
  }
  const dividend = Math.pow(26, precision)
  const digit = Math.floor(num / dividend)
  const nextPlace = num % dividend

  return String.fromCharCode(64 + digit) + _toBaseASCII(nextPlace, precision - 1)
}