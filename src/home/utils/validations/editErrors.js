import { REGEX, LENGTH } from '../../constants/validationTypes';
export const validateFieldValue = (value, validations) => {
  let passedValidationCount = 0;
  validations.forEach(({ type, expectedValue }) => {
    if (type === LENGTH) {
      if (value.length === expectedValue) {
        passedValidationCount++;
      }
    } else if (type === REGEX) {
      const regex = RegExp(expectedValue);
      if (regex.test(value)) {
        passedValidationCount++;
      }
    }
  });
  return passedValidationCount === validations.length ? true : false;
};
