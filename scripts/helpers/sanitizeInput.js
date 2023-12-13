/**
 * @param {string} str - The string to sanitize.
 * @returns {string} The sanitized string.
 * @example
 * sanitizeInput("This is a string with < and >");
 * // returns "This is a string with &lt; and &gt;"
 * sanitizeInput("This is a string with < and >");
 * // returns "This is a string with &lt; and &gt;"
 */
export function sanitizeInput(str) {
  // Create a map of special characters and their HTML entities.
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };

  // Loop through the map and replace each special character with its HTML entity.
  const reg = /[&<>"']/gi;
  return str.replace(reg, match => map[match]);
}
