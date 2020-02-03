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
