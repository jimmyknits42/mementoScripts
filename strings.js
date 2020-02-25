/**
 * pad
 * Returns the str padded with pad, either left or right
 *
 * @param {string} pad - string of desired length with values to pad
 * @param {string} str - string to be padded
 * @param {boolean} padLeft - indicates whether padding left or right
 *
 * @returns {string}
 */
 function pad(pad, str, padLeft) {
  if (typeof str === 'undefined') 
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}



/**
 * getFieldValue
 * Returns the value of a specified field from the entry/entries in the e parameter
 * If there is more than one entry in e, the values are comma separated
 *
 * @param {Array} e - entry/entries to return field value for
 * @param {string} fieldName - name of the field whose value will be returned for each entry
 * @param {string} delimiter - value to separate the fieldName values if there are multiple entries
 *
 * @returns {string}
 */
function getFieldValue(e, fieldName, delimiter) {
  //initialize
  var ret = "";
  //exit out if invalid input
  if (e == null || typeof e === 'undefined' || e.length == 0) {
    return ret
  }
  //if there is at least one entry in the parameter, return it's field value
  if (e.length > 0) {
    ret = e[0].field(fieldName);
  }
  //if there is more than one entry, comma separate the others
  if (e.length > 1) {
    for (var i = 1; i < e.length; i++) {
      ret += delimiter + e[i].field(fieldName);
    }
  }
  //return
  return ret
}

/**
 * getDisplayID
 * Returns a string of the displayID(s) of the entry/entries in the e parameter
 * If there is more than one entry in the parameter, they are comma separated
 * 
 * @param {Array} e - entry/entries to return displayID for
 *
 * @returns {string}
 */
function getDisplayID(e) {
  return getFieldValue(e, "displayID", ", ")
}

/**
 * getMementoID
 * Returns a string of the MementoID of the entry/entries in the e parameter
 * If there is more than one entry in the parameter, they are comma separated
 *
 * @param {Array} - entry/entries to return displayID for
 *
 * @returns {string}
 */
function getMementoID(e) {
  //initialize
  var ret = "";
  //exit out if invalid input
  if (e == null || typeof e == 'undefined' || e.length == 0) {
    return ret
  }
  //if there is at least one entry in the parameter, return it's MementoID
  if (e.length > 0) {
    ret = e[0].id;
  }
  //if there is more than one entry, comma separate the others
  if (e.length > 1) {
    for (var i = 1; i < e.length; i++) {
      ret += ", " + e[i].id;
    }
  }
  //return
  return ret
}
