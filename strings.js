/**
 * pad
 * Returns the str padded with pad, either left or right
 *
 * @param {string} pad - string of desired length with values to pad
 * @param {string} str - string to be padded
 * @param {boolean} padLeft - indicates whether padding left or right
 *
 * @returns {string}
 */
 function pad(pad, str, padLeft) {
  if (typeof str === 'undefined') 
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}
