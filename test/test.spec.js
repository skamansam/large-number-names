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
    [0, 1, ''],
    [0, 2, ''],
    [0, 3, 'K'],
    [0, 6, 'M'],
    [0, 9, 'B'],
    [0, 12, 'T'],
    [0, 15, 'AA'],
    [1, 18, 'AB'],
    [2, 21, 'AC'],
    [3, 24, 'AD'],
    [4, 27, 'AE'],
    [5, 30, 'AF'],
    [6, 33, 'AG'],
    [8, 36, 'AH'],
    [8, 39, 'AI'],
    [8, 42, 'AJ'],
    [8, 45, 'AK'],
    [8, 48, 'AL'],
    [8, 51, 'AM'],
    [8, 54, 'AN'],
    [8, 57, 'AO'],
    [8, 60, 'AP'],
    [8, 63, 'AQ'],
    [8, 66, 'AR'],
    [8, 69, 'AS'],
    [8, 72, 'AT'],
    [8, 75, 'AU'],
    [12, 78, 'AV'],
    [12, 81, 'AW'],
    [12, 84, 'AX'],
    [12, 87, 'AY'],
    [12, 90, 'AZ'],
    [12, 93, 'BA'],
    [12, 96, 'BB'],
    [19, 99, 'BC'],  
    [19, 102, 'BD'],  
    [19, 105, 'BE'],  
    [48, 108, 'BF'],
    [19, 111, 'BG'],
    [176 , 543, 'GU'],
    [177, 573, 'HE'],
    [292, 603, 'HO'],
    [9, 903, 'LK'],
    [9, 2703, 'AIM'],
    [9, 3003, 'AMI']
  ]
  for (let testNum of shortTests) {
    let base24Index, exp, gameName
    [base24Index, exp, gameName] = testNum
    const num = '1e' + exp
    describe('Testing 10^' + exp, () => {
      it('10^' + exp + ' should have the correct game: ' + gameName, () => {
        let res = Numbers.humanReadable(num, Numbers.GAME_SCALE)
        expect(res).to.be.a('string')
        expect(res).to.equal(gameName)
      })
    })
  }

  const asciiTests = [
    [0, 'A'], [1, 'B'], [2, 'C'], [3, 'D'], [4, 'E'],
    [5, 'F'], [6, 'G'], [7, 'H'], [8, 'I'], [9, 'J'],
    [10, 'K'], [11, 'L'], [12, 'M'], [13, 'N'], [14, 'O'],
    [15, 'P'], [16, 'Q'], [17, 'R'], [18, 'S'], [19, 'T'],
    [20, 'U'], [21, 'V'], [22, 'W'], [23, 'X'], [24, 'Y'],
    [25, 'Z'], [26, 'AA'], [27, 'AB'], [28, 'AC'], [29, 'AD'],
    [30, 'AE'], [31, 'AF'], [32, 'AG'], [33, 'AH'], [34, 'AI'],
    [35, 'AJ'], [36, 'AK'], [37, 'AL'], [38, 'AM'], [39, 'AN'],
    [40, 'AO'], [41, 'AP'], [42, 'AQ'], [43, 'AR'], [44, 'AS'],
    [45, 'AT'], [46, 'AU'], [47, 'AV'], [48, 'AW'], [49, 'AX'],
    [50, 'AY'], [51, 'AZ'], [52, 'BA'], [53, 'BB'], [54, 'BC'],
    [55, 'BD'], [56, 'BE'], [57, 'BF'], [58, 'BG'], [59, 'BH'],
    [60, 'BI'], [61, 'BJ'], [62, 'BK'], [63, 'BL'], [64, 'BM'],
    [65, 'BN'], [66, 'BO'], [67, 'BP'], [68, 'BQ'], [69, 'BR'],
    [70, 'BS'], [71, 'BT'], [72, 'BU'], [73, 'BV'], [74, 'BW'],
    [75, 'BX'], [76, 'BY'], [77, 'BZ'], [78, 'CA'], [79, 'CB'],
  ]
  for (let testData of asciiTests) {
    const [num, expectedResult] = testData
    describe(`testing _toBaseASCII(${num})`, () => {
      it('' + num + ' should have the correct ascii: ' + expectedResult, () => {
        expect(Numbers._toBaseASCII(num)).to.equal(expectedResult)
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
