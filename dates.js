/** 
 * getDurationString
 * Returns the string that represents duration
 * Expects the context entry to contain the following fields
 *   "All Time"
 *   "As Of Timeline Type (Reference)"
 *   "As Of Date"
 *   "As Of Date Uncertainty"
 *   "As Of Year"
 *   "As Of Year Uncertainty"
 *   "As Of Month" 
 *   "As Of Month Uncertainty"
 *   "As Of Day"
 *   "As Of Day Uncertainty"
 *   "Until Timeline Type (Reference)"
 *   "Until Date"
 *   "Until Date Uncertainty"
 *   "Until Year"
 *   "Until Year Uncertainty"
 *   "Until Month"
 *   "Until Month Uncertainty"
 *   "Until Day"
 *   "Until Day Uncertainty"
 * If no start moment is specified, it will be "???"
 * If no end moment is specified, it will be "Now"
 *
 * @param {object} entry - entry to calculate duration string for
 *
 * @returns {string}
 */
function getDurationString(entry) {
  var ret = "";

  if (entry.field("All Time")) {
    ret = "(All Time)";
  }
  else {
    //construct start date
    var start = "";
    var aoDate = entry.field("As Of Date");
    var aoDateUnc = entry.field("As Of Date Uncertainty");
    if (aoDate != null) { 
      start = moment(aoDate).format("YYYY-MM-DD") + getNumericUncertaintyString(aoDateUnc);
    }
    else {
      var aoYear = entry.field("As Of Year");
      var aoYearUnc = entry.field("As Of Year Uncertainty");
      var aoMonth = entry.field("As Of Month");
      var aoMonthUnc = entry.field("As Of Month Uncertainty");
      var aoDay = entry.field("As Of Day");
      var aoDayUnc = entry.field("As Of Day Uncertainty");
      if (aoYear > 0) {
        start = aoYear + getNumericUncertaintyString(aoYearUnc);
      }
      if (aoMonth > 0) {
        if (start != "") {
          start += "-";
        }
        start += aoMonth.toString().padStart(2, "0") + getNumericUncertaintyString(aoMonthUnc);
      }
      if (aoDay > 0) {
        if (start != "") {
          start += "-"
        }
        start += aoDay.toString().padStart(2, "0") + getNumericUncertaintyString(aoDayUnc);
      }
    }
    if (start == "") {
      start = "???";
    }
    //construct end date
    var end = "";
    var uDate = entry.field("Until Date");
    var uDateUnc = entry.field("Until Date Uncertainty");
    if (uDate != null) {
      end = moment(uDate).format("YYYY-MM-DD") + getNumericUncertaintyString(uDateUnc);
    }
    else {
      var uYear = entry.field("Until Year");
      var uYearUnc = entry.field("Until Year Uncertainty");
      var uMonth = entry.field("Until Month");
      var uMonthUnc = entry.field("Until Month Uncertainty");
      var uDay = entry.field("Until Day");
      var uDayUnc = entry.field("Until Day Uncertainty");
      if (uYear > 0) {
        end = uYear + getNumericUncertaintyString(uYearUnc);
      }
      if (uMonth > 0) {
        if (end != "") {
          end += "-";
        }
        end += uMonth.toString().padStart(2, "0") + getNumericUncertaintyString(uMonthUnc);
      }
      if (uDay > 0) {
        if (end != "") {
          end += "-"
        }
        end += uDay.toString().padStart(2, "0") + getNumericUncertaintyString(uDayUnc);
      }
    }
    if (end == "") {
      end = "Now";
    }
    //construct duration string
    ret = "(" + start + " - " + end + ")";
  }

  return ret
}
