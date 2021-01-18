import React, { useState, useRef } from 'react';
import { Checkbox, Form, Select, Input, Space, Typography } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { isUndefined } from 'lodash';
import moment from 'moment';
import EditIDocErrorFieldRow from '../editIDocErrorFieldRow/EditIdocErrorFieldRow';
import { iDocErrorsFieldNames } from '../../constants/editErrors';
import { errorMessages } from '../../config';
import './editIDocError.css';
const { Option } = Select;
const { TextArea } = Input;
const { Text, Title } = Typography;
const { onRequiredError, onMoreThanMaxCommentError } = errorMessages;
const { IDOC_ID, DOCUMENT_NUMBER } = iDocErrorsFieldNames;
const EditIDocError = ({ form, selectedError, setSubmitButtonDisabled }) => {
  const [formValues, setFormValues] = useState([]);
  const checkMark = useRef();
  const checkFormValuesComplete = () => {
    const formFieldsValue = form.getFieldsValue();
    let checkPass = false;
    if (formFieldsValue.comment && formFieldsValue['mark-as-complete']) {
      if (!isUndefined(formFieldsValue.fields) && !formFieldsValue.fields.length) {
        setSubmitButtonDisabled(false);
        return;
      }
      formFieldsValue.fields.every((field) => {
        if (!isUndefined(field)) {
          switch (field.field) {
            case DOCUMENT_NUMBER:
              return (checkPass = !isUndefined(field.value) && field.value.length === 10);
            default:
              return (checkPass = moment.isMoment(field.value));
          }
        }
      });
    }
    setSubmitButtonDisabled(!checkPass);
  };
  const checkboxValidation = (_, value) =>
    value ? Promise.resolve() : Promise.reject(onRequiredError);
  const onCheckboxChange = (e) => {
    checkMark.current.state.checked = e.target.checked;
    form.setFieldsValue({ ...form.getFieldsValue(), 'mark-as-complete': e.target.checked });
    form.validateFields(['mark-as-complete']);
    checkFormValuesComplete();
  };
  const onValuesChange = (values) => {
    setFormValues(values);
    checkFormValuesComplete();
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
            <Select name="idoc-id-select" value={IDOC_ID} disabled={true}>
              <Option value={IDOC_ID} title="IDocs">
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
          rules={[
            { required: true, message: onRequiredError },
            { max: 500, message: onMoreThanMaxCommentError(500) },
          ]}
        >
          <TextArea rows={4} placeholder="Leave a comment" />
        </Form.Item>
        <Title level={5}>
          <Text type="secondary">
            Mark as complete
            <Form.Item
              name="mark-as-complete"
              valuePropName="checked"
              rules={[{ validator: checkboxValidation }]}
            >
              <Checkbox onChange={onCheckboxChange} ref={checkMark}>
                <QuestionCircleOutlined />
              </Checkbox>
            </Form.Item>
          </Text>
        </Title>
      </Form>
    </>
  );
};
export default EditIDocError;
