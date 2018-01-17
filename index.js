import {
  Decimal
} from 'decimal.js'
const NumberClass = Decimal

export const NEW_GREEK = 0
export const SHORT = 1
export const LONG = 2
export const INTL = 3

export function humanReadable(n, scale = SHORT) {
  let num = new NumberClass(n)
  switch (scale) {
    case NEW_GREEK:
      return newGreekScale(num, _places(n))
    case SHORT:
      return shortScale(num, findShortN(n))
    case LONG:
      return customScale(num, longScale)
    case INTL:
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
  const strings = [
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
  let result = ''
  if (idx > strings.length - 1) {
    const maxNumber = 1e90
    const maxDigits = 90
    let prefix = newGreekScale(n - maxNumber, len - maxDigits)
    result = (prefix !== '' ? prefix + ' ' : '') + strings[strings.length - 1]
  } else {
    result = strings[idx]
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
  if (n < 10) return ''
  if (n < 100) return 'Ten'
  if (n < 1000) return 'Hundred'
  if (len <= 10) {
    return [
      'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion',
      'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion'
    ][len]
  }
  const onesPrefix = ['', 'un', 'duo', 'tre', 'quattuor', 'quinqua', 'se', 'septe', 'octo', 'nove']
  const tensPrefix = ['', 'deci', 'viginti', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta']
  const hundredsPrefix = ['', 'centi', 'ducenti', 'trecenti', 'quadringenti', 'quingenti', 'sescenti', 'septingenti', 'octingenti', 'nongenti']
  const triad = len % 1000
  const onesIdx = triad % 10
  const tensIdx = Math.floor(triad / 10) % 10
  const hundredsIdx = Math.floor(triad / 100)
  let extraPrefix = 'illion'
  if (len > 1000) {
    extraPrefix = shortScale(n, Math.floor(len / 1000))
  }
  const onesTens = correctWords(onesPrefix[onesIdx], tensPrefix[tensIdx])
  let tensHundreds = correctWords(onesTens, hundredsPrefix[hundredsIdx])

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

function oldshortScale(n, len) {
  // NOTE: 10^y = longNum ; y = log(longNum)
  //       10^(3n+3) = longNum
  //       3n+3 = log(longNum)
  //       3n = log(longNum) - 3
  //       n = (log(longNum) - 3) / 3
  if (n === undefined || n < 1e3) {
    return ''
  }
  // const maxNumber = 1e93 - 1
  // const maxDigits = 92
  const idx = Math.floor(len / 3)
  // short scale - US, Canada, Modern British
  const lowerNumbers = ['',
    'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion',
    'Sextillion', 'Septillion', 'Octillion', 'Nonillion', 'Decillion', 'Undecillion',
    'Duodecillion', 'Tredecillion', 'Quattuordecillion', 'Quinquadecillion',
    'Sedecillion', 'Septendecillion', 'Octodecillion', 'Novendecillion', 'Vigintillion',
    'Unvigintillion', 'Duovigintillion', 'Tresvigintillion', 'Quattuorvigintillion',
    'Quinquavigintillion', 'Sesvigintillion', 'Septemvigintillion', 'Octovigintillion',
    'Novemvigintillion'
  ]
  let result = lowerNumbers[idx]
  if (result === undefined) {
    let newLen = len - 93
    let triplets = newLen / 3
    const calcSuffixes = ['Trigintillion', 'Quadragintillion', 'Quinquagintillion', 'Sexagintillion',
      'Septuagintillion', 'Octogintillion', 'Nonagintillion', 'Centillion',
      'Decicentillion', 'Viginticentillion',
      'Trigintacentillion', 'Quadragintacentillion', 'Quinquagintacentillion',
      'Sexagintacentillion', 'Septuagintacentillion', 'Octogintacentillion',
      'Nonagintacentillion', 'Ducentillion', 'Trecentillion', 'Quadringentillion',
      'Quingentillion', 'Sescentillion', 'Septingentillion', 'Octingentillion',
      'Nongentillion', 'Millinillion'
    ]
    // console.log(len, newLen, triplets, triplets % 10, Math.floor(triplets / 10))
    // let prefix = calcPrefixes[triplets % 10]
    let suffixIdx = Math.floor(triplets / 10)
    let prefix = _calcShortScalePrefix(n, len, len)
    let suffix = calcSuffixes[suffixIdx]
    result = `${prefix}${suffix}`
  }
  result = result.toLowerCase()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  return result
}

function _calcShortScalePrefix(n, len, suffixLen) {
  const calcPrefixes = ['', 'Un', 'duo', 'tres', 'quattuor', 'quinqua', 'ses', 'septen', 'octo', 'noven']
  const triplets = len / 3
  const idx = triplets % 10 // new suffix ecery 30 places
  let prefix = calcPrefixes[idx]
  if (len - 30 > suffixLen) {
    prefix = prefix + _calcShortScalePrefix(n, len - 30, suffixLen)
  }
  return prefix
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
