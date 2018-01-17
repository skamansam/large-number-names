import * as Numbers from '../index.js'

//import [expect] as expect from 'chai'
var expect = require('chai').expect; 
describe('numbers.js', () => {
  let tests = [
    // ShortScaleIndex, LongScaleIndex, Exponent,
    //           ShortName,               LongName,               IntlName,       GreekName,    Abbr, SciPrefix
    [0, 0, 1, 'Ten', 'Ten', 'Ten', '', ''],
    [0, 0, 2, 'Hundred', 'Hundred', 'Hundred', '', ''],
    [0, 0, 3, 'Thousand', 'Thousand', 'Thousand', 'Thousand', 'K', 'Kilo'],
    [1, 1, 6, 'Million', 'Million', 'Million', 'Million', 'M', 'Mega'],
    [2, 1, 9, 'Billion', 'Thousand million', 'Milliard', 'Gillion', 'G', 'Giga'],
    [3, 2, 12, 'Trillion', 'Billion', 'Billion', 'Tetrillion', 'T', 'Tera'],
    [4, 2, 15, 'Quadrillion', 'Thousand billion', 'Billiard', 'Pentillion', 'P', 'Peta'],
    [5, 3, 18, 'Quintillion', 'Trillion', 'Trillion', 'Hexillion', 'E', 'Exa'],
    [6, 3, 21, 'Sextillion', 'Thousand trillion', 'Trilliard', 'Heptillion', 'Z', 'Zetta'],
    [7, 4, 24, 'Septillion', 'Quadrillion', 'Quadrillion', 'Oktillion', 'Y', 'Yotta'],
    [8, 4, 27, 'Octillion', 'Thousand quadrillion', 'Quadrilliard', 'Ennillion',],
    [9, 5, 30, 'Nonillion', 'Quintillion', 'Quintillion', 'Dekillion'],
    [10, 5, 33, 'Decillion', 'Thousand quintillion', 'Quintilliard', 'Hendekillion'],
    [11, 6, 36, 'Undecillion', 'Sextillion', 'Sextillion', 'Dodekillion'],
    [12, 6, 39, 'Duodecillion', 'Thousand sextillion', 'Sextilliard', 'Trisdekillion'],
    [13, 7, 42, 'Tredecillion', 'Septillion', 'Septillion', 'Tetradekillion'],
    [14, 7, 45, 'Quattuordecillion', 'Thousand septillion', 'Septilliard', 'Pentadekillion'],
    [15, 8, 48, 'Quinquadecillion', 'Octillion', 'Octillion', 'Hexadekillion'],
    [16, 8, 51, 'Sedecillion', 'Thousand octillion', 'Octilliard', 'Heptadekillion'],
    [17, 9, 54, 'Septendecillion', 'Nonillion', 'Nonillion', 'Oktadekillion'],
    [18, 9, 57, 'Octodecillion', 'Thousand nonillion', 'Nonilliard', 'Enneadekillion'],
    [19, 10, 60, 'Novendecillion', 'Decillion', 'Decillion', 'Icosillion'],
    [20, 10, 63, 'Vigintillion', 'Thousand decillion', 'Decilliard', 'Icosihenillion'],
    [21, 11, 66, 'Unvigintillion', 'Undecillion', 'Undecillion', 'Icosidillion'],
    [22, 11, 69, 'Duovigintillion', 'Thousand undecillion', 'Undecilliard', 'Icositrillion'],
    [23, 12, 72, 'Tresvigintillion', 'Duodecillion', 'Duodecillion', 'Icositetrillion'],
    [24, 12, 75, 'Quattuorvigintillion', 'Thousand duodecillion', 'Duodecilliard', 'Icosipentillion'],
    [25, 13, 78, 'Quinquavigintillion', 'Tredecillion', 'Tredecillion', 'Icosihexillion'],
    [26, 13, 81, 'Sesvigintillion', 'Thousand tredecillion', 'Tredecilliard', 'Icosiheptillion'],
    [27, 14, 84, 'Septemvigintillion', 'Quattuordecillion', 'Quattuordecillion', 'Icosioktillion'],
    [28, 14, 87, 'Octovigintillion', 'Thousand quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [29, 15, 90, 'Novemvigintillion', 'Quindecillion', 'Quindecillion', 'Triacontillion'],
    [30, 15, 93, 'Trigintillion', 'Thousand quindecillion', 'Quindecilliard', 'Thousand Triacontillion'],
    [31, 16, 96, 'Untrigintillion', 'Sedecillion', 'Sedecillion', 'Million Triacontillion'],
    [32, 16, 99, 'Duotrigintillion', 'Thousand sedecillion', 'Sedecilliard', 'Gillion Triacontillion'],
    [33, 17, 102, 'Trestrigintillion', 'Septendecillion', 'Septendecillion', 'Tetrillion Triacontillion'],
    [34, 17, 105, 'Quattuortrigintillion', 'Thousand septendecillion', 'Septendecilliard', 'Pentillion Triacontillion'],
    [35, 18, 108, 'Quinquatrigintillion', 'Octodecillion', 'Octodecillion', 'Hexillion Triacontillion'],
    [36, 18, 111, 'Sestrigintillion', 'Thousand octodecillion', 'Octodecilliard', 'Heptillion Triacontillion'],
    [37, 19, 114, 'Septentrigintillion', 'Novendecillion', 'Novendecillion', 'Oktillion Triacontillion'],
    [38, 19, 117, 'Octotrigintillion', 'Thousand novendecillion', 'Novendecilliard', 'Ennillion Triacontillion'],
    [39, 20, 120, 'Noventrigintillion', 'Vigintillion', 'Vigintillion', 'Dekillion Triacontillion'],
    [40, 20, 123, 'Quadragintillion', 'Thousand vigintillion', 'Vigintilliard', 'Hendekillion Triacontillion'],
    [50, 25, 153, 'Quinquagintillion', 'Thousand quinquavigintillion', 'Quinquavigintilliard', 'Icosihenillion Triacontillion'],
    [60, 30, 183, 'Sexagintillion', 'Thousand trigintillion', 'Trigintilliard', 'Triacontillion'],
    [70, 35, 213, 'Septuagintillion', 'Thousand quinquatrigintillion', 'Quinquatrigintilliard', 'Triacontillion'],
    [80, 40, 243, 'Octogintillion', 'Thousand quadragintillion', 'Quadragintilliard', 'Triacontillion'],
    [90, 45, 273, 'Nonagintillion', 'Thousand quinquaquadragintillion', 'Quinquaquadragintilliard', 'Triacontillion'],
    [100, 50, 303, 'Centillion', 'Thousand quinquagintillion', 'Quinquagintilliard', 'Triacontillion'],
    [101, 51, 306, 'Uncentillion', 'Unquinquagintillion', 'Unquinquagintillion', 'Triacontillion'],
    [102, 51, 309, 'Duocentillion', 'Thousand unquinquagintillion', 'Unquinquagintilliard', 'Triacontillion'],
    [103, 52, 312, 'Trescentillion', 'Duoquinquagintillion', 'Duoquinquagintillion', 'Triacontillion'],
    [110, 55, 333, 'Decicentillion', 'Thousand quinquaquinquagintillion', 'Quinquaquinquagintilliard', 'Triacontillion'],
    [111, 56, 336, 'Undecicentillion', 'Sesquinquagintillion', 'Sesquinquagintillion', 'Triacontillion'],
    [120, 60, 363, 'Viginticentillion', 'Thousand sexagintillion', 'Sexagintilliard', 'Triacontillion'],
    [121, 61, 366, 'Unviginticentillion', 'Unsexagintillion', 'Unsexagintillion', 'Triacontillion'],
    [130, 65, 393, 'Trigintacentillion', 'Thousand quinquasexagintillion', 'Quinquasexagintilliard', 'Triacontillion'],
    [140, 70, 423, 'Quadragintacentillion', 'Thousand septuagintillion', 'Septuagintilliard', 'Triacontillion'],
    [150, 75, 453, 'Quinquagintacentillion', 'Thousand quinquaseptuagintillion', 'Quinquaseptuagintilliard', 'Triacontillion'],
    [160, 80, 483, 'Sexagintacentillion', 'Thousand octogintillion', 'Octogintilliard', 'Triacontillion'],
    [170, 85, 513, 'Septuagintacentillion', 'Thousand quinquaoctogintillion', 'Quinquaoctogintilliard', 'Triacontillion'],
    [180, 90, 543, 'Octogintacentillion', 'Thousand nonagintillion', 'Nonagintilliard', 'Triacontillion'],
    [190, 95, 573, 'Nonagintacentillion', 'Thousand quinquanonagintillion', 'Quinquanonagintilliard', 'Triacontillion'],
    [200, 100, 603, 'Ducentillion', 'Thousand centillion', 'Centilliard', 'Triacontillion'],
    [300, 150, 903, 'Trecentillion', 'Thousand quinquagintacentillion', 'Quinquagintacentilliard', 'Triacontillion'],
    [400, 200, 1203, 'Quadringentillion', 'Thousand ducentillion', 'Ducentilliard', 'Triacontillion'],
    [500, 250, 1503, 'Quingentillion', 'Thousand quinquagintaducentillion', 'Quinquagintaducentilliard', 'Triacontillion'],
    [600, 300, 1803, 'Sescentillion', 'Thousand trecentillion', 'Trecentilliard', 'Triacontillion'],
    [700, 350, 2103, 'Septingentillion', 'Thousand quinquagintatrecentillion', 'Quinquagintatrecentilliard', 'Triacontillion'],
    [800, 400, 2403, 'Octingentillion', 'Thousand quadringentillion', 'Quadringentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [900, 450, 2703, 'Nongentillion', 'Thousand quinquagintaquadringentillion', 'Quinquagintaquadringentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [1000, 500, 3003, 'Millinillion', 'Thousand quingentillion', 'Quingentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion']
  ]
  for (let testNum of tests) {
    let shortn, longn, exp, shortName, longName, intlName, greekName
    [shortn, longn, exp, shortName, longName, intlName, greekName] = testNum
    const num = '1e' + exp
    describe('Testing 10^' + exp, () => {
      it('10^' + exp + ' should have the correct findShortN(): shortn', () => {
        expect(Numbers.findShortN(num)).to.equal(shortn)
      })
      it('10^' + exp + ' should have the correct length: exp', () => {
        expect(Numbers._places(num)).to.equal(exp)
      })
      it('10^' + exp + ' should have the correct short: ' + shortName, () => {
        let res = Numbers.humanReadable(num, Numbers.SHORT)
        expect(res).to.be.a('string')
        expect(res).to.equal(shortName)
      })
      it('10^' + exp + ' should have the correct greek: ' + greekName, () => {
        let res = Numbers.humanReadable(num, Numbers.NEW_GREEK)
        expect(res).to.be.a('string')
        expect(res).to.equal(greekName)
      })
    })
  }
  describe('testing custom function', () => {
    function myFun(num, len) {
      if (len >= 24) {
        return 'Z' + myFun(num, len - 24)
      }
      return String.fromCharCode(len + 96)
    }
    const res = Numbers.humanReadable('1e33', myFun)
    expect(res).to.equal('Zi')
  })
})
