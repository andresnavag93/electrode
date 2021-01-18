export const inputTypes = {
  input: 'input',
  inputNumber: 'inputNumber',
  datePicker: 'datePicker',
  select: 'select',
};
export const errorTypes = {
  CILLType: 'CILL',
  IDOCType: 'IDOC',
  None: 'None',
};
export const searchErrors = {
  IDOC: {
    batchID: {
      label: 'Batch ID',
      help: 'Max (20) e.g: Parent ID + YYMMDDhhmmss',
      validations: [
        {
          max: 20,
          message: '',
        },
      ],
    },
    iDocNumber: {
      label: 'IDoc Number',
      help: 'Max (8)',
      validations: [
        {
          max: 8,
          message: '',
        },
      ],
    },
    cillUniqueIdentifier: {
      label: 'CILL Unique Identifier',
      help: 'Max (28) e.g: Parent ID + YYMMDDhhmmss + 00000001',
      validations: [
        {
          max: 28,
          message: '',
        },
      ],
    },
    reprocessFromCill: {
      label: 'Reprocess from CILL Flag',
      options: [
        { label: 'X', value: 'X' },
        { label: 'Blank', value: 'Blank' },
      ],
    },
  },
  CILL: {
    errorID: {
      label: 'Error ID',
      help: 'Max(6)',
    },
  },
  General: {
    amountCondition: {
      label: 'Amount Condition',
      options: [
        { label: '>', value: '>' },
        { label: '<', value: '<' },
        { label: '=', value: '=' },
      ],
      help: 'Amount Greater than (>), Less than (<), Equal (=)',
    },
    amount: {
      label: 'Amount',
      help: 'Up to 2 decimals (0.00)',
    },
    creationDate: {
      label: 'Creation Date',
      format: 'YYYY-MM-DD',
    },
    parentID: {
      label: 'Parent ID',
      help: 'Max (8)',
      validations: [
        {
          max: 8,
          message: '',
        },
      ],
    },
    errorCode: {
      label: 'Error Code',
      help: 'IDOC Error (4) - CILL Internal Error (25)',
      validations: [
        {
          max: 25,
          message: '',
        },
      ],
    },
    errorType: {
      label: 'Error Type',
      options: [
        { label: 'CILL Error', value: 'CILL Error' },
        { label: 'Errored IDoc', value: 'Errored IDoc' },
      ],
    },
    status: {
      label: 'Status',
      options: [
        { label: 'Open', value: 'Open' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
      ],
    },
  },
};
export const SEARCH_BAR_PATTERN = /^([a-zA-Z\d]+[\s,-]?[a-zA-Z\d]*){0,}[a-zA-Z\d]$/g;
