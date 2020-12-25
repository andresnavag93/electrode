import React from 'react';
import { Modal, Form, Select, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CustomFormItem from '../customFormItem/CustomFormItem';
import { editErrorsFields } from '../../constants/editErrors';
// import isValidSession from './../../utils/isValidSession/isValidSession';
import './editErrors.css';
const { Option } = Select;
const { TextArea } = Input;
const EditErrors = ({ isModalVisible, closeModal }) => {
  const [form] = Form.useForm();
  const submitForm = () => {
    if (isValidSession()) {
      //   form
      //     .validateFields()
      //     .then((values) => {
      //       console.log(values);
      //       form.resetFields();
      //     })
      //     .catch((info) => {
      //       console.log('Validate Failed:', info);
      //     });
      // } else {
      //   // Redirects the user to the homepage so he can log in again
      //   window.location.replace('/');
      // }
      closeModal(false);
    }
  };
  return (
    <Modal
      visible={isModalVisible}
      title="Edit Error"
      onCancel={() => closeModal(false)}
      footer={[
        <Button key="cancel" onClick={() => closeModal(false)}>
          Cancel
        </Button>,
        <Button key="save" onClick={() => submitForm()}>
          Save
        </Button>,
        <Button key="save_reprocess" type="primary" onClick={() => submitForm()}>
          Submit
        </Button>,
      ]}
    >
      <p>(4) Errors Selected</p>
      <div className="editErrors__fields-placeholders-container">
        <div className="editErrors__icon-placeholder"></div>
        <p className="editErrors_field-placeholder">Field:</p>
        <p className="editErrors_field-placeholder">Value:</p>
      </div>
      <Form
        form={form}
        name="editErrors__form"
        className="editErrors__form"
        autoComplete="off"
        initialValues={{ errors: [''] }}
      >
        <Form.List name="errors">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
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
                        <Select>
                          {editErrorsFields.fields.map(({ label, value }) => (
                            <Option key={label} value={label}>
                              {value}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <CustomFormItem form={form} field={field} />
                </Space>
              ))}
              <Form.Item>
                <div className="editErrors__add-fields">
                  <PlusCircleOutlined
                    className="editErrors__add-field-icon"
                    onClick={() => add()}
                  />
                  Add a field to edit
                </div>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item name="comment" rules={[{ max: 500, message: 'The maximun its 500 characters' }]}>
          <TextArea rows={4} placeholder="Leave a comment" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EditErrors;
