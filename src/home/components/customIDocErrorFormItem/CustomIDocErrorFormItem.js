import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import { editIDocErrorsFields, iDocErrorsFieldNames } from '../../constants/editErrors';
import { validateFieldValue } from '../../utils/validations/editErrors';
import { errorMessages, general } from '../../config';
import './CustomIDocErrorFormItem.css';
const { displayDate } = general;
const CustomIDocErrorFormItem = ({ field, selectValue }) => {
  const [inputValidationStatus, setInputValidationstatus] = useState({});
  const [inputType, setInputType] = useState('input');
  const [date, setDate] = useState(null);
  const { fields } = editIDocErrorsFields;
  const { DOCUMENT_NUMBER } = iDocErrorsFieldNames;
  const { onRequiredError, onInvalidSAPNoError } = errorMessages;
  const validateInputField = (currentValue) => {
    const { validations } = fields.find(({ label }) => label === selectValue);
    const isInputFieldValueCorrect = validateFieldValue(currentValue, validations);
    let validateStatus = '';
    let hasFeedback = false;
    if (isInputFieldValueCorrect) {
      validateStatus = 'success';
      hasFeedback = true;
    }
    setInputValidationstatus({ validateStatus, hasFeedback });
  };
  useEffect(() => {
    /* We verify if we are working with a date (a value coming from the select, like posting-date or document-date
      or if we are working with a date value coming from the date picker */
    if (selectValue.includes('date') || moment.isMoment(selectValue.value)) {
      setInputType('datepicker');
    } else {
      setInputType('input');
    }
  }, [selectValue]);
  const onDatePickerChange = (date, dateString) => {
    setDate(dateString);
    validateInputField(dateString);
  };
  const getRule = () => {
    return selectValue === DOCUMENT_NUMBER
      ? [
          { required: true, message: onRequiredError },
          { len: 10, message: onInvalidSAPNoError },
        ]
      : [{ required: true, message: onRequiredError }];
  };
  return (
    <Form.Item
      {...field}
      name={[field.name, 'value']}
      fieldKey={[field.fieldKey, 'value']}
      rules={getRule()}
      {...inputValidationStatus}
    >
      {inputType === 'datepicker' ? (
        <DatePicker
          onChange={onDatePickerChange}
          placeholder={displayDate}
          format={displayDate}
          value={date}
        />
      ) : (
        <Input onChange={(event) => validateInputField(event.target.value)} />
      )}
    </Form.Item>
  );
};
export default CustomIDocErrorFormItem;
