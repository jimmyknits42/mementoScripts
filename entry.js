/**
 * createAndLinkEntry
 * Creates an entry in the Entry library with all the identifying info about the currentEntry parameter
 * Requires the currentEntry to have the following fields
 *  - className [TX]
 *  - classNumber [NM]
 *  - entryNumber [NM]
 *  - entryID [TX]
 *  - displayID [TX]
 *  - Entry [RL-S]
 *
 * @param currentEntry {Object} - entry object to create an Entry entry for and link back to
 * 
 * @returns {Object}
 */
function createAndLinkEntry(currentEntry) {
  //get Entry library
  var entryLibrary = libByName("Entry");

  //get create moment
  var createMoment = moment().valueOf();

  //create temp object
  var tempEntry = new Object();

  //populate values
  //main
  tmpEntry["This MementoID"] = currentEntry.id;
  tmpEntry["This className"] = currentEntry.field("className");
  tmpEntry["This classNumber"] = currentEntry.field("classNumber");
  tmpEntry["This entryNumber"] = currentEntry.field("entryNumber");
  tmpEntry["This entryID"] = currentEntry.field("entryID");
  tmpEntry["This displayID"] = currentEntry.field("displayID");
  //meta
  tmpEntry["Timestamp"] = currentEntry.field("Timestamp");
  tmpEntry["Location"] = currentEntry.field("Location");
  tmpDetails["EntryBeganMoment"] = createMoment;
  tmpEntry["EntrySavedMoment"] = createMoment;
  tmpEntry["EntryLastUpdatedMoment"] = createMoment;
  tmpEntry["Test"] = currentEntry.field("Test");

  //persist new object
  var entryEntry = entryLibrary.create(tmpEntry);

  //link currentEntry to entryEntry
  currentEntry.link("Entry", entryEntry); 
  
  //return entryEntry
  return entryEntry 
}
