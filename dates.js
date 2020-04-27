//CONSTANTS
const FORMAT_DATE = "YYYY-MM-DD";
const FORMAT_DATETIME = "YYYY-MM-DD HH:mm";
const FORMAT_TIME = "HH:mm";
const monthsWith30Days = [4, 6, 9, 11];
const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

/**
 * isLeapYear
 * Returns True if the year parameter is a leap year
 * Returns False if it is not
 *
 * @param {number} year - year to check if it's leap
 *
 * @returns {boolean}
 */
function isLeapYear(year) {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

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


/**
 * getDateString
 * Returns a constructed date string with the format:
 *   YYYY-MM-DD
 * if any value has numeric uncertainty, then it is included in the result
 *
 * @param {date} date - specific date to be formatted and returned
 * @param {Array} dateUnc - array of string values corresponding to uncertainty of date value
 * @param {number} year - year to be formatted and returned
 * @param {Array} yearUnc - array of string values corresponding to uncertainty of year value
 * @param {number} month - month to be formatted and return, 1-12, will be left-padded with 0s
 * @param {Array} monthUnc - array of string values corresponding to uncertainty of month value
 * @param {number} day - day to be formatted and returned, 1-31, will be left-padded with 0s
 * @param {Array} dayUnc - array of string values corresponding to uncertainty of day value
 * @param {string} def - default value to be returned if all other parameters are empty
 *
 * @returns {string}
 */
function getDateString(date, dateUnc, year, yearUnc, month, monthUnc, day, dayUnc, def) {
  var ret = "";

  //construct string, prefer date if available otherwise use other values
  if (date != null && date != undefined) {
    ret = moment(date).format("YYYY-MM-DD") + getNumericUncertaintyString(dateUnc);
  }
  else {
    if (year > 0) {
      ret = year + getNumericUncertaintyString(yearUnc);
    }
    if (month > 0) {
      if (ret != "") {
        ret += "-";
      }
      ret += pad("00", month.toString(), true) + getNumericUncertaintyString(monthUnc);
    }
    if (day > 0) {
      if (ret != "") {
        ret += "-"
      }
      ret += pad("00", day.toString(), true) + getNumericUncertaintyString(dayUnc);
    }
  }

  //if the date string is still empty, return the default value
  if (ret == "") {
    ret = def;
  }

  //return
  return ret
}

/**
 * getDateAsStringFollowingFormat
 * Returns the date parameter as a string formatted according to the format paramter
 * if the date parameter is empty, empty string is returned
 *
 * @param {date} date - date to be formatted
 * @param {string} format - format to use
 *
 * @returns {string}
 */
function getDateAsStringFollowingFormat(date, format) {
  //initialize return 
  var ret = "";
  //if date is not empty
  if (date != null && date != undefined) {
    //set return value to formatted date
    ret = moment(date).format(format);
  }
  //return
  return ret
}

/**
 * getFormattedDateString
 * Returns the date parameter as a string formatted 
 *   YYYY-MM-DD
 * if the date parameter is empty, empty string is returned
 *
 * @param {date} date - date to be formatted
 *
 * @returns {string}
 */
function getFormattedDateString(date) {
  return getDateAsStringFollowingFormat(date, FORMAT_DATE)
}

/**
 * getFormattedDateTimeString
 * Returns the dateTime parameter as a string formatted
 *   YYYY-MM-DD HH:mm
 * if the dateTime parameter is empty, empty string is returned
 *
 * @param {date time} dateTime - date time to be formatted
 *
 * @returns {string}
 */
function getFormattedDateTimeString(dateTime) {
  return getDateAsStringFollowingFormat(dateTime, FORMAT_DATETIME)
}

/**
 * getFormattedTimeString
 * Returns the time parameter as a string formatted
 *   HH:mm
 * if the time parameter is empty, empty string is returned
 *
 * @param {date} time - time to be formatted
 *
 * @returns {string}
 */
function getFormattedTimeString(time) {
  return getDateAsStringFollowingFormat(time, FORMAT_TIME)
}

/**
 * getFormattedDateWithUncertaintyString
 * Returns the date parameter as a string formatted
 *   YYYY-MM-DD
 * if there is any uncertainty, it is appended to the end
 * if the date parameter is empty, empty string is returned
 *
 * @param {date} date - date to be formatted
 * @param {Array} uncertainty - array of string values corresponding to the uncertainty of the date parameter
 *
 * @returns {string}
 */
function getFormattedDateWithUncertaintyString(date, uncertainty) {
  if (date != null & date != undefined) {
    return getFormattedDateString(date) + getNumericUncertaintyString(uncertainty)
  }
  else {
    return ""
  }
}

/**
 * getFormattedDateTimeWithUncertaintyString
 * Returns the dateTime parameter as a string formatted
 *   YYYY-MM-DD HH:mm
 * if there is any uncertainty, it is appended to the end
 * if the date parameter is empty, empty string is returned
 *
 * @param {date} dateTime - date time to be formatted
 * @param {Array} uncertainty - array of string values corresponding to the uncertainty of the date parameter
 *
 * @returns {string}
 */
function getFormattedDateTimeWithUncertaintyString(dateTime, uncertainty) {
  if (dateTime != null && dateTime != undefined) {
    return getFormattedDateTimeString(dateTime) + getNumericUncertaintyString(uncertainty)
  }
  else {
    return ""
  }
}

/**
 * getFormattedTimeWithUncertaintyString
 * Returns the time parameter as a string formatted
 *   HH:mm
 * if there is any uncertainty, it is appended to the end
 * if the time parameter is empty, empty string is returned
 *
 * @param {date} time - time to be formatted
 * @param {Array} uncertainty - array of string values corresponding to the uncertainty of the time parameter
 *
 * @returns {string}
 */
function getFormattedTimeWithUncertaintyString(time, uncertainty) {
  if (time != null && time != undefined) {
    return getFormattedTimeString(time) + getNumericUncertaintyString(uncertainty)
  }
  else {
    return ""
  }
}

/**
 * getFormattedDateFromPartsString
 * Returns a string in the format
 *   YYYY-MM-DD
 * if the date parameter is populated, that will be used
 * otherwise the individual component parameters will be used to construct the date string
 * if the year value is empty, empty string will be returned
 * if the month and/or date valuea re empty, 01 will be used
 *
 * @param {date} date - specific date value to be formatted and returned
 * @param {number} year - 4 digit number representing the year
 * @param {number} month - number representing the month (1 - 12)
 * @param {number} day - number representing the day (1 - 31)
 * 
 * @returns {string}
 */
 function getFormattedDateFromPartsString(date, year, month, day) {
  //initialze return
  var ret = "";

  //if date is populated
  if (date != null && date != undefined) {
    //set return value to the formatted date string
    ret = getFormattedDateString(date);
  }
  //otherwise, build date from parts
  else {
    //if year is populated
    if (year > 0) {
      //set return value to year + hyphen
      ret = year + "-";

      //if month is populated
      if (month > 0) {
        //append return value with left-padded month value + hyphen
        ret += getLeftPaddedNumberString(month, "00", false) + "-";
      }
      //otherwise
      else {
        //append return value with January + hyphen
        ret += "01-"
      }

      //if day is populated
      if (day > 0) {
        //append return value with left-padded day value
        ret += getLeftPaddedNumberString(day, "00", false);
      }
      //otherise
      else {
        //append return value with 1st of the month
        ret += "01";
      }
    }  
  }
  //return
  return ret
 }

/**
 * getFormattedDateForEndFromPartsString
 * Returns a string in the format
 *   YYYY-MM-DD
 * If the date parameter is provided it is used.
 * Otherwise, the output string is constructed from the other parameters.
 * If a month is not provided "12" is used.
 * If a day is not provided, the last day of the month parameter is used.
 * Respects leap years, so day will be "29" on a leap year.
 *
 * @param {date} date - specific date to format
 * @param {number} year - year value to format
 * @param {number} month - month value to format
 * @param {number} day - day value to format
 * 
 * @returns {string}
 */
function getFormattedDateForEndFromPartsString(date, year, month, day) {
  //initialze return
  var ret = "";

  //if date is populated
  if (date != null && date != undefined) {
    //set return value to the formatted date string
    ret = getFormattedDateString(date);
  }
  //otherwise, build date from parts
  else {
    //if year is populated
    if (year > 0) {
      //set return value to year + hyphen
      ret = year + "-";

      //if month is populated
      if (month > 0) {
        //append return value with left-padded month value + hyphen
        ret += getLeftPaddedNumberString(month, "00", false) + "-";
      }
      //otherwise
      else {
        //append return value with December + hyphen
        ret += "12-"
        month = 12;
      }

      //if day is populated
      if (day > 0) {
        //append return value with left-padded day value
        ret += getLeftPaddedNumberString(day, "00", false);
      }
      //otherise
      else {
        //if monthPart is a month with 30 days
        if (monthsWith30Days.indexOf(month) != -1) {
          //appeand return value with 30
          ret += "30";
        }
        //if monthPart is a month with 31 days
        else if (monthsWith31Days.indexOf(month) != -1) {
          //append return value with 31
          ret += "31";
        }
        //if monthPart is February
        else if (month == 2) {
          //if it's a leap year
          if (isLeapYear(year)) {
            //append return value with 29
            ret += "29";
          }
          //otherwise
          else {
            //append return value with 28
            ret += "28";
          }
        }
      }
    }  
  }
  //return
  return ret
 }

/**
 * getFormattedDateWithUncertaintyFromPartsString
 * Returns a string in the format
 *   YYYY-MM-DD
 * if any of the date components have uncertainty, it is appended to the appropriate section
 * if the date parameter is populated, that will be used
 * otherwise the individual component parameters will be used to construct the date string
 *
 * @param {date} date - specific date value to be formatted and returned
 * @param {Array} dateUnc - array of strings corresponding to the uncertainty of the date parameter
 * @param {number} year - 4 digit number representing the year
 * @param {Array} yearUnc - array of strings corresponding to the uncertainty of the year parameter
 * @param {number} month - number representing the month (1 - 12)
 * @param {Array} monthUnc - array of strings corresponding to the uncertainty of the month parameter
 * @param {number} day - number representing the day (1 - 31)
 * @param {Array} dayUnc - array of strings corresponding to the uncertainty of the day parameter
 * 
 * @returns {string}
 */
function getFormattedDateWithUncertaintyFromPartsString(date, dateUnc, year, yearUnc, month, monthUnc, day, dayUnc) {
  //initialize return
  var ret = "";

  //use date + dateUnc if date is populated
  if (date != null && date != undefined) {
    ret = getFormattedDateWithUncertaintyString(date, dateUnc);
  }
  else {
    //YEAR
    //if year is populated
    if (year > 0) {
      //set return value to year + uncertainty
      //ret = getFormattedNumberWithUncertaintyString(year, yearUnc);
      //ret = getLeftPaddedNumberWithUncertaintyString(year, "", yearUnc);
      //ret = getLeftPaddedNumberWithUncertaintyString(year, "", false, yearUnc);
      ret = getStringWithUncertaintyString(year.toString(), yearUnc);
    }

    //MONTH
    //if month is populated
    if (month > 0) {
      //if return value is already populated
      if (ret != "") {
        //add the hyphen separator
        ret += "-";
      }
      //append formatted month + uncertainty to return value
      //ret += getFormatted2DigitNumberWithUncertaintyString(month, monthUnc);
      //ret += getLeftPaddedNumberWithUncertaintyString(month, "00", monthUnc);
      ret += getLeftPaddedNumberWithUncertaintyString(month, "00", false, monthUnc)
    }

    //DAY
    //if day is populated
    if (day > 0) {
      //if return value is already populated
      if (ret != "") {
        //add the hyphen separator
        ret += "-";
      }
      //append formatted day + uncertainty to return value
      //ret += getFormatted2DigitNumberWithUncertaintyString(day, dayUnc);
      ret += getLeftPaddedNumberWithUncertaintyString(day, "00", false, dayUnc)
    }
  }

  //return
  return ret
}

/**
 * getFormattedTimeFromPartsString
 * Returns a string in the format
 *   HH:mm
 * if the time parameter is populated, it will be used
 * otherwise the time string will be constructed with the other parameters
 * if the hour and or minute value is empty, "00" will be used
 * 
 * @param {date} time - specific time value to be formatted and returned
 * @param {number} hour - number value representing the hour (0 - 23)
 * @param {number} minute - number value representing the minute (0 - 59)
 *
 * @returns {string}
 */ 
function getFormattedTimeFromPartsString(time, hour, minute) {
  //initialize return value
  var ret = "";

  //if the time value is populated
  if (time != null && time != undefined) {
    //set return value to formatted time string
    ret = getFormattedTimeString(time);
  }
  //otherwise, construct time from other parameters
  else {
    //set return value to hour : mm
    ret = getLeftPaddedNumberString(hour, "00", true) + ":" + getLeftPaddedNumberString(minute, "00", true);
  }
  
  return ret
}

/**
 * getFormattedTimeWithUncertaintyFromPartsString
 * Returns a string in the format
 *   HH:mm
 * if any of the time components have uncertainty, it is appended in the appropriate section
 * if the time parameter is populated, it will be used
 * otherwise the time will be constructed using the other parameters
 *
 * @param {date} time - specific time value to be formatted and returned
 * @param {Array} timeUnc - array of strings corresponding to the uncertainty of the time parameter
 * @param {number} hour - number value representing the hour (0 - 23)
 * @param {Array} hourUnc - array of strings corresponding to the uncertainty of the hour parameter
 * @param {number} minute - number value representing the minute (0 - 59)
 * @param {Array} minuteUnc - array of strings corresponding to the uncertainty of the minute parameter
 *
 * @returns {string}
 */
function getFormattedTimeWithUncertaintyFromPartsString(time, timeUnc, hour, hourUnc, minute, minuteUnc) {
  //initiatlize return
  var ret = "";

  //if the time parameter is populated
  if (time != null && time != undefined) {
    ret = getFormattedTimeWithUncertaintyString(time, timeUnc);
  }
  else {
    //HOUR
    //if the hour parameter is populated
    if (hour > -1) {
      //set return value to the formatted hour + uncertainty
      //ret = getFormatted2DigitNumberWithUncertaintyString(hour, hourUnc);
      ret = getLeftPaddedNumberWithUncertaintyString(hour, "00", true, hourUnc)
    }

    //MINUTE
    //if the minute parameter is populated
    if (minute > -1) {
      //if the return value is already populated
      if (ret != "") {
        //append with the colon separator
        ret += ":";
      }
      //else, the return value is empty
      else {
        //set time to "HH:" to indicate that there is a missing hour value for this minute 
        ret = "HH:";
      }
      //append return value with formatted minute + uncertainty
      //ret += getFormatted2DigitNumberWithUncertaintyString(minute, minuteUnc);
      ret += getLeftPaddedNumberWithUncertaintyString(minute, "00", true, minuteUnc)
    }
  }

  //return
  return ret
}

/**
 * getFormattedDateTimeFromPartsString
 * Returns a string in the format
 *   YYYY-MM-DD HH:mm
 * if the date and/or time values are populated, they are used
 * otherwise the date time string is constructed from the other parameters
 * if the year value is empty, empty string is returned
 * if the month and/or day values ar empty, 01 is used to represent the first month and/or day
 * if the hour and/or minute values are empty, 00 is used to represent the first hour and minute
 *
 * @param {date} date - specific date value to be formatted and returned
 * @param {date} time - specific time value to be formatted and returned
 * @param {number} year - 4 digit number representing the year
 * @param {number} month - number representing the month (1 - 12)
 * @param {number} day - number representing the day (1 - 31)
 * @param {boolean} includeTime - true = include a time stringin the output, false = do not
 * @param {date} time - specific time value to be formatted and returned
 * @param {number} hour - number value representing the hour (0 - 23)
 * @param {number} minute - number value representing the minute (0 - 59)
 *
 * @returns {string}
 */ 
function getFormattedDateTimeFromPartsString(date, year, month, day, includeTime, time, hour, minute) {
  //initialize return value
  var ret = "";

  //set return value to formatted date string
  ret = getFormattedDateFromPartsString(date, year, month, day);

  //if return value is not empty and instructed to include time string
  if (ret != "" && includeTime) {
    ret += " " + getFormattedTimeFromPartsString(time, hour, minute);
  }

  //return
  return ret
}

/**
 * getFormattedDateTimeWithUncertaintiesFromPartsString
 * Returns a string in the format 
 *   YYYY-MM-DD HH:mm
 * if any of the date  or timecomponents have uncertainty, it is appended to the appropriate section
 * if the date parameter is populated, that will be used
 * otherwise the date string will be constructed using other date parameters
 * if the time parameter is populated, it will be used
 * otherwise the time string will be constructed using other time parameters
 * 
 * @param {date} date - specific date value to be formatted and returned
 * @param {Array} dateUnc - array of strings corresponding to the uncertainty of the date parameter
 * @param {number} year - 4 digit number representing the year
 * @param {Array} yearUnc - array of strings corresponding to the uncertainty of the year parameter
 * @param {number} month - number representing the month (1 - 12)
 * @param {Array} monthUnc - array of strings corresponding to the uncertainty of the month parameter
 * @param {number} day - number representing the day (1 - 31)
 * @param {Array} dayUnc - array of strings corresponding to the uncertainty of the day parameter
 * @param {boolean} includeTime - true = include a time string in the output, false = do not
 * @param {date} time - specific time value to be formatted and returned
 * @param {Array} timeUnc - array of strings corresponding to the uncertainty of the time parameter
 * @param {number} hour - number value representing the hour (0 - 23)
 * @param {Array} hourUnc - array of strings corresponding to the uncertainty of the hour parameter
 * @param {number} minute - number value representing the minute (0 - 59)
 * @param {Array} minuteUnc - array of strings corresponding to the uncertainty of the minute parameter
 *
 * @returns {string}
 */
function getFormattedDateTimeWithUncertaintiesFromPartsString(
  date, dateUnc, 
  year, yearUnc, 
  month, monthUnc, 
  day, dayUnc, 
  includeTime, 
  time, timeUnc,
  hour, hourUnc,
  minute, minuteUnc,
  def
  ) {
  //initialize return
  var ret = "";

  //get formatted date string
  var dateString = getFormattedDateWithUncertaintyFromPartsString(date, dateUnc, year, yearUnc, month, monthUnc, day, dayUnc);
  //get formatted time string
  var timeString = "";
  if (includeTime) {
    timeString = getFormattedTimeWithUncertaintyFromPartsString(time, timeUnc, hour, hourUnc, minute, minuteUnc);
  }
  //if both date and time string are not empty
  if (dateString != ""  && timeString != "") {
    //set return value to date + time string with space separator
    ret = dateString + " " + timeString;
  }
  //otherise
  else {
    //set return value to date + time string with no separator because only 1 can be populated or neither
    ret = dateString + timeString;
  }


  //if the date string is still empty, return the default value
  if (ret == "") {
    ret = def;
  }

  //return
  return ret
}
