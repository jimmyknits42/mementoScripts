/**
 * REQUIRED OTHER LIBRARIES
 *   moment.js
 */

/**
 * EXPECTED FIELDS
 *   "Location" - [GEO] - geoposition to indicate where the entry was recorded
 *   "Test" - [BL] - boolean to indicate that all durations have finished
 */

/**
 * createSourceEntry
 * Creates and persists a Source entry for the entry parameter
 * 
 * @param {entry} e - entry to create a Source entry for
 * @param {String} fieldName - name of the field in the Source library to fill
 *
 * @returns {entry}
 */
function createSourceEntry(e, fieldName) {
  //get Source library
  var sourceLib = libByName("Source");
  //get create moment
  var createMoment = moment().valueOf();
  //construct temp Source entry 
  var tmpSource = new Object();
  //populate details
  tmpDetails["Timestamp"] = createMoment;
  tmpDetails["Location"] = e.field("Location");
  tmpDetails["EntryBeganMoment"] = createMoment;
  tmpDetails["EntrySavedMoment"] = createMoment;
  tmpDetails["EntryLastUpdatedMoment"] = createMoment;
  tmpDetails["Test"] = e.field("Test");
  //persist Source entry
  var sourceEntry = sourceLib.create(tmpSource);
  //link entry paramter to Source entry
  sourceEntry.link(fieldName, sourceEntry);
  //return persisted Source entry
  return sourceEntry;
}