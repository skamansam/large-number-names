import Decimal from 'decimal.js'
const NumberClass = Decimal

// constants so we can use them in other modules!
export const GREEK_SCALE = 0
export const SHORT_SCALE = 1
export const LONG_SCALE = 2
export const INTL_SCALE = 3
export const GAME_SCALE = 4
export const GREEK_SCALE_ABBR = 5
export const SHORT_SCALE_ABBR = 6
export const LONG_SCALE_ABBR = 7
export const INTL_SCALE_ABBR = 8

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

export const SHORT_SCALE_DICT = {
  ultraLowValues: ['', 'Ten', 'Hundred'],
  lowValues: ['Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion'],
  onesPrefix: ['', 'un', 'duo', 'tre', 'quattuor', 'quinqua', 'se', 'septe', 'octo', 'nove'],
  tensPrefix: ['', 'deci', 'viginti', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta'],
  hundredsPrefix: ['', 'centi', 'ducenti', 'trecenti', 'quadringenti', 'quingenti', 'sescenti', 'septingenti', 'octingenti', 'nongenti'],
}

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

export function customScale(n, scaleFunction) {
  const numberLength = _places(n)
  return scaleFunction(n, numberLength)
}

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
  return capitalize(result)
}

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

  return capitalize(`${tensHundreds}${extraPrefix}`)
}

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

function _initialCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function capitalize(string) {
  let res = []
  string.split(' ').forEach( (s) =>{
    res.push(_initialCase(s))
  })
  if(res.length <= 1)
    return res[0]
  return res.join(' ')
}

// long scale - Traditional British
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

function gameScale(n, len) {
  const lowVal = ['', 'K', 'M', 'B', 'T']
  let triadLength = Math.floor(len / 3)
  if (len < 15) return lowVal[triadLength]
  let val = _toBaseASCII(triadLength - 5 + 26) // start at 'AA'
  return val
}

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