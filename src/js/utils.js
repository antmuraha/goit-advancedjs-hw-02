export function addLeadingZero(value) {
  // 1. Convert the value to a string
  // 2. Use padStart to add leading zeros
  // 3. Return the padded string
  return String(value).padStart(2, '0');
}
