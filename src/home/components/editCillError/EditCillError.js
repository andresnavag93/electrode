import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Popover } from 'antd';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import EditFormFieldRow from '../editFormFieldRow/EditFormFieldRow';
import EditCillErrorPopoverData from '../editCillErrorPopoverData/EditCillErrorPopoverData';
import { editCillErrorPosibleFieldsValues } from '../../constants/editCillErrorPosibleFieldsValues';
const { TextArea } = Input;
const EditCillError = forwardRef(({ form, error }, ref) => {
  const [selectedEditProp, setSelectedEditProp] = useState([]);
  useImperativeHandle(ref, () => ({
    cleanSelectedEditProp() {
      setSelectedEditProp([]);
    },
  }));
  return (
    <>
      <Popover
        placement="bottom"
        trigger="click"
        content={<EditCillErrorPopoverData transactionLevelData={error.transactionLevelData} />}
      >
        Transaction Level Data <DownOutlined />
      </Popover>
      <div className="editErrors__fields-placeholders-container">
        <div className="editErrors__icon-placeholder"></div>
        <p className="editErrors_field-placeholder">Field:</p>
        <p className="editErrors_field-placeholder">Original Value:</p>
        <p className="editErrors_field-placeholder">New Value:</p>
      </div>
      <Form
        form={form}
        name="editErrors__form"
        className="editErrors__form"
        autoComplete="off"
        initialValues={{ fields: [''] }}
      >
        <Form.List name="fields">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <EditFormFieldRow
                  key={field.key}
                  remove={remove}
                  field={field}
                  error={error}
                  posibleNewFieldValues={editCillErrorPosibleFieldsValues}
                  selectedEditProp={selectedEditProp}
                  setSelectedEditProp={setSelectedEditProp}
                />
              ))}
              {fields.length < 3 && (
                <Form.Item>
                  <div className="editErrors__add-fields">
                    <PlusCircleOutlined
                      className="editErrors__add-field-icon"
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
});
export default EditCillError;
