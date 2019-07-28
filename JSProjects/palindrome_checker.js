function palindrome(str) {
  // Create regex to match all alphanumeric characters except underscore
  let regex = /[a-zA-Z0-9]+/g;
  // Match regex in the passed in string, join everything into a string and make it lower-cased
  let normalStr = str
    .match(regex)
    .join("")
    .toLocaleLowerCase();
  // Split normalStr into array, reverse the array and join it back together
  let reversedStr = normalStr
    .split("")
    .reverse()
    .join("");

  console.log(normalStr, reversedStr);

  // If two strings match each other return true, else false
  return normalStr === reversedStr ? true : false;
}

console.log(palindrome("eye eye"));
