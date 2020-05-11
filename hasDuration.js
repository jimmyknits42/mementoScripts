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
