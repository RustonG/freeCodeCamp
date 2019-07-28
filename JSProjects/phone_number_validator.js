// My code
function telephoneCheck(str) {
  // Make phone regex pattern
  let phoneRegex = new RegExp(
    [
      /^(1 |1)?/, // If country code is provided match it with or without space after.
      /(\(\d{3}\)|(\d{3}))/, // Match 3 digits with or without parentheses.
      /( |-)?/, // If there is whitespace or dash between groups of numbers, match one.
      /(\d{3})/, // Match 3 digits with or without parentheses.
      /( |-)?/, // If there is whitespace or dash between groups of numbers, match one.
      /(\d{4})$/ // Match 4 digits.
    ]
      .map(r => r.source) // Source method allows to avoid manually escaping special characters.
      .join("") // Join the array into one string before compiling regex.
  );

  // console.log(str.match(phoneRegex));
  return phoneRegex.test(str);
}

console.log(telephoneCheck("1 (555)-555-5555"));
