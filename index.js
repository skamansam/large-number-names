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
  return result
}

/*
The naming procedure for large numbers is based on taking the number n occurring in
10^(3n+3) (short scale) or 10^6n (long scale) and concatenating Latin roots for its
units, tens, and hundreds place, together with the suffix -illion. In this way,
numbers up to 10^3·999+3 = 10^3000 (short scale) or 10^6·999 = 10^5994 (long scale) may
be named. The choice of roots and the concatenation procedure is that of the
standard dictionary numbers if n is 20 or smaller. For larger n (between 21 and 999),
prefixes can be constructed based on a system described by John Horton Conway and
Richard K. Guy:

  Units	    Tens	            Hundreds
1	Un	      Deci (N)	        Centi (NX)
2	Duo	      Viginti (MS)	    Ducenti (N)
3	Tre*	    Triginta (NS)	    Trecenti (NS)
4	Quattuor	Quadraginta (NS)  Quadringenti (NS)
5	Quinqua   Quinquaginta (NS) Quingenti (NS)
6	Se*	      Sexaginta (N)	    Sescenti (N)
7	Septe*	  Septuaginta (N)	  Septingenti (N)
8	Octo	    Octoginta(MX)	    Octingenti (MX)
9	Nove*	    Nonaginta	        Nongenti
(*) ^ When preceding a component marked S or X, “tre” changes to “tres” and “se”
      to “ses” or “sex”; similarly, when preceding a component marked M or N,
      “septe” and “nove” change to “septem” and “novem” or “septen” and “noven”.
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

  let word = `${tensHundreds}${extraPrefix}`
  return initialCase(word)
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
  return initialCase(`${prefix}${conjoiner}${suffix}`)
}

function initialCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function longScale(n, len) {
  // long scale - Traditional British
  const dict = ['',
    'Thousand', 'Million', 'Thousand million', 'Billion', 'Thousand billion', 'Trillion', 'Thousand trillion',
    'Quadrillion', 'Thousand quadrillion', 'Quintillion', 'Thousand quintillion', 'Sextillion',
    'Thousand sextillion', 'Septillion', 'Thousand septillion', 'Octillion', 'Thousand octillion',
    'Nonillion', 'Thousand nonillion', 'Decillion', 'Thousand decillion', 'Undecillion',
    'Thousand undecillion', 'Duodecillion', 'Thousand duodecillion', 'Tredecillion',
    'Thousand tredecillion', 'Quattuordecillion', 'Thousand quattuordecillion', 'Quindecillion',
    'Thousand quindecillion', 'Sedecillion', 'Thousand sedecillion', 'Septendecillion',
    'Thousand septendecillion', 'Octodecillion', 'Thousand octodecillion', 'Novendecillion',
    'Thousand novendecillion', 'Vigintillion', 'Thousand vigintillion',
    'Thousand quinquavigintillion', 'Thousand trigintillion', 'Thousand quinquatrigintillion',
    'Thousand quadragintillion', 'Thousand quinquaquadragintillion', 'Thousand quinquagintillion',
    'Unquinquagintillion', 'Thousand unquinquagintillion', 'Duoquinquagintillion',
    'Thousand quinquaquinquagintillion', 'Sesquinquagintillion', 'Thousand sexagintillion',
    'Unsexagintillion', 'Thousand quinquasexagintillion', 'Thousand septuagintillion',
    'Thousand quinquaseptuagintillion', 'Thousand octogintillion', 'Thousand quinquaoctogintillion',
    'Thousand nonagintillion', 'Thousand quinquanonagintillion', 'Thousand centillion',
    'Thousand quinquagintacentillion', 'Thousand ducentillion', 'Thousand quinquagintaducentillion',
    'Thousand trecentillion', 'Thousand quinquagintatrecentillion', 'Thousand quadringentillion',
    'Thousand quinquagintaquadringentillion', 'Thousand quingentillion'
  ]
  return dict[n / 3]
}

function longIntlScale(n) {
  // long scale - traditional european
  const dict = ['',
    'Thousand', 'Million', 'Milliard', 'Billion', 'Billiard', 'Trillion', 'Trilliard', 'Quadrillion',
    'Quadrilliard', 'Quintillion', 'Quintilliard', 'Sextillion', 'Sextilliard', 'Septillion',
    'Septilliard', 'Octillion', 'Octilliard', 'Nonillion', 'Nonilliard', 'Decillion',
    'Decilliard', 'Undecillion', 'Undecilliard', 'Duodecillion', 'Duodecilliard', 'Tredecillion',
    'Tredecilliard', 'Quattuordecillion', 'Quattuordecilliard', 'Quindecillion', 'Quindecilliard',
    'Sedecillion', 'Sedecilliard', 'Septendecillion', 'Septendecilliard', 'Octodecillion',
    'Octodecilliard', 'Novendecillion', 'Novendecilliard', 'Vigintillion', 'Vigintilliard',
    'Quinquavigintilliard', 'Trigintilliard', 'Quinquatrigintilliard', 'Quadragintilliard',
    'Quinquaquadragintilliard', 'Quinquagintilliard', 'Unquinquagintillion',
    'Unquinquagintilliard', 'Duoquinquagintillion', 'Quinquaquinquagintilliard',
    'Sesquinquagintillion', 'Sexagintilliard', 'Unsexagintillion', 'Quinquasexagintilliard',
    'Septuagintilliard', 'Quinquaseptuagintilliard', 'Octogintilliard', 'Quinquaoctogintilliard',
    'Nonagintilliard', 'Quinquanonagintilliard', 'Centilliard', 'Quinquagintacentilliard',
    'Ducentilliard', 'Quinquagintaducentilliard', 'Trecentilliard',
    'Quinquagintatrecentilliard', 'Quadringentilliard', 'Quinquagintaquadringentilliard',
    'Quingentilliard'
  ]
  return dict[n / 3]
}
