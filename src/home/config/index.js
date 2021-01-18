export const parameterKeyOptions = [
  { value: 'parentId', label: 'Parent ID' },
  { value: 'batchId', label: 'Batch ID' },
  { value: 'iDocNumber', label: 'IDoc Number' },
  { value: 'cillUId', label: 'CILL Unique Identifier' },
  { value: 'errorCode', label: 'Error Code' },
  { value: 'status', label: 'Status' },
];
export const maxParameterKey = 3;
/**
 * Standard colors to be used
 */
export const colors = {
  blue: 'blue',
};
/**
 * Formats in general
 */
export const general = {
  dateFormat: 'MM-DD-YYYY',
  displayDate: 'MM / DD / YYYY',
};
/**
 * Error messages
 */
export const errorMessages = {
  onRequiredError: 'This field is required',
  onlyOneDifferentValue: 'Please insert only a value',
  onMoreThanMaxParameterKeyError: (max) => `Please select a maximun of ${max} parameter key`,
  onInvalidKeyForRangeValueError: 'Range value applies only to Error Code',
  onRequiredStartDateError: 'Please select the start creation date',
  onRequiredEndDateError: 'Please select the end creation date',
  onDateEndBeforeDateStartError:
    'Creation date end must be greater or equal than creation date start',
  onMoreThanMaxCommentError: (max) => `The comment should not be longer than ${max} characters`,
  onInvalidSAPNoError: 'Invalid SAP Document No.',
  onUnacceptableCharactersError: 'Invalid value. Acceptable special characters: "-", ",", " "',
  onInvalidRangeValueError: 'Range value format must be: "minNumber-maxNumber"',
};
