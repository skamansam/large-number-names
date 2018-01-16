// let NumberClass = require('bignumber.js')
// NumberClass.config({ DECIMAL_PLACES: 15, ROUNDING_MODE: BigNumber.ROUND_DOWN })
// let NumberClass = require('decimal.js')
/*
Base -illion (short scale)
Base -illion (long scale)
Value	US, Canada and modern British (short scale)
Traditional British (long scale)
Traditional European (Peletier) (long scale)
SI Symbol
SI Prefix
1	  1	  10^6	  Million	Million	Million	M	Mega-
2	  1	  10^9	  Billion	Thousand million	Milliard	G	Giga-
3	  2	  10^12	  Trillion	Billion	Billion	T	Tera-
4	  2	  10^15	  Quadrillion	Thousand billion	Billiard	P	Peta-
5	  3	  10^18	  Quintillion	Trillion	Trillion	E	Exa-
6	  3	  10^21	  Sextillion	Thousand trillion	Trilliard	Z	Zetta-
7	  4	  10^24	  Septillion	Quadrillion	Quadrillion	Y	Yotta-
8	  4	  10^27	  Octillion	Thousand quadrillion	Quadrilliard
9	  5	  10^30	  Nonillion	Quintillion	Quintillion
10	5	  10^33	  Decillion	Thousand quintillion	Quintilliard
11	6	  10^36	  Undecillion	Sextillion	Sextillion
12	6	  10^39	  Duodecillion	Thousand sextillion	Sextilliard
13	7	  10^42	  Tredecillion	Septillion	Septillion
14	7	  10^45	  Quattuordecillion	Thousand septillion	Septilliard
15	8	  10^48	  Quinquadecillion	Octillion	Octillion
16	8	  10^51	  Sedecillion	Thousand octillion	Octilliard
17	9	  10^54	  Septendecillion	        Nonillion	Nonillion
18	9	  10^57	  Octodecillion	          Thousand nonillion	Nonilliard
19	10	10^60	  Novendecillion	        Decillion	Decillion
20	10	10^63	  Vigintillion	          Thousand decillion	Decilliard
21	11	1066	  Unvigintillion	        Undecillion	Undecillion
22	11	1069	  Duovigintillion	        Thousand undecillion	Undecilliard
23	12	1072	  Tresvigintillion	      Duodecillion	Duodecillion
24	12	1075	  Quattuorvigintillion	  Thousand duodecillion	Duodecilliard
25	13	1078	  Quinquavigintillion	    Tredecillion	Tredecillion
26	13	1081	  Sesvigintillion	        Thousand tredecillion	Tredecilliard
27	14	1084	  Septemvigintillion	Quattuordecillion	Quattuordecillion
28	14	1087	  Octovigintillion	Thousand quattuordecillion	Quattuordecilliard
29	15	1090	  Novemvigintillion	Quindecillion	Quindecillion
30	15	1093	  Trigintillion	Thousand quindecillion	Quindecilliard
31	16	1096	  Untrigintillion	Sedecillion	Sedecillion
32	16	1099	  Duotrigintillion	Thousand sedecillion	Sedecilliard
33	17	10102	  Trestrigintillion	Septendecillion	Septendecillion
34	17	10105	  Quattuortrigintillion	Thousand septendecillion	Septendecilliard
35	18	10108	  Quinquatrigintillion	Octodecillion	Octodecillion
36	18	10111	  Sestrigintillion	Thousand octodecillion	Octodecilliard
37	19	10114	  Septentrigintillion	Novendecillion	Novendecillion
38	19	10117	  Octotrigintillion	Thousand novendecillion	Novendecilliard
39	20	10120	  Noventrigintillion	Vigintillion	Vigintillion
40	20	10123	  Quadragintillion	Thousand vigintillion	Vigintilliard
50	25	10153	  Quinquagintillion	Thousand quinquavigintillion	Quinquavigintilliard
60	30	10183	  Sexagintillion	Thousand trigintillion	Trigintilliard
70	35	10213	  Septuagintillion	Thousand quinquatrigintillion	Quinquatrigintilliard
80	40	10243	  Octogintillion	Thousand quadragintillion	Quadragintilliard
90	45	10273	  Nonagintillion	Thousand quinquaquadragintillion	Quinquaquadragintilliard
100	50	10303	  Centillion	Thousand quinquagintillion	Quinquagintilliard
101	51	10306	  Uncentillion	Unquinquagintillion	Unquinquagintillion
102	51	10309	  Duocentillion	Thousand unquinquagintillion	Unquinquagintilliard
103	52	10312	  Trescentillion	Duoquinquagintillion	Duoquinquagintillion
110	55	10333	  Decicentillion	Thousand quinquaquinquagintillion	Quinquaquinquagintilliard
111	56	10336	  Undecicentillion	Sesquinquagintillion	Sesquinquagintillion
120	60	10363	  Viginticentillion	Thousand sexagintillion	Sexagintilliard
121	61	10366	  Unviginticentillion	Unsexagintillion	Unsexagintillion
130	65	10393	  Trigintacentillion	Thousand quinquasexagintillion	Quinquasexagintilliard
140	70	10423	  Quadragintacentillion	Thousand septuagintillion	Septuagintilliard
150	75	10453	  Quinquagintacentillion	Thousand quinquaseptuagintillion	Quinquaseptuagintilliard
160	80	10483	  Sexagintacentillion	Thousand octogintillion	Octogintilliard
170	85	10513	  Septuagintacentillion	Thousand quinquaoctogintillion	Quinquaoctogintilliard
180	90	10543	  Octogintacentillion	Thousand nonagintillion	Nonagintilliard
190	95	10573	  Nonagintacentillion	Thousand quinquanonagintillion	Quinquanonagintilliard
200	100	10603	  Ducentillion	Thousand centillion	Centilliard
300	150	10903	  Trecentillion	Thousand quinquagintacentillion	Quinquagintacentilliard
400	200	101203  Quadringentillion	Thousand ducentillion	Ducentilliard
500	250	101503  Quingentillion	Thousand quinquagintaducentillion	Quinquagintaducentilliard
600	300	101803 	Sescentillion	Thousand trecentillion	Trecentilliard
700	350	102103 	Septingentillion	Thousand quinquagintatrecentillion	Quinquagintatrecentilliard
800	400	102403	Octingentillion	Thousand quadringentillion	Quadringentilliard
900	450	102703	Nongentillion	  Thousand quinquagintaquadringentillion	Quinquagintaquadringentilliard
1000	500	103003	Millinillion	Thousand quingentillion	Quingentilliard
*/
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
    // console.error('NOT a BigNumber!')
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
