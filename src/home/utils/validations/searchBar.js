import { isFunction } from 'lodash';
import { errorMessages, maxParameterKey, parameterKeyOptions } from '../../config';
import {
  hasMoreThanOneDifferentValue,
  hasMoreValues,
  hasInvalidKeyForRangeValue,
  hasUnacceptableCharacters,
  isValueOnOptionsLabel,
  isInvalidRangeValue,
} from '../../utils';
const {
  onlyOneDifferentValue,
  onMoreThanMaxParameterKeyError,
  onInvalidKeyForRangeValueError,
  onUnacceptableCharactersError,
  onInvalidRangeValueError,
} = errorMessages;
export const errorTypes = {
  HAS_MORE_THAN_ONE_DIFFERENT_VALUE: 'hasMoreThanOneDifferentValue',
  HAS_UNACCEPTABLE_CHARACTERS: 'hasUnacceptableCharacters',
  HAS_MORE_VALUES: 'hasMoreValues',
  HAS_INVALID_KEY_FOR_RANGE_VALUE: 'hasInvalidKeyForRangeValue',
  IS_VALUE_ON_OPTIONS_LABEL: 'isValueOnOptionsLabel',
  IS_INVALID_RANGE_VALUE: 'isInvalidRangeValue',
};
export const searchBarValidation = (parameterValues, selectValues, callback) => {
  let errorObject = {};
  if (hasMoreThanOneDifferentValue(parameterValues, selectValues)) {
    errorObject.type = errorTypes.HAS_MORE_THAN_ONE_DIFFERENT_VALUE;
    errorObject.errorMessage = onlyOneDifferentValue;
    isFunction(callback) && callback(errorObject);
    return;
  }
  if (hasUnacceptableCharacters(parameterValues, selectValues)) {
    errorObject.type = errorTypes.HAS_UNACCEPTABLE_CHARACTERS;
    errorObject.errorMessage = onUnacceptableCharactersError;
    isFunction(callback) && callback(errorObject);
    return;
  }
  if (hasMoreValues(parameterValues, selectValues, maxParameterKey)) {
    errorObject.type = errorTypes.HAS_MORE_VALUES;
    errorObject.errorMessage = onMoreThanMaxParameterKeyError(maxParameterKey);
    isFunction(callback) && callback(errorObject);
    return;
  }
  if (hasInvalidKeyForRangeValue(selectValues)) {
    errorObject.type = errorTypes.HAS_INVALID_KEY_FOR_RANGE_VALUE;
    errorObject.errorMessage = onInvalidKeyForRangeValueError;
    isFunction(callback) && callback(errorObject);
    return;
  }
  if (isInvalidRangeValue(selectValues)) {
    errorObject.type = errorTypes.IS_INVALID_RANGE_VALUE;
    errorObject.errorMessage = onInvalidRangeValueError;
    isFunction(callback) && callback(errorObject);
    return;
  }
  if (isValueOnOptionsLabel(parameterKeyOptions, selectValues)) {
    errorObject.type = errorTypes.IS_VALUE_ON_OPTIONS_LABEL;
    errorObject.errorMessage = '';
    isFunction(callback) && callback(errorObject);
    return;
  }
  isFunction(callback) && callback(errorObject);
  return;
};
