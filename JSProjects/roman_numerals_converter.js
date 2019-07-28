function convertToRoman(num) {
  /* Make 2 arrays with corresponding decimal and roman numbers.
       Adding numbers before a new roman number (4, 9...) significantly reduces code. 
       Plus extra 'Infinity' value to find index for numbers higher than 1000. */
  const decimal = [
    1,
    4,
    5,
    9,
    10,
    40,
    50,
    90,
    100,
    400,
    500,
    900,
    1000,
    Infinity
  ];
  const roman = [
    "I",
    "IV",
    "V",
    "IX",
    "X",
    "XL",
    "L",
    "XC",
    "C",
    "CD",
    "D",
    "CM",
    "M"
  ];
  let romanStr = "";

  // Helper function to build a roman number str
  function buildRomanStr(num, str) {
    // Index of a number less than or equal to num in decimal array
    let lowerDec = decimal.findIndex(el => el > num) - 1;
    // Roman value equal to the decimal number at 'lowerDec' index
    let lowerRom = roman[lowerDec];

    /* 'rep' is a number of times 'lowerRom' goes into the number without number going negative.
        So the loop builds a string out of roman values and at the same time reduces number by that value. */
    for (let i = 0, rep = Math.floor(num / decimal[lowerDec]); i < rep; i++) {
      str = str.concat(lowerRom);
      num -= decimal[lowerDec];
      console.log(num);
    }
    /* If at the end of the loop num is higher than zero, recursively return the function 
       with new number and current built-up string. If number is zero, return the final string. */
    if (num > 0) {
      return buildRomanStr(num, str);
    } else {
      return str;
    }
  }

  return buildRomanStr(num, romanStr);
}

console.log(convertToRoman(3999));
