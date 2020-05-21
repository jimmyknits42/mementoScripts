/**
 * REQUIRED OTHER LIBRARIES
 *   strings.js
 */

/**
 * EXPECTED FIELDS
 *   "Satisfaction (Reference)" - [RL] - Satisfaction library
 *   "Again" - [TX] - local indication of whether I'd do the experience again
 *   "Rating" - [NM] - local rating of satisfaction
 */


/**
 * getDisplaySatisfactionFromEntry
 * Returns the display string of the Satisfaction for the entry parameter
 * If the entry parameter has local Again and Satisfaction values, they are used
 * If the entry parameter is related to at least one Satisfaction entry, that is used
 * Otherwise empty string is returned
 * 
 * @param {entry} e - entry with Satisfaction to return a display string for
 * 
 * @returns {string}
 */
function getDisplaySatisfactionFromEntry(e) {
  //initialize
  var satisfaction = "";
  var again = e.field("Again");
  var rating = e.field("Rating");
  var sats = e.field("Satisfaction (Reference)");

  //if local Again is populated
  if (again) {
    //set return to double the rating value
    satisfaction = rating * 2;
    //local Again is Yes
    if (again == "Yes") {
      //append checked box to return
      satisfaction += " ✅";
    } 
    //local Again is No
    else if (again == "No") {
      //append x to return
      satisfaction += " ❌";
    } 
  }
  //if there is at least one related Satisfaction entry
  else if (sats.length > 0) {
    //set return to the display form of the related Satisfaction entries
    satisfaction = getFieldValue(sats, "Display Form", ", ");
  }

  //return
  return satisfaction;
}