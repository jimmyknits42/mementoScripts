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
