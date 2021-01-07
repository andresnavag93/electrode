import React, { useState, useEffect, useRef } from 'react';
import { Form, Select, Input, Space } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import EditCillErrorNewValueInput from '../editCillErrorNewValueInput/EditCillErrorNewValueInput';
import { editErrorsFields } from '../../constants/editErrors';
import { toCamelCase } from '../../utils/index';
const { Option } = Select;
const EditFormFieldRow = ({
  remove,
  field,
  error,
  posibleNewFieldValues,
  selectedEditProp,
  setSelectedEditProp,
}) => {
  const [originalValue, setOriginalValue] = useState('');
  const [posibleNewValues, setPosibleNewValues] = useState([]);
  let lastSelectedValue = useRef('');
  const handleSelectChange = (value) => {
    setOriginalValue(error[toCamelCase(value)]);
    setPosibleNewValues(posibleNewFieldValues[toCamelCase(value)]);
    cleanSelectedValues(value);
  };
  const cleanSelectedValues = (value) => {
    const filteredSelectedItems = selectedEditProp.filter(
      (item) => item !== lastSelectedValue.current,
    );
    setSelectedEditProp([...filteredSelectedItems, value]);
    lastSelectedValue.current = value;
  };
  const removeRow = (fieldName, fieldKey) => {
    cleanSelectedValues();
    remove(fieldName);
  };
  return (
    <Space key={field.key} align="baseline">
      <MinusCircleOutlined onClick={() => removeRow(field.name, field.fieldKey)} />
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.errors !== curValues.errors}
      >
        {() => (
          <Form.Item
            {...field}
            name={[field.name, 'field']}
            fieldKey={[field.fieldKey, 'field']}
            rules={[{ required: true, message: 'Missing field' }]}
          >
            <Select onChange={handleSelectChange}>
              {editErrorsFields.fields.map(({ label, value }) => {
                const isOptionDisabled = selectedEditProp.includes(label);
                return (
                  <Option key={label} value={label} disabled={isOptionDisabled}>
                    {value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item
        {...field}
        name={[field.name, 'original_value']}
        fieldKey={[field.fieldKey, 'original_value']}
      >
        <Input placeholder={originalValue} disabled />
      </Form.Item>
      <EditCillErrorNewValueInput field={field} posibleNewValues={posibleNewValues} />
    </Space>
  );
};
export default EditFormFieldRow;
