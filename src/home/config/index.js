export const parameterKeyOptions = [
  { value: 'parentID', label: 'Parent ID' },
  { value: 'batchID', label: 'Batch ID' },
  { value: 'idocNumber', label: 'IDoc Number' },
  { value: 'cillUniqueIdentifier', label: 'CILL Unique Identifier' },
  { value: 'errorCode', label: 'Error Code' },
  { value: 'status', label: 'Status' },
];
export const maxParameterKey = 3;
export const colors = {
  blue: 'blue',
};
export const general = {
  dateFormat: 'YYYY-MM-DD',
  displayDate: 'YYYY / MM / DD',
};
export const errorMessages = {
  onRequiredError: 'This field is required',
  onlyOneDifferentValue: 'Please insert only a value',
  onMoreThanMaxParameterKeyError: (max) => `Please select a maximun of ${max} parameter key`,
  onInvalidKeyForRangeValueError: 'Range value applies only to Error Code',
  onRequiredStartDateError: 'Please select the start creation date',
  onRequiredEndDateError: 'Please select the end creation date',
  onDateEndBeforeDateStartError:
    'Creation date end must be greater or equal than creation date start',
};
