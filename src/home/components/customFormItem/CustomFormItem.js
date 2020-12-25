import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { editErrorsFields } from '../../constants/editErrors';
import { validateFieldValue } from '../../utils/validations/editErrors';
const CustomFormInput = ({ form, field }) => {
  const [inputValidationStatus, setInputValidationstatus] = useState({});
  const { fields } = editErrorsFields;
  const validateInputField = (currentValue, errors) => {
    const { field, value } = errors.find(({ value }) => value === currentValue);
    const { validations } = fields.find(({ label }) => label === field);
    const isInputFieldValueCorrect = validateFieldValue(value, validations);
    if (isInputFieldValueCorrect) {
      setInputValidationstatus({
        validateStatus: 'success',
        hasFeedback: true,
      });
    } else {
      setInputValidationstatus({
        validateStatus: '',
        hasFeedback: false,
      });
    }
  };
  return (
    <Form.Item
      {...field}
      name={[field.name, 'value']}
      fieldKey={[field.fieldKey, 'value']}
      rules={[{ required: true, message: 'Missing value' }]}
      {...inputValidationStatus}
    >
      <Input
        onChange={(event) => validateInputField(event.target.value, form.getFieldValue('errors'))}
      />
    </Form.Item>
  );
};
export default CustomFormInput;
