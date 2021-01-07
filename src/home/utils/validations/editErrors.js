import { REGEX, LENGTH, DATE } from '../../constants/validationTypes';
import moment from 'moment';

export const validateFieldValue = (value, validations) => {
  let passedValidationCount = 0;
  validations.forEach(({ type, expectedValue, format }) => {
    if (type === LENGTH) {
      if (value.length === expectedValue) {
        passedValidationCount++;
      }
    } else if (type === REGEX) {
      const regex = RegExp(expectedValue);
      if (regex.test(value)) {
        passedValidationCount++;
      }
    } else if (type === DATE) {
      const date = moment(value, format);
      if (date.isValid()) {
        passedValidationCount++;
      }
    }
  });
  return passedValidationCount === validations.length ? true : false;
};
