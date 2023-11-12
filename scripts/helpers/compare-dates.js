/**
 * Determines if a given date falls within the same week as a reference date.
 * The week is considered to start on Sunday and end on Saturday.
 *
 * @param {string} today - The reference date in YYYY-MM-DD format.
 * @param {string} targetDate - The date to compare, in YYYY-MM-DD format.
 * @returns {boolean} True if 'targetDate' is within the same week as 'today', otherwise false.
 */
export function thisWeek(today, targetDate) {
  // Convert 'today' to a Date object
  let currentDate = new Date(today);

  // Adjust to the start of the week (Sunday)
  let firstDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  );

  // Calculate the last day of the week (Saturday)
  let lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // Ensure that times are set to 0:00:00 for accurate comparison
  firstDayOfWeek.setHours(0, 0, 0, 0);
  lastDayOfWeek.setHours(23, 59, 59, 999);

  // Convert 'targetDate' to a Date object for comparison
  let formattedTargetDate = new Date(targetDate);
  formattedTargetDate.setHours(0, 0, 0, 0);

  // Compare dates
  return (
    formattedTargetDate >= firstDayOfWeek &&
    formattedTargetDate <= lastDayOfWeek
  );
}

/**
 * Determines if a given date is in the same month and year as a reference date.
 *
 * @param {string} today - The reference date in YYYY-MM-DD format.
 * @param {string} targetDate - The date to compare, in YYYY-MM-DD format.
 * @returns {boolean} True if 'targetDate' is in the same month and year as 'today', otherwise false.
 */
export function thisMonth(today, targetDate) {
  const referenceDate = new Date(today);
  const comparisonDate = new Date(targetDate);

  return (
    referenceDate.getMonth() === comparisonDate.getMonth() &&
    referenceDate.getFullYear() === comparisonDate.getFullYear()
  );
}

/**
 * Determines if a given date is in the same year as a reference date.
 *
 * @param {string} today - The reference date in YYYY-MM-DD format.
 * @param {string} targetDate - The date to compare, in YYYY-MM-DD format.
 * @returns {boolean} True if 'targetDate' is in the same year as 'today', otherwise false.
 * */
export function thisYear(today, targetDate) {
  // Convert 'today' to a Date object
  const referenceDate = new Date(today);

  // Convert 'targetDate' to a Date object for comparison
  const comparisonDate = new Date(targetDate);

  // Compare years
  return referenceDate.getFullYear() === comparisonDate.getFullYear();
}
