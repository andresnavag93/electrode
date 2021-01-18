import moment from 'moment';
import { isSafeInteger, lte } from 'lodash';
import { SEARCH_BAR_PATTERN } from '../constants/searchErrors';
import { parameterKeyOptions } from '../config';
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
 * Returns true if value has unacceptable characters
 * @param {*} baseArray
 * @param {*} selectValues
 */
export const hasUnacceptableCharacters = (baseArray, selectValues) => {
  const arrayValues = getValuesFromArrayOnly(baseArray, selectValues);
  if (selectValues.length) {
    const regex = RegExp(SEARCH_BAR_PATTERN, 'g');
    return !regex.test(arrayValues[0]);
  }
  return false;
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
 * Validation for range valid value
 * - A range value is valid for numbers
 * - The format must be: minNumber-maxNumber
 * @param {*} selectValues
 */
export const isInvalidRangeValue = (selectValues) => {
  const rangeValue = selectValues.filter((option) => option.includes('-'))[0];
  if (rangeValue) {
    const arrayValues = rangeValue.split('-');
    const areValuesNumber = arrayValues.every((value) => isSafeInteger(+value));
    return arrayValues.length !== 2 || !areValuesNumber || lte(+arrayValues[1], +arrayValues[0]);
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
 * Returns an array with all the parameter values available
 */
export const getSearchBarParameterValues = () =>
  parameterKeyOptions.map((parameter) => parameter.value);
/**
 * Returns all the filters and its value as object
 * @param {*} selectValues
 */
export const getSearchBarFiltersValue = (selectValues) => {
  const filters = {};
  const rangeValue = selectValues.filter((option) => option.includes('-'));
  const parameterValues = getSearchBarParameterValues();
  if (rangeValue.length) {
    filters.errorCode = rangeValue[0];
  } else {
    const parametersSelected = getValuesFromBaseArray(parameterValues, selectValues);
    const values = getValuesFromArrayOnly(parameterValues, selectValues);
    if (parametersSelected.length) {
      parametersSelected.forEach((parameter) => {
        if (values.length) {
          filters[parameter] = values.toString();
        } else {
          filters[parameter] = 'selected';
        }
      });
    } else {
      filters.parentId = values.toString();
      filters.batchId = values.toString();
      filters.iDocNumber = values.toString();
      filters.cillUId = values.toString();
      filters.status = values.toString();
      filters.errorCode = values.toString();
    }
  }
  return filters;
};
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
/**
 * Return conversion from kebab-case to camelCase
 */
export const toCamelCase = (value) => {
  let arr = value.split('-');
  let capital = arr.map((item, index) =>
    index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase(),
  );
  let camelCaseString = capital.join('');
  return camelCaseString;
};
/**
 * Find if selected Error code its allow to be edited
 */
export const checkIfErrorCodeEditable = ({ errorCode }, allowErrorCodes) => {
  return allowErrorCodes.find((item) => item.errorCode === errorCode) ? true : false;
};
/**
 * Check if selected error type is Cill
 */
export const checkIfCillError = ({ error }) => {
  return error === 'CILL Error' ? true : false;
};
/**
 * Returns a string with dollar currency format
 * @param {*} amount
 */
export const formatToDollarCurrency = (amount) => {
  const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  return formatter.format(amount);
};
