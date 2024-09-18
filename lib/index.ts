import Decimal from "decimal.js";

const NumberClass = Decimal;
type NumberClass = Decimal;
type LargeNumber = NumberClass | number;

export enum Scale {
  /** Constant to let humanReadable() use the greek scale. */
  Greek,
  /** Constant to let humanReadable() use the greek scale. */
  Short,
  /** Constant to let humanReadable() use the long english scale. ("thousands") */
  Long,
  /** Constant to let humanReadable() use the international scale. (using '-illiard') */
  International,
  /** Constant to let humanReadable() use the game scale. (i.e. 'AA', 'AB', etc) */
  Game,
  /** Constant to let humanReadable() use abbreviations for the greek scale.*/
  GreekAbbreviated,
  /** Constant to let humanReadable() use abbreviaitons for the short scale. */
  ShortAbbreviated,
  /** Constant to let humanReadable() use abbreviations for the long scale. (using '') */
  LongAbbreviated,
  /** Constant to let humanReadable() use abbreviations for the international scale. (using '-illiard') */
  InternationalAbbreviated,
}

/**
 * When we want to use the names in a selection element, etc., we can use this dictionary.
 */
export const ScaleName = {
  [Scale.Greek]: "Greek Scale",
  [Scale.Short]: "Short Scale",
  [Scale.Long]: "Long Scale",
  [Scale.International]: "International Scale",
  [Scale.Game]: "Game Scale",
  [Scale.GreekAbbreviated]: "Greek Scale, Abbreviated",
  [Scale.ShortAbbreviated]: "Short Scale, Abbreviated",
  [Scale.LongAbbreviated]: "Long Scale, Abbreviated",
  [Scale.InternationalAbbreviated]: "International Scale, Abbreviated",
};

/**
 * This is the scale used to generate the greek scale dictionary values.
 * This is taken from the Wikipedia page on names of large numbers.
 * https://en.wikipedia.org/wiki/Names_of_large_numbers
 */
export const GreekScaleDict = [
  "Thousand",
  "Million",
  "Gillion",
  "Tetrillion",
  "Pentillion",
  "Hexillion",
  "Heptillion",
  "Oktillion",
  "Ennillion",
  "Dekillion",
  "Hendekillion",
  "Dodekillion",
  "Trisdekillion",
  "Tetradekillion",
  "Pentadekillion",
  "Hexadekillion",
  "Heptadekillion",
  "Oktadekillion",
  "Enneadekillion",
  "Icosillion",
  "Icosihenillion",
  "Icosidillion",
  "Icositrillion",
  "Icositetrillion",
  "Icosipentillion",
  "Icosihexillion",
  "Icosiheptillion",
  "Icosioktillion",
  "Icosiennillion",
  "Triacontillion",
];

/**
 * This is the scale used to generate the dictionary values.
 * This is taken from the Wikipedia page on names of large numbers.
 * https://en.wikipedia.org/wiki/Names_of_large_numbers
 */
export const ShortScaleDict = {
  ultraLowValues: ["", "Ten", "Hundred"],
  lowValues: [
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
  ],
  onesPrefix: [
    "",
    "un",
    "duo",
    "tre",
    "quattuor",
    "quinqua",
    "se",
    "septe",
    "octo",
    "nove",
  ],
  tensPrefix: [
    "",
    "deci",
    "viginti",
    "triginta",
    "quadraginta",
    "quinquaginta",
    "sexaginta",
    "septuaginta",
    "octoginta",
    "nonaginta",
  ],
  hundredsPrefix: [
    "",
    "centi",
    "ducenti",
    "trecenti",
    "quadringenti",
    "quingenti",
    "sescenti",
    "septingenti",
    "octingenti",
    "nongenti",
  ],
};

/**
 * Calculates the large number name of the given number.
 * @param n string or number representing a number. due to limitations in JS, strings are preferred and won't have a limit.
 * @param scale either one of the constants that use a scale in this library, or custom function that trakes a number and length as parameters
 */
export function humanReadableSuffix(
  n: string | LargeNumber,
  scale: Scale | Function = Scale.Short
): string {
  let num = !(n instanceof NumberClass) ? new NumberClass(n) : n;
  if (num.isNaN()) return "NaN";
  if (num.isZero()) return "0";
  if (typeof scale === "function") return customScale(num, scale);
  switch (scale) {
    case Scale.Greek:
      return greekScale(num, _places(n));
    case Scale.Short:
      return shortScale(num, findLengthTriplets(num));
    case Scale.Long:
      return customScale(num, longScale);
    case Scale.International:
      return customScale(num, longIntlScale);
    case Scale.Game:
      return customScale(num, gameScale);
    case Scale.GreekAbbreviated:
      return customScale(num, gameScale);
    case Scale.ShortAbbreviated:
      return customScale(num, gameScale);
    case Scale.LongAbbreviated:
      return customScale(num, gameScale);
    case Scale.InternationalAbbreviated:
      return customScale(num, gameScale);
    default:
      return customScale(num, scale);
  }
}

