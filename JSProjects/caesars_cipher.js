function rot13(str) {
  // Empty string for encoded str
  const key = 13;
  let newstr = "";
  /* Loop through the str and if a char is alphabetic, modify it and then concat to newstr.
     Else concat the char as is. */
  for (let i = 0, n = str.length; i < n; i++) {
    let code = str.charCodeAt(i);
    // Alphabetic upper-cased check.
    if (code >= 65 && code <= 90) {
      // Had to take the formula from CS50 course.
      newstr = newstr.concat(
        String.fromCharCode(((code - 65 + key) % 26) + 65)
      );
    } else {
      newstr = newstr.concat(str[i]);
    }
  }
  return newstr;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC"));
