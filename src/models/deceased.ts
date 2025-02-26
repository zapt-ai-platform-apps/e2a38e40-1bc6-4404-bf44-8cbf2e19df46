/**
 * @typedef {Object} Deceased
 * @property {number} id - Unique identifier
 * @property {string} name - Name of the deceased person
 * @property {Date} dateOfDeath - Date of death
 * @property {string} [description] - Optional description or tribute
 * @property {Date} createdAt - When the record was created
 */

/**
 * Formats a date of death to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDeathDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}