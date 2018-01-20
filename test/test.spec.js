import * as Numbers from '../index.js'

//import [expect] as expect from 'chai'
var expect = require('chai').expect; 
describe('numbers.js', () => {
  let tests = [
    // ShortScaleIndex, LongScaleIndex, Exponent,
    //           ShortName,               LongName,               IntlName,       GreekName,  gameName,  Abbr, SciPrefix,
    [0, 0, 1, 'Ten', 'Ten', 'Ten', '', ''],
    [0, 0, 2, 'Hundred', 'Hundred', 'Hundred', '', ''],
    [0, 0, 3, 'Thousand', 'Thousand', 'Thousand', 'Thousand', 'K', 'Kilo'],
    [1, 1, 6, 'Million', 'Million', 'Million', 'Million', 'M', 'Mega'],
    [2, 1, 9, 'Billion', 'Thousand Million', 'Milliard', 'Gillion', 'G', 'Giga'],
    [3, 2, 12, 'Trillion', 'Billion', 'Billion', 'Tetrillion', 'T', 'Tera'],
    [4, 2, 15, 'Quadrillion', 'Thousand Billion', 'Billiard', 'Pentillion', 'P', 'Peta'],
    [5, 3, 18, 'Quintillion', 'Trillion', 'Trillion', 'Hexillion', 'E', 'Exa'],
    [6, 3, 21, 'Sextillion', 'Thousand Trillion', 'Trilliard', 'Heptillion', 'Z', 'Zetta'],
    [7, 4, 24, 'Septillion', 'Quadrillion', 'Quadrillion', 'Oktillion', 'Y', 'Yotta'],
    [8, 4, 27, 'Octillion', 'Thousand Quadrillion', 'Quadrilliard', 'Ennillion'],
    [9, 5, 30, 'Nonillion', 'Quintillion', 'Quintillion', 'Dekillion'],
    [10, 5, 33, 'Decillion', 'Thousand Quintillion', 'Quintilliard', 'Hendekillion'],
    [11, 6, 36, 'Undecillion', 'Sextillion', 'Sextillion', 'Dodekillion'],
    [12, 6, 39, 'Duodecillion', 'Thousand Sextillion', 'Sextilliard', 'Trisdekillion'],
    [13, 7, 42, 'Tredecillion', 'Septillion', 'Septillion', 'Tetradekillion'],
    [14, 7, 45, 'Quattuordecillion', 'Thousand Septillion', 'Septilliard', 'Pentadekillion'],
    [15, 8, 48, 'Quinquadecillion', 'Octillion', 'Octillion', 'Hexadekillion'],
    [16, 8, 51, 'Sedecillion', 'Thousand Octillion', 'Octilliard', 'Heptadekillion'],
    [17, 9, 54, 'Septendecillion', 'Nonillion', 'Nonillion', 'Oktadekillion'],
    [18, 9, 57, 'Octodecillion', 'Thousand Nonillion', 'Nonilliard', 'Enneadekillion'],
    [19, 10, 60, 'Novendecillion', 'Decillion', 'Decillion', 'Icosillion'],
    [20, 10, 63, 'Vigintillion', 'Thousand Decillion', 'Decilliard', 'Icosihenillion'],
    [21, 11, 66, 'Unvigintillion', 'Undecillion', 'Undecillion', 'Icosidillion'],
    [22, 11, 69, 'Duovigintillion', 'Thousand Undecillion', 'Undecilliard', 'Icositrillion'],
    [23, 12, 72, 'Tresvigintillion', 'Duodecillion', 'Duodecillion', 'Icositetrillion'],
    [24, 12, 75, 'Quattuorvigintillion', 'Thousand Duodecillion', 'Duodecilliard', 'Icosipentillion'],
    [25, 13, 78, 'Quinquavigintillion', 'Tredecillion', 'Tredecillion', 'Icosihexillion'],
    [26, 13, 81, 'Sesvigintillion', 'Thousand Tredecillion', 'Tredecilliard', 'Icosiheptillion'],
    [27, 14, 84, 'Septemvigintillion', 'Quattuordecillion', 'Quattuordecillion', 'Icosioktillion'],
    [28, 14, 87, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [28, 14, 88, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [28, 14, 89, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [29, 15, 90, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [29, 15, 91, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [29, 15, 92, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [30, 15, 93, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
    [30, 15, 94, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
    [30, 15, 95, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
    [31, 16, 96, 'Untrigintillion', 'Sedecillion', 'Sedecillion', 'Million Triacontillion'],
    [32, 16, 99, 'Duotrigintillion', 'Thousand Sedecillion', 'Sedecilliard', 'Gillion Triacontillion'],
    [33, 17, 102, 'Trestrigintillion', 'Septendecillion', 'Septendecillion', 'Tetrillion Triacontillion'],
    [34, 17, 105, 'Quattuortrigintillion', 'Thousand Septendecillion', 'Septendecilliard', 'Pentillion Triacontillion'],
    [35, 18, 108, 'Quinquatrigintillion', 'Octodecillion', 'Octodecillion', 'Hexillion Triacontillion'],
    [36, 18, 111, 'Sestrigintillion', 'Thousand Octodecillion', 'Octodecilliard', 'Heptillion Triacontillion'],
    [37, 19, 114, 'Septentrigintillion', 'Novendecillion', 'Novendecillion', 'Oktillion Triacontillion'],
    [38, 19, 117, 'Octotrigintillion', 'Thousand Novendecillion', 'Novendecilliard', 'Ennillion Triacontillion'],
    [39, 20, 120, 'Noventrigintillion', 'Vigintillion', 'Vigintillion', 'Dekillion Triacontillion'],
    [40, 20, 123, 'Quadragintillion', 'Thousand Vigintillion', 'Vigintilliard', 'Hendekillion Triacontillion'],
    [50, 25, 153, 'Quinquagintillion', 'Thousand Quinquavigintillion', 'Quinquavigintilliard', 'Icosihenillion Triacontillion'],
    [60, 30, 183, 'Sexagintillion', 'Thousand Trigintillion', 'Trigintilliard', 'Thousand Triacontillion Triacontillion'],
    [70, 35, 213, 'Septuagintillion', 'Thousand Quinquatrigintillion', 'Quinquatrigintilliard', 'Hendekillion Triacontillion Triacontillion'],
    [80, 40, 243, 'Octogintillion', 'Thousand Quadragintillion', 'Quadragintilliard', 'Icosihenillion Triacontillion Triacontillion'],
    [90, 45, 273, 'Nonagintillion', 'Thousand Quinquaquadragintillion', 'Quinquaquadragintilliard', 'Thousand Triacontillion Triacontillion Triacontillion'],
    [100, 50, 303, 'Centillion', 'Thousand Quinquagintillion', 'Quinquagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion'],
    [101, 51, 306, 'Uncentillion', 'Unquinquagintillion', 'Unquinquagintillion', 'Dodekillion Triacontillion Triacontillion Triacontillion'],
    [102, 51, 309, 'Duocentillion', 'Thousand Unquinquagintillion', 'Unquinquagintilliard', 'Trisdekillion Triacontillion Triacontillion Triacontillion'],
    [103, 52, 312, 'Trescentillion', 'Duoquinquagintillion', 'Duoquinquagintillion', 'Tetradekillion Triacontillion Triacontillion Triacontillion'],
    [110, 55, 333, 'Decicentillion', 'Thousand Quinquaquinquagintillion', 'Quinquaquinquagintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion'],
    [111, 56, 336, 'Undecicentillion', 'Sesquinquagintillion', 'Sesquinquagintillion', 'Icosidillion Triacontillion Triacontillion Triacontillion'],
    [120, 60, 363, 'Viginticentillion', 'Thousand Sexagintillion', 'Sexagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion'],
    [121, 61, 366, 'Unviginticentillion', 'Unsexagintillion', 'Unsexagintillion', 'Million Triacontillion Triacontillion Triacontillion Triacontillion'],
    [130, 65, 393, 'Trigintacentillion', 'Thousand Quinquasexagintillion', 'Quinquasexagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [140, 70, 423, 'Quadragintacentillion', 'Thousand Septuagintillion', 'Septuagintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [150, 75, 453, 'Quinquagintacentillion', 'Thousand Quinquaseptuagintillion', 'Quinquaseptuagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [160, 80, 483, 'Sexagintacentillion', 'Thousand Octogintillion', 'Octogintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [170, 85, 513, 'Septuagintacentillion', 'Thousand Quinquaoctogintillion', 'Quinquaoctogintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [180, 90, 543, 'Octogintacentillion', 'Thousand Nonagintillion', 'Nonagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [190, 95, 573, 'Nonagintacentillion', 'Thousand Quinquanonagintillion', 'Quinquanonagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [200, 100, 603, 'Ducentillion', 'Thousand Centillion', 'Centilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [300, 150, 903, 'Trecentillion', 'Thousand Quinquagintacentillion', 'Quinquagintacentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [400, 200, 1203, 'Quadringentillion', 'Thousand Ducentillion', 'Ducentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [500, 250, 1503, 'Quingentillion', 'Thousand Quinquagintaducentillion', 'Quinquagintaducentilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [600, 300, 1803, 'Sescentillion', 'Thousand Trecentillion', 'Trecentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [700, 350, 2103, 'Septingentillion', 'Thousand Quinquagintatrecentillion', 'Quinquagintatrecentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [800, 400, 2403, 'Octingentillion', 'Thousand Quadringentillion', 'Quadringentilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [900, 450, 2703, 'Nongentillion', 'Thousand Quinquagintaquadringentillion', 'Quinquagintaquadringentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [1000, 500, 3003, 'Millinillion', 'Thousand Quingentillion', 'Quingentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion']
  ]
  for (let testNum of tests) {
    let shortn, longn, exp, shortName, longName, intlName, greekName, game_name
    [shortn, longn, exp, shortName, longName, intlName, greekName, game_name] = testNum
    const num = '1e' + exp
    describe('Testing 10^' + exp, () => {
      it('10^' + exp + ' should have the correct findShortN(): shortn', () => {
        expect(Numbers.findShortN(num)).to.equal(shortn)
      })
      it('10^' + exp + ' should have the correct length: exp', () => {
        expect(Numbers._places(num)).to.equal(exp)
      })
      it('10^' + exp + ' should have the correct short: ' + shortName, () => {
        let res = Numbers.humanReadable(num, Numbers.SHORT_SCALE)
        expect(res).to.be.a('string')
        expect(res).to.equal(shortName)
      })
      it('10^' + exp + ' should have the correct long: ' + longName, () => {
        let res = Numbers.humanReadable(num, Numbers.LONG_SCALE)
        expect(res).to.be.a('string')
        expect(res).to.equal(longName)
      })
      it('10^' + exp + ' should have the correct international: ' + intlName, () => {
        let res = Numbers.humanReadable(num, Numbers.INTL_SCALE)
        expect(res).to.be.a('string')
        expect(res).to.equal(intlName)
      })
    })
  }

  let shortTests = [
    [0, 0, 1, ''],
    [0, 0, 2, ''],
    [0, 0, 3, 'K'],
    [1, 1, 6, 'M'],
    [2, 1, 9, 'B'],
    [3, 2, 12, 'T'],
    [4, 2, 15, 'AA'],
    [5, 3, 18, 'AB'],
    [6, 3, 21, 'AC'],
/*    [7, 4, 24, 'Septillion', 'Quadrillion', 'Quadrillion', 'Oktillion', 'Y', 'Yotta'],
    [8, 4, 27, 'Octillion', 'Thousand Quadrillion', 'Quadrilliard', 'Ennillion'],
    [9, 5, 30, 'Nonillion', 'Quintillion', 'Quintillion', 'Dekillion'],
    [10, 5, 33, 'Decillion', 'Thousand Quintillion', 'Quintilliard', 'Hendekillion'],
    [11, 6, 36, 'Undecillion', 'Sextillion', 'Sextillion', 'Dodekillion'],
    [12, 6, 39, 'Duodecillion', 'Thousand Sextillion', 'Sextilliard', 'Trisdekillion'],
    [13, 7, 42, 'Tredecillion', 'Septillion', 'Septillion', 'Tetradekillion'],
    [14, 7, 45, 'Quattuordecillion', 'Thousand Septillion', 'Septilliard', 'Pentadekillion'],
    [15, 8, 48, 'Quinquadecillion', 'Octillion', 'Octillion', 'Hexadekillion'],
    [16, 8, 51, 'Sedecillion', 'Thousand Octillion', 'Octilliard', 'Heptadekillion'],
    [17, 9, 54, 'Septendecillion', 'Nonillion', 'Nonillion', 'Oktadekillion'],
    [18, 9, 57, 'Octodecillion', 'Thousand Nonillion', 'Nonilliard', 'Enneadekillion'],
    [19, 10, 60, 'Novendecillion', 'Decillion', 'Decillion', 'Icosillion'],
    [20, 10, 63, 'Vigintillion', 'Thousand Decillion', 'Decilliard', 'Icosihenillion'],
    [21, 11, 66, 'Unvigintillion', 'Undecillion', 'Undecillion', 'Icosidillion'],
    [22, 11, 69, 'Duovigintillion', 'Thousand Undecillion', 'Undecilliard', 'Icositrillion'],
    [23, 12, 72, 'Tresvigintillion', 'Duodecillion', 'Duodecillion', 'Icositetrillion'],
    [24, 12, 75, 'Quattuorvigintillion', 'Thousand Duodecillion', 'Duodecilliard', 'Icosipentillion'],
    [25, 13, 78, 'Quinquavigintillion', 'Tredecillion', 'Tredecillion', 'Icosihexillion'],
    [26, 13, 81, 'Sesvigintillion', 'Thousand Tredecillion', 'Tredecilliard', 'Icosiheptillion'],
    [27, 14, 84, 'Septemvigintillion', 'Quattuordecillion', 'Quattuordecillion', 'Icosioktillion'],
    [28, 14, 87, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [28, 14, 88, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [28, 14, 89, 'Octovigintillion', 'Thousand Quattuordecillion', 'Quattuordecilliard', 'Icosiennillion'],
    [29, 15, 90, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [29, 15, 91, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [29, 15, 92, 'Novemvigintillion', 'Quinquadecillion', 'Quinquadecillion', 'Triacontillion'],
    [30, 15, 93, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
    [30, 15, 94, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
    [30, 15, 95, 'Trigintillion', 'Thousand Quinquadecillion', 'Quinquadecilliard', 'Thousand Triacontillion'],
*/    [31, 16, 96, 'Untrigintillion', 'Sedecillion', 'Sedecillion', 'Million Triacontillion'],
    [32, 16, 99, 'Duotrigintillion', 'Thousand Sedecillion', 'Sedecilliard', 'Gillion Triacontillion'],
    [33, 17, 102, 'Trestrigintillion', 'Septendecillion', 'Septendecillion', 'Tetrillion Triacontillion'],
    [34, 17, 105, 'Quattuortrigintillion', 'Thousand Septendecillion', 'Septendecilliard', 'Pentillion Triacontillion'],
    [35, 18, 108, 'Quinquatrigintillion', 'Octodecillion', 'Octodecillion', 'Hexillion Triacontillion'],
    [36, 18, 111, 'Sestrigintillion', 'Thousand Octodecillion', 'Octodecilliard', 'Heptillion Triacontillion'],
    [37, 19, 114, 'Septentrigintillion', 'Novendecillion', 'Novendecillion', 'Oktillion Triacontillion'],
    [38, 19, 117, 'Octotrigintillion', 'Thousand Novendecillion', 'Novendecilliard', 'Ennillion Triacontillion'],
    [39, 20, 120, 'Noventrigintillion', 'Vigintillion', 'Vigintillion', 'Dekillion Triacontillion'],
    [40, 20, 123, 'Quadragintillion', 'Thousand Vigintillion', 'Vigintilliard', 'Hendekillion Triacontillion'],
/*    [50, 25, 153, 'Quinquagintillion', 'Thousand Quinquavigintillion', 'Quinquavigintilliard', 'Icosihenillion Triacontillion'],
    [60, 30, 183, 'Sexagintillion', 'Thousand Trigintillion', 'Trigintilliard', 'Thousand Triacontillion Triacontillion'],
    [70, 35, 213, 'Septuagintillion', 'Thousand Quinquatrigintillion', 'Quinquatrigintilliard', 'Hendekillion Triacontillion Triacontillion'],
    [80, 40, 243, 'Octogintillion', 'Thousand Quadragintillion', 'Quadragintilliard', 'Icosihenillion Triacontillion Triacontillion'],
    [90, 45, 273, 'Nonagintillion', 'Thousand Quinquaquadragintillion', 'Quinquaquadragintilliard', 'Thousand Triacontillion Triacontillion Triacontillion'],
    [100, 50, 303, 'Centillion', 'Thousand Quinquagintillion', 'Quinquagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion'],
    [101, 51, 306, 'Uncentillion', 'Unquinquagintillion', 'Unquinquagintillion', 'Dodekillion Triacontillion Triacontillion Triacontillion'],
    [102, 51, 309, 'Duocentillion', 'Thousand Unquinquagintillion', 'Unquinquagintilliard', 'Trisdekillion Triacontillion Triacontillion Triacontillion'],
    [103, 52, 312, 'Trescentillion', 'Duoquinquagintillion', 'Duoquinquagintillion', 'Tetradekillion Triacontillion Triacontillion Triacontillion'],
    [110, 55, 333, 'Decicentillion', 'Thousand Quinquaquinquagintillion', 'Quinquaquinquagintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion'],
    [111, 56, 336, 'Undecicentillion', 'Sesquinquagintillion', 'Sesquinquagintillion', 'Icosidillion Triacontillion Triacontillion Triacontillion'],
    [120, 60, 363, 'Viginticentillion', 'Thousand Sexagintillion', 'Sexagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion'],
    [121, 61, 366, 'Unviginticentillion', 'Unsexagintillion', 'Unsexagintillion', 'Million Triacontillion Triacontillion Triacontillion Triacontillion'],
    [130, 65, 393, 'Trigintacentillion', 'Thousand Quinquasexagintillion', 'Quinquasexagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [140, 70, 423, 'Quadragintacentillion', 'Thousand Septuagintillion', 'Septuagintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [150, 75, 453, 'Quinquagintacentillion', 'Thousand Quinquaseptuagintillion', 'Quinquaseptuagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [160, 80, 483, 'Sexagintacentillion', 'Thousand Octogintillion', 'Octogintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [170, 85, 513, 'Septuagintacentillion', 'Thousand Quinquaoctogintillion', 'Quinquaoctogintilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [180, 90, 543, 'Octogintacentillion', 'Thousand Nonagintillion', 'Nonagintilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [190, 95, 573, 'Nonagintacentillion', 'Thousand Quinquanonagintillion', 'Quinquanonagintilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [200, 100, 603, 'Ducentillion', 'Thousand Centillion', 'Centilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [300, 150, 903, 'Trecentillion', 'Thousand Quinquagintacentillion', 'Quinquagintacentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [400, 200, 1203, 'Quadringentillion', 'Thousand Ducentillion', 'Ducentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [500, 250, 1503, 'Quingentillion', 'Thousand Quinquagintaducentillion', 'Quinquagintaducentilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [600, 300, 1803, 'Sescentillion', 'Thousand Trecentillion', 'Trecentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [700, 350, 2103, 'Septingentillion', 'Thousand Quinquagintatrecentillion', 'Quinquagintatrecentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [800, 400, 2403, 'Octingentillion', 'Thousand Quadringentillion', 'Quadringentilliard', 'Icosihenillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [900, 450, 2703, 'Nongentillion', 'Thousand Quinquagintaquadringentillion', 'Quinquagintaquadringentilliard', 'Thousand Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion'],
    [1000, 500, 3003, 'Millinillion', 'Thousand Quingentillion', 'Quingentilliard', 'Hendekillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion Triacontillion']
*/
  ]
  for (let testNum of shortTests) {
    let shortn, longn, exp, gameName
    [shortn, longn, exp, gameName] = testNum
    const num = '1e' + exp
    describe('Testing 10^' + exp, () => {
      it('10^' + exp + ' should have the correct game: ' + gameName, () => {
        let res = Numbers.humanReadable(num, Numbers.GAME_SCALE)
        expect(res).to.be.a('string')
        expect(res).to.equal(gameName)
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
