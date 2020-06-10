/**
 * REQUIRED OTHER LIBRARIES
 *   moment.js
 *   booleanOps.js
 *   entries.js
 *   strings.js
 */

/**
 * EXPECTED FIELDS
 *   "Location" - [GEO] - geoposition to indicate where the entry was recorded
 *   "Test" - [BL] - boolean to indicate that all durations have finished
 */

/**
 * getStatusForDate
 * Returns the singular Status entry that was effective as of the date parameter
 * null is returned if there is no Status effective as of the date parameter
 * 
 * @param {Array} statuses - list of Status History or Status Details entries to return effective Status entry from
 *                           these entries are expected to have "Status (Reference)" [RL-S] and "Practical As Of DateTime" [JS:TX-DT] fields
 * @param {date} asOfDate - date to find the effective Status entry for
 * @param {boolean} verbose - if true, messages will be displayed throughout execution
 *
 * @returns {entry}
 */
 function getStatusForDate(statuses, asOfDate) {
  //initialize
  var ret = null;

  //filter statuses to those with Practical As Of DateTime <= asOfDate
  var filteredStatuses = [];
  //for each status in the parameter
  for (var i = 0; i < statuses.length; i++) {
    //if the Practical As Of DateTime is less than or equal to the asOfDate parameter
    if (moment(statuses[i].field("Practical As Of DateTime")).isBefore(moment(asOfDate))) {
      //push the current entry to the filtered results
      filteredStatuses.push(statuses[i]);
    }
  }
  //get the one with the most recent Practical As Of DateTime
  var status = null;
  //if the filtered list is not empty
  if (filteredStatuses.length > 0) {
    //get entry with the largest Practical As Of DateTime
    status = getMaximalEntry(filteredStatuses, "Practical As Of DateTime");
  }

  //if an effective status was found
  if (isnotNNU(status)) {
    //get the actual Status entry
    var s = status.field("Status (Reference)");
    if (s.length > 0) {s = s[0];}
    //set return value to the status entry
    ret = s;
  }

  //return
  return ret;
 }

/**
 * getCurrentStatus
 * Returns the singular Status entry that is effective as of the current moemnt
 * null is returned if ther is no Status effective as of the date paramter
 */
function getCurrentStatus(statuses) {
  return getStatusForDate(statuses, moment());
}

/**
 * getStatusCapitalFormForDate
 */
 function getStatusCapitalFormForDate(statuses, asOfDate) {
  var status = getStatusForDate(statuses, asOfDate);

  if (isnotNNU(status)) {
    return getFieldValue([status], "CapitalForm", "");
  }
  else {
    return "";
  }
 }

/**
 * getCurrentStatusCapitalForm
 */
function getCurrentStatusCapitalForm(statuses) {
  return getStatusCapitalFormForDate(statuses, moment());
}