/**
 * The main entry point for this library. Will convert the number to a string with the appropriate suffix and precision.
 * @param  n string or number representing a number. due to limitations in JS, strings are preferred and won't have a limit.
 * @param scale either one of the constants that use a scale in this library, or custom function that trakes a number and length as parameters
 * @param displayDigits the number of digits to display after the decimal point. -1 disables displaying digits.
 * @returns the number with the appropriate suffix and precision.
 */
export function humanReadable(
  n: string | LargeNumber,
  scale = Scale.Short,
  displayDigits = -1
): string {
  let num = n instanceof NumberClass ? n : new NumberClass(n);
  const suffix = humanReadableSuffix(num, scale);
  return displayDigits === -1
    ? suffix
    : `${num.toExponential(displayDigits)} ${suffix}`;
}

export default humanReadable;

/**
 * Get the number of places in a number. This is used to get the length of the number, minus one.
 * So you can use this to do stuff like `3e${Number._places(`1e3`)}` to get '3e3' or 3000
 * @param n the number to get the number of places for.
 * @returns the number of digits in a number, minus 1
 */
export function _places(n: string | LargeNumber): number {
  let num = n instanceof NumberClass ? n : new NumberClass(n);
  if (num.lt(10)) return 0;
  return NumberClass.floor(NumberClass.log10(NumberClass.abs(num))).toNumber();
}

/**
 * Run a custom function against the given number. The cusotm function is given two parameters: the number, and the length of the number, minus one.
 * @param  n the number to which to apply the scale
 * @param  scaleFunction a function that takes in the parameters n, and the number of digits in the number, minus one.
 * @returns the result of the function
 */
export function customScale(
  n: string | LargeNumber,
  scaleFunction: Function
): string {
  const numberLength = _places(n);
  return scaleFunction(n, numberLength);
}

/**
 *
 * @param {*} n
 * @param {*} len
 */
function greekScale(n: string | LargeNumber, len: number) {
  let num: NumberClass = n instanceof NumberClass ? n : new NumberClass(n);

  if (num === undefined || num.lt(1000)) {
    return "";
  }
  const idx = Math.floor(len / 3) - 1;
  let result = "";
  if (idx > GreekScaleDict.length - 1) {
    const maxNumber = 1e90;
    const maxDigits = 90;
    let prefix = greekScale(num.minus(maxNumber), len - maxDigits);
    result =
      (prefix !== "" ? prefix + " " : "") +
      GreekScaleDict[GreekScaleDict.length - 1];
  } else {
    result = GreekScaleDict[idx];
  }
  return titleize(result);
}

/**
 * Calculates the length of a number in triplets for use in short scale naming.
 * This function determines how many groups of three digits (triplets) are in the number,
 * which is used to select the appropriate suffix in the short scale naming system.
 *
 * @param n - The number to calculate the length for. Can be a string, number, or Decimal object.
 * @returns The number of triplets in the number, minus 1. For example, for 1,000,000, it would return 1.
 */
export function findLengthTriplets(n: string | LargeNumber): number {
  const num = n instanceof NumberClass ? n : new NumberClass(n);
  if (num.lt(1.0e6)) return 0;
  return num.log().minus(3).dividedBy(3).floor().toNumber();
}

/**
 *
 * @param {Decimal} n
 * @param {Number} len
 */
function shortScale(n: LargeNumber, len: number) {
  const num = n instanceof NumberClass ? n : new NumberClass(n);
  // const len = findLengthTriplets(num);
  if (len == 1000) return "Millinillion";
  if (num.lt(10)) return ShortScaleDict.ultraLowValues[0];
  if (num.lt(100)) return ShortScaleDict.ultraLowValues[1];
  if (num.lt(1000)) return ShortScaleDict.ultraLowValues[2];
  if (len <= 10) return ShortScaleDict.lowValues[len];
  const triad = len % 1000;
  const onesIdx = triad % 10;
  const tensIdx = Math.floor(triad / 10) % 10;
  const hundredsIdx = Math.floor(triad / 100);
  let extraPrefix = "illion";
  if (len > 1000) {
    extraPrefix = shortScale(n, findLengthTriplets(num));
  }
  const onesTens = correctWords(
    ShortScaleDict.onesPrefix[onesIdx],
    ShortScaleDict.tensPrefix[tensIdx]
  );
  let tensHundreds = correctWords(
    onesTens,
    ShortScaleDict.hundredsPrefix[hundredsIdx]
  );

  const lastLetter = tensHundreds[tensHundreds.length - 1];
  if (lastLetter == "i" || lastLetter == "a" || lastLetter == "o")
    tensHundreds = tensHundreds.slice(0, tensHundreds.length - 1);

  return titleize(`${tensHundreds}${extraPrefix}`);
}

