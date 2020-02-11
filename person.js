/**
 * getPersonString
 * Returns a string representing a person/people from the available fields
 * If there are more than one person within a field, they are comma-separated
 * If more than one field is populated, they are separed by " and "
 *
 * @param {Array} pRef - the value of the Person Reference field, provide an empty array if Library doesn't have this field
 * @param {Object} pContact - the value of the Person Contact field, provide null if Library doesn't have this field
 * @param {string} pText - the value of the Person Text field, provide empty string if Library doesn't have this field
 *
 * @returns {string}
 */
function getPersonString(pRef, pContact, pText) {
   var person = "";

   //reference
   if (pRef.length > 0) {
      person = pRef[0].field("displayID");
      if (pRef.length > 1) {
         for (var i = 1; i < pRef.length; i++) {
            person += ", " + pRef[i].field("displayID");
         } 
      } 
   } 

   //contact
   if (pContact != null) {
      if (person != "") {
         person += " and ";
      }
      person += pContact.fullName;
      while (pContact.hasNext) {
         pContact = pContact.next;
         person += ", " + pContact.fullName;
      }
   }

   //text
   if (pText != "") {
      if (person != "") {
         person += " and ";
      }
      person += pText;
   }

   //return
   return person
}
