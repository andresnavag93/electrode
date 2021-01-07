import React, { useState } from 'react';
import { Form, Select, Space } from 'antd';
import { MinusCircleOutlined, DownOutlined, CalendarOutlined } from '@ant-design/icons';
import CustomIDocErrorFormItem from '../customIDocErrorFormItem/CustomIDocErrorFormItem';
import { editIDocErrorsFields } from '../../constants/editErrors';

const { Option } = Select;

const EditIDocErrorFieldRow = ({ remove, field }) => {
  const [selectValue, setSelectValue] = useState('document-number');
  const { key, name, fieldKey } = field;
  return (
    <Space key={key} align="baseline">
      <MinusCircleOutlined onClick={() => remove(name)} />
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => prevValues.fields !== curValues.fields}
      >
        {() => (
          <Form.Item
            {...field}
            name={[name, 'field']}
            fieldKey={[fieldKey, 'field']}
            rules={[{ required: true, message: 'Missing field' }]}
          >
            <Select
              onChange={(value) => setSelectValue(value)}
              suffixIcon={selectValue.includes('date') ? <CalendarOutlined /> : <DownOutlined />}
            >
              {editIDocErrorsFields.fields.map(({ label, value }) => {
                if (label !== 'idoc-id') {
                  return (
                    <Option key={label} value={label} title={value}>
                      {value}
                    </Option>
                  );
                }
              })}
            </Select>
          </Form.Item>
        )}
      </Form.Item>
      <CustomIDocErrorFormItem field={field} selectValue={selectValue} />
    </Space>
  );
};
export default EditIDocErrorFieldRow;
