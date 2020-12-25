import { REGEX, LENGTH } from './validationTypes';
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
