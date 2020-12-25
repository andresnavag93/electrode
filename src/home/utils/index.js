import moment from 'moment';
/**
 * Compares two arrays and return a new array with the values that are in the base array
 * @param {*} baseArray to be compared
 * @param {*} array to compare
 */
export const getValuesFromBaseArray = (baseArray, array) => {
  return array.filter((value) => baseArray.includes(value));
};
/**
 * Compares two arrays and return a new array with the values that are not in the base array
 * @param {*} baseArray to be compared
 * @param {*} array to compare
 */
export const getValuesFromArrayOnly = (baseArray, array) => {
  return array.filter((value) => !baseArray.includes(value));
};
/**
 * Return a new array sorted by placing the values that match the array values at the beginning and leaving
 * the different values at the end
 * @param {*} arrayValues base array
 * @param {*} array to be sort
 */
export const orderArrayByValues = (arrayValues, array) => {
  const orderedArray = [
    ...getValuesFromBaseArray(arrayValues, array),
    ...getValuesFromArrayOnly(arrayValues, array),
  ];
  return orderedArray;
};
/**
 * Returns true if the array has more than one different value from baseArray
 * @param {*} baseArray
 * @param {*} array
 */
export const hasMoreThanOneDifferentValue = (baseArray, array) => {
  const otherValues = getValuesFromArrayOnly(baseArray, array);
  return otherValues.length > 1;
};
/**
 * Returns true if array has more values than maxValues from baseArray, returns false otherwise
 * @param {*} baseArray
 * @param {*} array
 * @param {*} maxValues
 */
export const hasMoreValues = (baseArray, array, maxValues) => {
  const valuesFromBaseArray = getValuesFromBaseArray(baseArray, array);
  return valuesFromBaseArray.length > maxValues;
};
/**
 * Validation for range value
 * - A range value applies only for error code parameter key
 * @param {*} selectValues
 * @param {*} optionValue
 */
export const hasInvalidKeyForRangeValue = (selectValues) => {
  // Scenarios: range value selected and range value inside of selected values
  if (selectValues.filter((option) => option.includes('-')).length) {
    return (
      (selectValues.includes('errorCode') && selectValues.length > 2) ||
      (!selectValues.includes('errorCode') && selectValues.length > 1)
    );
  }
  return false;
};
/**
 * Returns true if the last selected value match with some parameter label
 * @param {*} parameterKeyOptions
 * @param {*} selectValues
 */
export const isValueOnOptionsLabel = (parameterKeyOptions, selectValues) =>
  parameterKeyOptions.some(
    (parameter) => parameter.label === selectValues[selectValues.length - 1],
  );
/**
 * Returns true to block dates:
 * @param {*} current date
 */
export const blockDatesAfterToday = (current) => {
  const today = new Date();
  return moment(current).isAfter(today, 'day');
};
/**
 * Returns true to block dates: enable "days" before today and disable the previous ones
 * @param {*} current date
 */
export const blockDaysBefore = (current, days) => {
  const today = new Date();
  const daysBeforeCurrent = moment(today).subtract(days, 'days');
  return moment(current).isBefore(daysBeforeCurrent, 'day');
};
/**
 * Returns true to block dates: enable dates before today and disable the previous from "date"
 * @param {*} current date
 */
export const blockDatesBefore = (current, date) => {
  return moment(current).isBefore(date, 'days');
};
/**
 * Returns true to block dates: enable a range of dates from today to 14 days before
 * @param {*} current
 */
export const blockDateStartOutOfRange = (current) => {
  return blockDatesAfterToday(current) || blockDaysBefore(current, 14);
};
/**
 * Returns true to block dates: enable a range of dates from today to "date"
 * @param {*} current
 */
export const blockDateEndOutOfRange = (current, date) => {
  return blockDatesAfterToday(current) || blockDatesBefore(current, date);
};