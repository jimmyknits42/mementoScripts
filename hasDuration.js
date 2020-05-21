/**
 * REQUIRED OTHER LIBRARIES
 *   booleanOps.js
 *   entries.js
 *   dates.js
 *   strings.js
 */

/**
 * EXPECTED FIELDS
 *   "Duration (Reference)" - [RL] - Duration library
 *   "Completed" - [BL] - boolean to indicate that all durations have finished
 *   "Start Moment" - [DT] - start moment for the entry
 *   "End Moment" - [DT] - end moment for the entry
 */

/**
 * getDisplayStartEndFromDurations
 * Returns a string of the minimal Display Start DateTime
 * and maximal Display End DateTime with a hyphen between. 
 *
 * Expects entries.js to also be available
 *
 * @param {Array} durations - array of Duration entries
 *
 * @returns {string}
 */
function getDisplayStartEndFromDurations(durations) {
  //initialize return
  var ret = "";

  //if there are durations
  if (durations.length > 0) {
    //Set start moment 
    var start = "";
    //Get minEntry 
    var minEntry = getMinimalEntry(durations, "Practical Start DateTime");
    //if minEntry is not null 
    if (minEntry != null) {
      //Set start to display Start DateTime 
      start = minEntry.field("Display Start DateTime");
    } 

    //Set end moment 
    var end = "";
    //Get maxEntry 
    var maxEntry = getMaximalEntry(durations, "Practical End DateTime");
    //if maxEntry is not null 
    if (maxEntry != null) {
      //Set end to display End DateTime 
      end = maxEntry.field("Display End DateTime");
    } 

    //if start and end are both not empty 
    if (start != "" && end != "") {
      //Set description to start - end
      ret = start + " - " + end;
    } 
    else {
      ret = "ERROR: getDisplayStartEndFromDurations: no start and end moments found";
    } 
  }

  //return 
  return ret
}


/**
 * getDisplayStartEndFromEntry
 * Returns a string with the format for the entry parameter
 *   StartMoment - EndMoment
 * If the entry parameter has a Start Moment and End Moment populated, they are used
 * If there is only one Duration entry, the Display Duration (Start - End) is used
 * If there is more than one Duration entry, the the earliest Practical Start DateTime and latest Practical End DateTime are used
 *
 * @param {entry} e - entry to use
 *
 * @returns {string}
 */
function getDisplayStartEndFromEntry(e) {
  //initialize 
  var duration = "";
  var dur = e.field("Duration (Reference)");
  var sm = e.field("Start Moment");
  var em = e.field("End Moment");

  //if start and end moments provided
  if (isnotNullNorUndefined(sm) && isnotNullNorUndefined(em)) {
    duration = getFormattedDateTimeString(sm) + " - " + getFormattedDateTimeString(em);
  }
  //if there is exactly 1 duration 
  else if (dur.length == 1) {
    //use duration reference if populated 
    duration = getFieldValue(
      field("Duration (Reference)"), 
      "Display Duration (Start - End)",
      ""
    );
  } 
  //if there is more than one duration
  else if (dur.length > 1) {
    duration = getDisplayStartEndFromDurations(dur);
  } 

  //return
  return duration;
}

/**
 * setStartAndEndMoments
 * For an entry parameter that has Duration, 
 *   sets the Start Moment from the earliest Practical Start DateTime from related Duration entries
 *   sets the End Moment from the latest Practical End DateTime from the realted Duration entries, if the entry is Complete
 *
 * @param {entry} e - entry with Duration to set Start and End Moments for
 */
function setStartAndEndMoments(e) {
  //initialize durations
  var durs = e.field("Duration (Reference)");

  //if at least one duration
  if (durs.length > 0) {
    //get minEntry
    var minEntry = getMinimalEntry(durs, "Practical Start DateTime");
    //if minEntry is not null
    if (isnotNullNorUndefined(minEntry)) {
      //get start moment
      var start = moment(minEntry.field("Practical Start DateTime")).valueOf();
      //set start moment
      e.set("Start Moment", start);
    }
  } 

  //if completed AND there is at least one duration entry
  if (e.field("Completed") && durs.length > 0) {
    //get maxEntry
    var maxEntry = getMaximalEntry(durs, "Practical End DateTime");
    //if maxEntry is not null
    if (isnotNullNorUndefined(maxEntry) {
      //get end moment
      var end = moment(maxEntry.field("Practical End DateTime")).valueOf();
      //set end moment
      e.set("End Moment", end);
    }
  }
}
