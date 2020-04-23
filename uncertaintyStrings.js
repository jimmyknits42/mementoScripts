/**
 * getNumericUncertaintyString
 * Returns a string for the uncertainty array values passed in
 * Intended for use with Numeric Uncertainty fields
 * Maximum input array looks like:
 *   ["++", "+", "-", "--", "?", "???"] 
 * Which has an expected result of:
 *   "+++/---????"
 *
 * @param {Array} uncertainty - the array of uncertainty values
 *
 * @returns {string}
 */
function getNumericUncertaintyString(uncertainty) {
  var str = "";
  
  var plusStr = getUncertaintyStringSubset(uncertainty, ["+", "++"]);
  var minStr = getUncertaintyStringSubset(uncertainty, ["-", "--"]);
  var plusMinJoinerStr = getSlashString(plusStr, minStr);
  var qStr = getUncertaintyStringSubset(uncertainty, ["?", "???"]);
  
  str = plusStr + plusMinJoinerStr + minStr + qStr;
  
  return str
}

/**
 * getFeelingUncertaintyString
 * Returns a string for the uncertainty array values passed in 
 * Intended for use with the Feeling Uncertainty field
 * Maximum input array looks like:
 *   ["Skip", "Irrelevant", "?", "???"] 
 * Which has an expected result of:
 *   "Skip/Irrelevant????"
 *
 * @param {Array} uncertainty - the array of uncertainty values
 *
 * @returns {string}
 */
function getFeelingUncertaintyString(uncertainty) {
  var str = "";
  
  var skipStr = getUncertaintyStringSubset(uncertainty, ["Skip"]);
  var irrStr = getUncertaintyStringSubset(uncertainty, ["Irrelevant"]);
  var skipIrrJoinerStr = getSlashString(skipStr, irrStr);
  var qStr = getUncertaintyStringSubset(uncertainty, ["?", "???"]);

  str = skipStr + skipIrrJoinerStr + irrStr + qStr;

  return str
}

/**
 * getFeelingSubstitutionReasonUncertaintyString
 * Returns a string for the uncertainty array values passed in 
 * Intended for use with the Feeling Substitution Reason field
 * Maximum input array looks like:
 *   ["0", "?", "???", "Skip", "Irrelevant"] 
 * Which has an expected result of:
 *   "0/Skip/Irrelevant????"
 *
 * @param {Array} uncertainty - the array of uncertainty values
 *
 * @returns {string}
 */
function getFeelingSubstitutionReasonUncertaintyString(uncertainty) {
  var str = "";
  
  var qStr = getUncertaintyStringSubset(uncertainty, ["?", "???"]);
  
  var skipStr = getUncertaintyStringSubset(uncertainty, ["Skip"]);
  var irrStr = getUncertaintyStringSubset(uncertainty, ["Irrelevant"]);
  var skipIrrJoinerStr = getSlashString(skipStr, irrStr);
  var skipIrrStr = skipStr + skipIrrJoinerStr + irrStr; 
  
  var zeroStr = getUncertaintyStringSubset(uncertainty, ["0"]);
  var zeroJoinerStr = getSlashString(zeroStr, skipIrrStr);

  str = zeroStr + zeroJoinerStr + skipIrrStr + qStr;

  return str
}

/**
 * getUncertaintyStringSubset
 * Returns a string that is the concatenation of any values within valids also present in uncertainty
 *
 * @param {Array} uncertainty - the array of uncertainty values
 * @param {Array} valids - the array of valid values to be concatenated if found
 *
 * @returns {string}
 */
function getUncertaintyStringSubset(uncertainty, valids) {
  var str = "";
  
  for (var i = 0; i < valids.length; i++) {
    if (uncertainty.indexOf(valids[i]) > -1) {
      str += valids[i];
    }
  }
  
  return str
}

/**
 * getSpacerString
 * Returns the third parameter if both the prefix and suffix parameters are populated
 * Returns an empty string otherwise
 *
 * @param {string} prefix - the string that would go before the spacer
 * @param {string} suffix - the string that would go after the spacer
 * @param {string} spacer - the string to be returned if the other 2 parameters are populated
 *
 * @returns {string}
 */
function getSpacerString(prefix, suffix, spacer) {
  var str = "";
  
  if (prefix != undefined && suffix != undefined && 
      prefix != null && suffix != null && 
      prefix != "" && suffix != "") {
    str = spacer;
  }
  
  return str
}

/**
 * getSlashString
 * Returns "/" if both the prefix and suffix parameters are populated
 * Returns empty string otherwise
 * @param {string} prefix - the string that would go before the slash
 * @param {string} suffix - the string that would go after the slash
 *
 * @returns {string}
 */
function getSlashString(prefix, suffix) {
  return getSpacerString(prefix, suffix, "/");
}

/**
 * getStringWithUncertaintyString
 * Returns the str parameter with the numeric uncertainty string appended based on the uncertainty parameter
 * if the str parameter is empty, empty string is returned
 * 
 * @param {string} str - string to append uncertainty string to
 * @param {Array} uncertainty - array of string values corresponding to the numeric uncertainty of str
 *
 * @returns {string}
 */
function getStringWithUncertaintyString(str, uncertainty) {
  //initialize return
  var ret = "";

  //if str is not empty
  if (str != "") {
    //set return value to str + uncertainty string
    ret = string + getNumericUncertaintyString(uncertainty);
  }

  //return
  return ret
}

/**
 * getLeftPaddedNumberString
 * Returns the number parameter left-padded with p parameter
 * 
 * @param {number} num - number to left-pad
 * @param {string} padding - padding to use, of the desired length (empty string indicates no padding)
 * @param {boolean} allowZero - true = a string will be returned even if num is 0; false = if num is 0, empty string will be returned
 * 
 * @example
 * // returns "4"
 * getLeftPaddedNumberString(4, "", false)
 * @example
 * // returns "4"
 * getLeftPaddedNumberString(4, "0", false)
 * @example
 * // returns "04"
 * getLeftPaddedNumberString(4, "00", false)
 * @example
 * // returns "-04"
 * getLeftPaddedNumberString(-4, "00", false)
 * @example
 * // returns ""
 * getLeftPaddedNumberString(0, "00", false)
 * @example
 * // returns "00"
 * getLeftPaddedNumberString(0, "00", true)
 *
 * @returns {string}
 */
function getLeftPaddedNumberString(num, padding, allowZero) {
  //initialize return
  var ret = "";

  //if it doesn't matter if the number value is 0 OR if it can't be 0 and it isn't 0
  if (allowZero || (!allowZero && Math.abs(num) != 0)) {
      //set the return value to left-pad the absolute value of the number parameter
      ret = pad(padding, Math.abs(num).toString(), true);
      //if the number parameter is negative
      if (num < 0) {
        //prefix the return value with a minus sign
        ret = "-" + ret;
      }
  }


  //return
  return ret
}

/**
 * getLeftPaddedNumberWithUncertaintyString
 * Returns a string with the num parameter left-padded with p and any uncertainty appended
 *
 * @param {number} num - number to pad and has uncertainty
 * @param {string} p - the padding to use, of the desired length (empty string indicates no padding)
 * @param {boolean} allowZero - true = a string will be returned even if num is 0; false = if num is 0, empty string will be returned
 * @param {Array} uncertainty - array of strings corresponding to the uncertainty of the number parameter
 *
 * @returs {string}
 */
function getLeftPaddedNumberWithUncertaintyString(num, padding, allowZero, uncertainty) {
  return getStringWithUncertaintyString(getLeftPaddedNumberString(num, padding, allowZero), uncertainty)
}
