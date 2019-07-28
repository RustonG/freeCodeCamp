function checkCashRegister(price, cash, cid) {
  // Make a copy of cid array to return in case of "CLOSED" status.
  const cidCopy = cid.map(arr => arr.slice());
  // Currency array to reference each unit's value.
  const currency = [0.01, 0.05, 0.1, 0.25, 1.0, 5.0, 10.0, 20.0, 100.0];
  // Placeholder resultObj to modify and return
  let resultObj = { status: undefined, change: [] };
  // Change rounded up to 2 numbers after the dot.
  let change = Number.parseFloat(cash - price).toFixed(2);
  // Array for change we'll be returning in case of "OPEN" status.
  let changeArr = [];
  // Index of currency unit to reference from 'currency' and 'cid' arrays.
  let currencyNum = 0;
  // Sum of currency unit for changeArr.
  let currencySum = 0;

  // Inner recursive function to build the change array and return result.
  function returnChange(change, cid) {
    // Find first currency unit higher than change and return its index - 1. That unit will be lower or equal to change.
    let currencyIndex = currency.findIndex(el => el > change) - 1;

    // TODO: Reduce repetition on lines 24 and 32.
    // Call helper function to check if index is not -1.
    if (currencyIndex === -1) {
      resultObj.status = "INSUFFICIENT_FUNDS";
      return resultObj;
    }

    // If there is no currency unit in 'cid', lower index by 1 and check if it's valid.
    while (cid[currencyIndex][1] === 0) {
      currencyIndex--;
      if (currencyIndex === -1) {
        resultObj.status = "INSUFFICIENT_FUNDS";
        return resultObj;
      }
    }

    // Variable to hold available currency in 'cid' for the unit.
    let currencyAvailable = cid[currencyIndex][1];
    // Check if there is more currency available than change we need to return
    if (currencyAvailable > change) {
      /* Divide change by currency unit and round it down to see how many units we can give
         to cover change without going overboard. */
      currencyNum = Math.floor(change / currency[currencyIndex]);
      // Multiply the value of unit by the number of units and store it in sum.
      currencySum = currency[currencyIndex] * currencyNum;
    } else {
      // If there is not enough currency to cover change, just set the sum to available currency.
      currencySum = currencyAvailable;
    }

    // Reduce the available currency by 'currencySum'.
    cid[currencyIndex][1] -= currencySum;

    // Reduce change by 'currencySum'.
    change = (change - currencySum).toFixed(2);
    // console.log(currency[currencyIndex], currencyNum, change);

    // Update 'changeArr' with currency unit and 'currencySum'.
    changeArr.push([cid[currencyIndex][0], currencySum]);
    // console.log(changeArr);

    // If change is more than 0, call this function recursively with updated change and cid.
    if (change > 0) {
      return returnChange(change, cid);
    }

    // Calculate money left in cid.
    let cidBalance = 0;
    for (let i = 0, n = cid.length; i < n; i++) {
      cidBalance += cid[i][1];
    }

    // If there is no money left in cid, set status to "CLOSED" and set change to initial 'cidCopy'.
    if (cidBalance === 0) {
      resultObj.status = "CLOSED";
      resultObj.change = cidCopy;
    } else {
      // Otherwise set status to "OPEN" and change to 'changeArr'.
      resultObj.status = "OPEN";
      resultObj.change = changeArr;
    }

    // Return updated result object.
    return resultObj;
  }

  // Call recursive 'returnChange' function.
  return returnChange(change, cid);
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ])
);

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]
