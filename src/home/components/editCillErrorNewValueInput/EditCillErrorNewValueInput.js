import React, { useState } from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

const EditCillErrorNewValueInput = ({ field, posibleNewValues }) => {
  const [inputValidationStatus, setInputValidationstatus] = useState({});

  const handleChange = (value) => {
    setInputValidationstatus({
      validateStatus: 'success',
      hasFeedback: true,
    });
  };

  const handleSearch = (value) => {
    if (value !== '') {
      setInputValidationstatus({
        validateStatus: 'validating',
        hasFeedback: true,
      });
    } else {
      setInputValidationstatus({
        validateStatus: 'error',
        hasFeedback: true,
        help: 'Please select a correct value',
      });
    }
  };

  return (
    <Form.Item
      {...field}
      name={[field.name, 'new_value']}
      fieldKey={[field.fieldKey, 'new_value']}
      rules={[{ required: true, message: 'Missing value' }]}
      {...inputValidationStatus}
    >
      <Select
        showSearch
        showArrow={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        disabled={posibleNewValues.length == 0 ? true : false}
      >
        {posibleNewValues.map(({ label, value }) => (
          <Option key={label} value={label}>
            {label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default EditCillErrorNewValueInput;
