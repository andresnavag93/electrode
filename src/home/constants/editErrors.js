import { REGEX, LENGTH, DATE } from './validationTypes';
export const errorTypes = {
  CILL_ERROR: 'CILL Error',
  ERRORED_IDOC: 'Errored IDoc',
};
export const editErrorsFields = {
  fields: [
    {
      label: 'legacy-account',
      value: 'Legacy Account',
      validations: [
        {
          type: LENGTH,
          expectedValue: 10,
        },
      ],
    },
    {
      label: 'division-number',
      value: 'Division Number',
      validations: [
        {
          type: LENGTH,
          expectedValue: 8,
        },
      ],
    },
    {
      label: 'store-number',
      value: 'Store Number',
      validations: [
        {
          type: LENGTH,
          expectedValue: 6,
        },
        {
          type: REGEX,
          expectedValue: '^[A-Z]{2}[0-9]{4}$',
        },
      ],
    },
  ],
};
export const iDocErrorsFieldNames = {
  IDOC_ID: 'idoc-id',
  DOCUMENT_NUMBER: 'document-number',
  DOCUMENT_DATE: 'document-date',
  POSTING_DATE: 'posting-date',
};
export const editIDocErrorsFields = {
  fields: [
    {
      label: iDocErrorsFieldNames.IDOC_ID,
      value: 'IDocs',
      validations: [
        {
          type: LENGTH,
          expectedValue: 16,
        },
      ],
    },
    {
      label: iDocErrorsFieldNames.DOCUMENT_NUMBER,
      value: 'SAP Document No.',
      validations: [
        {
          type: LENGTH,
          expectedValue: 10,
        },
      ],
    },
    {
      label: iDocErrorsFieldNames.DOCUMENT_DATE,
      value: 'Document date',
      validations: [
        {
          type: DATE,
          format: 'MM/DD/YYYY',
        },
      ],
    },
    {
      label: iDocErrorsFieldNames.POSTING_DATE,
      value: 'Posting date',
      validations: [
        {
          type: DATE,
          format: 'MM/DD/YYYY',
        },
      ],
    },
  ],
};
