/**
 * REQUIRED OTHER LIBRARIES
 *   n/a
 */

/**
 * EXPECTED FIELDS
 *   "libraryName" - [TX] - the name of the Memento library
 *   "className" - [TX] - my name for the class (no spaces, camelCase)
 *   "entryNumber" - [NM] - unique number for the entry
 *   "entryID" - [JS:TX] - my unique identifier of the entry
 *   "displayID" - [JS:TX] - display form of the entry
 */

/**
 * createAndLinkEntry
 * Creates an entry in the Entry library with all the identifying info about the entry parameter
 * Requires the entry parameter to have the following fields
 *  - libraryName [TX]
 *  - className [TX]
 *  - classNumber [NM]
 *  - entryNumber [NM]
 *  - entryID [TX]
 *  - displayID [TX]
 *  - Entry [RL-S]
 *
 * @param entry {Object} - entry object to create an Entry entry for and link back to
 * 
 * @returns {Object}
 */
function createAndLinkEntry(entry) {
  //get Entry library
  var entryLibrary = libByName("Entry");

  //get create moment
  var createMoment = moment().valueOf();

  //construct temmp entry
  var tmpEntry = {
    "This libraryName": entry.field("libraryName"),
    "This MementoID":  entry.id,
    "This className": entry.field("className"),
    "This classNumber": entry.field("classNumber"),
    "This entryNumber": entry.field("entryNumber"),
    "This entryID": entry.field("entryID"),
    "This displayID": entry.field("displayID"),
    "Timestamp": entry.field("Timestamp"),
    "Location": entry.field("Location"),
    "EntryBeganMoment": createMoment,
    "EntrySavedMoment": createMoment,
    "EntryLastUpdatedMoment": createMoment,
    "Test": entry.field("Test"),
  }
  
  //persist new object
  var entryEntry = entryLibrary.create(tmpEntry);

  //link entry to entryEntry
  entry.link("Entry", entryEntry); 
  
  //return entryEntry
  return entryEntry 
}

/**
 * getEntryID
 * Returns a string representing the entry number for the entry parameter
 *
 * @param {entry} e - entry to return the entryID for
 *
 * @returns {string}
 */
function getEntryID(e) {
  //initialize
  var c = "";

  //if classNumber exists
  if (e.field("classNumber") > 0) {
    //set c to classNumber
    c = e.field("classNumber");
  }
  //else if the className exists
  else if (e.field("className") != "") {
    //set c to the className
    c = e.field("className");
  }

  //if c is not empty
  if (c != "") {
    //add the separator
    c += "$";
  }

  //return c + entryNumber
  return c + e.field("entryNumber");
} 