/**
 * Fixes the conjunction of names according to certain linguistic rules.
 * @param prefix the prefix string
 * @param suffix the suffix string
 */
function correctWords(prefix: string, suffix: string) {
  if (suffix == "") return prefix;
  if (prefix == "") return suffix;

  const treOrSe = prefix == "se" || prefix == "tre";
  const lastLetter = prefix[prefix.length - 1];
  if (lastLetter != "e") return `${prefix}${suffix}`;

  const nextLetter = suffix[0];
  let conjoiner = "";

  switch (nextLetter) {
    case "c":
      if (treOrSe) conjoiner = "s";
      break;
    case "o":
      conjoiner = "x";
      break;
    case "v":
      conjoiner = treOrSe ? "s" : "m";
      break;
    // @ts-ignore
    case "d":
      if (treOrSe) break;
      /* falls through */
    case "s":
    case "q":
    case "t":
      conjoiner = treOrSe ? "s" : "m";
  }
  return `${prefix}${conjoiner}${suffix}`;
}

/**
 * Capitalizes the first letter in the string, and lowercases the rest.
 * @param string
 */
function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Capitalize each word in a phrase. The function name, `titleize` is a bit
 * of a misnomer, as this function does not adhere to any known
 * title schema, such as APA, Chicago, AP, or MLA. This is to keep
 * this method small and fast.
 * This method depends on `capitalize()`
 * @param string the string to titleize
 * @returns the titleized string
 */
export function titleize(string: string) {
  return string
    .split(" ")
    .map((s) => capitalize(s))
    .join(" ");
}

/**
 * long scale - Traditional British
 * This scale takes the short scale and adds a thousand to each value above 1e6.
 */
function longScale(n: number, len: number) {
  if (len == 1000) return "Millinillion";
  if (n < 10) return ShortScaleDict.ultraLowValues[0];
  if (n < 100) return ShortScaleDict.ultraLowValues[1];
  if (n < 1000) return ShortScaleDict.ultraLowValues[2];
  if (n < 1e6) return ShortScaleDict.lowValues[0];
  let triadLength = Math.floor(len / 3) - 1;
  let prefixWord = triadLength % 2 === 0 ? "Thousand " : "";
  return `${prefixWord}${shortScale(n, Math.floor(len / 6))}`;
}

/**
 * Long International Scale, AKA Traditional European
 * This scale adds an '-illiard' to every thousands place.
 * @param the number we are working with
 * @param len the length of the number. use `#humanReadable` to automatically set this
 */
function longIntlScale(n: LargeNumber, len: number) {
  if (len == 1000) return "Millinillion";
  let num = n instanceof NumberClass ? n : new NumberClass(n);
  if (num.lt(10)) return ShortScaleDict.ultraLowValues[0];
  if (num.lt(100)) return ShortScaleDict.ultraLowValues[1];
  if (num.lt(1000)) return ShortScaleDict.ultraLowValues[2];
  if (num.lt(1e6)) return ShortScaleDict.lowValues[0];
  let triadLength = Math.floor(len / 3) - 1;
  let word = shortScale(n, Math.floor(len / 6));
  if (triadLength % 2 === 0) {
    word = word.replace(/llion$/, "lliard");
  }
  return word;
}

/**
 * This is an abbreviation scale commonly used in games. It starts with the
 * familiar abbreviations through Trillion, then starts using 'AA', 'AB', etc. This
 * scale can be calculated for numbers larger than any needed. THe _n_ parameter is not even used,
 * so you only need to pass in the length of the number.
 * Uses `#_toBaseAscii()`
 * @param _n the number
 * @param len the length of the number
 */
function gameScale(_n: LargeNumber, len: number) {
  const lowVal = ["", "K", "M", "B", "T"];
  let triadLength = Math.floor(len / 3);
  if (len < 15) return lowVal[triadLength];
  return _toBaseASCII(triadLength - 5 + 26, null); // start at 'AA'
}

/**
 * Convert a number to its ASCII form. zero is `A`, 25 is `Z', and 26 is 'AA', etc.
 * @param num the number to convert.
 * @param precision if not given, will calculate the precision based on the number. should be in base 26. (This is really the number of places you want.)
 */
export function _toBaseASCII(n: LargeNumber, precision: number|null): string {
  let num = n instanceof NumberClass ? n : new NumberClass(n);
  if (num.lte(25)) return String.fromCharCode(num.add(65).toNumber());
  const numPrecision = precision ?? num.ln().dividedBy(Math.log(26)).floor().toNumber();
  const dividend = Math.pow(26, numPrecision);
  const digit = num.dividedBy(dividend).floor().toNumber();
  const nextPlace = num.modulo(dividend);

  return (
    String.fromCharCode(64 + digit) + _toBaseASCII(nextPlace, numPrecision - 1)
  );
}
