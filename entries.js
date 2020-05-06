/**
 * getMaximalEntry
 * Returns the singular entry that has the highest value in the specified field.
 * If the entries parameter is empty, null is returned.
 * If there is more than one entry with the same highest value in fieldName,
 *   the first one encountered will be returned.
 *
 * @param {Array} entries - set of entries to return maximal entry from
 * @param {string} fieldName - field to check for maximal value from
 * 
 * @returns {Object}
 */
function getMaximalEntry(entries, fieldName) {
  //initialize maxEntry to null
  var maxEntry = null;

  //if entries has length
  if (entries.length > 0) {
    //initialize maxEntry to first entry
    maxEntry = entries[0];
    //loop over the rest of the entries
    for (var i = 1; i < entries.length; i++) {
      //if the current entry has a larger value in fieldName than the current maxEntry
      if (entries[i].field(fieldName) > maxEntry.field(fieldName)) {
        //reset the maxEntry to the current entry
        maxEntry = entries[i];
      }
    }
  }

  //return maxEntry
  return maxEntry
}


/**
 * getMinimalEntry
 * Returns the singular entry that has the smallest value in the specified field.
 * If the entries parameter is empty, null is returned.
 * If there is more than one entry with the same smallest value in fieldName,
 *   the first one encountered will be returned.
 *
 * @param {Array} entries - set of entries to return minimal entry from
 * @param {string} fieldName - field to check for minimal value from
 * 
 * @returns {Object}
 */
function getMinimalEntry(entries, fieldName) {
  //initialize minEntry to null
  var minEntry = null;

  //if entries has length
  if (entries.length > 0) {
    //initialize minEntry to first entry in list
    minEntry = entries[0];
    //loop over the rest of the entries
    for (var i = 1; i < entries.length; i++) {
      //if the current entry has a smaller value in fieldName than the current minEntry
      if (entries[i].field(fieldName) < minEntry.field(fieldName)) {
        //reset the maxEntry to the current entry
        minEntry = entries[i];
      }
    }
  }

  //return minEntry
  return minEntry
}
