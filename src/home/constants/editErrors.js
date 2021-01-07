import { REGEX, LENGTH, DATE } from './validationTypes';
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
export const editIDocErrorsFields = {
  fields: [
    {
      label: 'idoc-id',
      value: 'IDocs',
      validations: [
        {
          type: LENGTH,
          expectedValue: 16,
        },
      ],
    },
    {
      label: 'document-number',
      value: 'SAP Document No.',
      validations: [
        {
          type: LENGTH,
          expectedValue: 10,
        },
      ],
    },
    {
      label: 'document-date',
      value: 'Document date',
      validations: [
        {
          type: DATE,
          format: 'DD/MM/YYYY',
        },
      ],
    },
    {
      label: 'posting-date',
      value: 'Posting date',
      validations: [
        {
          type: DATE,
          format: 'DD/MM/YYYY',
        },
      ],
    },
  ],
};
