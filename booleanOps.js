/**
 * passesOR
 * Returns true if at least one element in the list is true
 *
 * @param {Array} bools - Array of true/false values
 *
 * @example
 * passesOR([true, true, true]); //returns true
 * @example
 * passesOR([true, false, true]); //returns true
 * @example
 * passesOR([false, false, false]); //returns false
 */
function passesOR(bools) {
  var ret = false;
  if (bools.length > 0) {
    for (var i = 0; i < bools.length; i++) {
      if (bools[i] == true) {
        ret = true;
        break;
      }
    }
  }
  return ret;
}

/**
 * passesAND
 * Returns true if all elements in the list are true
 *
 * @param {Array} bools - Array of true/values falues
 *
 * @example
 * passesAND([true, true, true]); //returns true
 * @example
 * passesAND([true, false, true]); //returns false
 * @example
 * passesAND([false, false, false]); //returns false
 */
function passesAND(bools) {
  var ret = true;
  if (bools.length > 0) {
    for (var i = 0; i < bools.length; i++) {
      if (bools[i] == false) {
        ret = false;
        break;
      }
    }
  }
  else {
    ret = false;
  }
  return ret;
}

/**
 * passesBoolCondition
 * Returns true if the list of booleans passes AND or OR logic
 * If operator is not supplied, AND logic is used
 *
 * @param {Array} bools - list of true/false values
 * @param {string} operator - operation of choice ("And" or "Or")
 *
 * @example
 * passesBoolCondition([]); //returns false
 * @example
 * passesBoolCondition([true]); //returns true
 * @example
 * passesBoolCondition([true, true]); //returns true
 * @example
 * passesBoolCondition([true, false]); //returns false
 * @example
 * passesBoolCondition([true, true, true], "And"); //returns true
 * @example
 * passesBoolCondition([true, false, true], "And"); //returns false
 * @example
 * passesBoolCondition([true, true, true], "Or"); //returns true
 * @example
 * passesBoolCondition([true, false, true], "Or"); //returns true
 */
function passesBoolCondition(bools, operator) {
  if (bools.length == 0) {
    return false;
  }
  else if (bools.length == 1) {
    return bools[0];
  }
  else if (bools.length > 1) {
    if (operator == null) {
      return passesAND(bools);
    }
    else {
      switch (operator) {
        case "And":
          return passesAND(bools);
        case "Or":
          return passesOR(bools);
        default: 
          message("somehow have " + bools.length + " booleans, but the operator is " + operator);
          return false;
      }
    }
  }
}

/**
 * isnotNullNorUndefined
 * Returns True if the parameter is not null and it is not undefined
 *
 * @param {object} x - item to check
 *
 * @returns {boolean}
 */
function isnotNullNorUndefined(x) {
  return (x != null && x != undefined);
}

/**
 * isnotNNU
 * Returns the same as isnotNullNorUndefined, just shorthand
 *
 * @param {object} x - item to check
 *
 * @returns {boolean}
 */
function isnotNNU(x) {
  return isnotNullNorUndefined(x);
}

/**
 * isnotNNUNorEmptyString
 * Returns True if the parameter is not null and it is not undefined and it is not an empty string
 *
 * @param {object} x - item to check
 *
 * @returns {boolean}
 */
function isnotNNUNorEmptyString(x) {
  return (isnotNNU(x) && x != "");
}