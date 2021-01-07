import React, { useState } from 'react';
import { Form, Select, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EditIDocErrorFieldRow from '../editIDocErrorFieldRow/EditIdocErrorFieldRow';
import './editIDocError.css';

const { Option } = Select;
const { TextArea } = Input;

const EditIDocError = ({ form, selectedError }) => {
  const [formValues, setFormValues] = useState([]);

  const onValuesChange = (values) => {
    setFormValues(values);
  };
  return (
    <>
      <div className="editIDocError__fields-placeholders-container">
        <div className="editIDocError__icon-placeholder"></div>
        <p className="editIDocError__field-placeholder">Field:</p>
        <p className="editIDocError__field-placeholder">Value:</p>
      </div>
      <Form
        form={form}
        name="editIDocError__form"
        className="editIDocError__form"
        autoComplete="off"
        initialValues={{ 'idoc-id': selectedError.idocNo }}
        onValuesChange={onValuesChange}
      >
        <Space align="baseline">
          <MinusCircleOutlined />
          <Form.Item>
            <Select name="idoc-id-select" value="idoc-id" disabled={true}>
              <Option value="idoc-id" title="IDocs">
                IDocs
              </Option>
            </Select>
          </Form.Item>
          <Form.Item name="idoc-id">
            <Input disabled={true} />
          </Form.Item>
        </Space>
        <Form.List name="fields" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <EditIDocErrorFieldRow key={field.key} remove={remove} field={field} />
              ))}
              {fields.length < 3 && (
                <Form.Item>
                  <div className="editIDocError__add-fields">
                    <PlusCircleOutlined
                      className="editIDocError__add-field-icon"
                      onClick={() => add()}
                    />
                    Add a field to edit
                  </div>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
        <Form.Item
          name="comment"
          rules={[{ max: 500, message: 'The comment should not be longer than 500 characters' }]}
        >
          <TextArea rows={4} placeholder="Leave a comment" />
        </Form.Item>
      </Form>
    </>
  );
};
export default EditIDocError;
