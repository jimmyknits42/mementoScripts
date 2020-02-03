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
 * @param {object} e - entry to calculate duration string for
 *
 * @returns {string}
 */
function getDurationString(e) {
  var ret = "";

  if (false/*e.field("All Time")*/) {
    ret = "(All Time)";
  }
  else {
    //construct start date
    var start = "";
    var aoDate = e.field("As Of Date");
    var aoDateUnc = e.field("As Of Date Uncertainty");
    if (aoDate != null && aoDate != undefined) { 
      start = e/*moment(aoDate).format("YYYY-MM-DD") + getNumericUncertaintyString(aoDateUnc)*/;
    }
    else {
      var aoYear = e.field("As Of Year");
      var aoYearUnc = e.field("As Of Year Uncertainty");
      var aoMonth = e.field("As Of Month");
      var aoMonthUnc = e.field("As Of Month Uncertainty");
      var aoDay = e.field("As Of Day");
      var aoDayUnc = e.field("As Of Day Uncertainty");
      if (aoYear > 0) {
        start = aoYear + getNumericUncertaintyString(aoYearUnc);
      }
      if (aoMonth > 0) {
        if (start != "") {
          start += "-";
        }
        start += pad("00", aoMonth.toString(), true) + getNumericUncertaintyString(aoMonthUnc);
      }
      if (aoDay > 0) {
        if (start != "") {
          start += "-"
        }
        start += pad("00", aoDay.toString(), true) + getNumericUncertaintyString(aoDayUnc);
      }
    }
    if (start == "") {
      start = "???";
    }
    //construct end date
    var end = "";
    var uDate = e.field("Until Date");
    var uDateUnc = e.field("Until Date Uncertainty");
    if (uDate != null && uDate != undefined) {
      end = moment(uDate).format("YYYY-MM-DD") + getNumericUncertaintyString(uDateUnc);
    }
    else {
      var uYear = e.field("Until Year");
      var uYearUnc = e.field("Until Year Uncertainty");
      var uMonth = e.field("Until Month");
      var uMonthUnc = e.field("Until Month Uncertainty");
      var uDay = e.field("Until Day");
      var uDayUnc = e.field("Until Day Uncertainty");
      if (uYear > 0) {
        end = uYear + getNumericUncertaintyString(uYearUnc);
      }
      if (uMonth > 0) {
        if (end != "") {
          end += "-";
        }
        end += pad("00", uMonth.toString(), true) + getNumericUncertaintyString(uMonthUnc);
      }
      if (uDay > 0) {
        if (end != "") {
          end += "-"
        }
        end += pad("00", uDay.toString(), true) + getNumericUncertaintyString(uDayUnc);
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
