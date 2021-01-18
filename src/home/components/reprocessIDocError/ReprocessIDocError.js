import React from 'react';
import { Form, Radio, Space, Typography, Input } from 'antd';
import { errorMessages } from '../../config';
import './ReprocessIDocError.css';
import { isUndefined } from 'lodash';
const { Item } = Form;
const { Group } = Radio;
const { Title } = Typography;
export const ReprocessIDocError = ({ form, selectedError, setSubmitButtonDisabled }) => {
  const onValuesChange = () => {
    const formValues = form.getFieldsValue();
    if (!isUndefined(formValues.transformation)) {
      setSubmitButtonDisabled(false);
    }
  };
  return (
    <>
      <Title level={2} className="reprocessIDocError__subtitle">
        (1) IDocs Selected
      </Title>
      <Form
        form={form}
        name="reprocessIDocError__form"
        className="reprocessIDocError__form"
        onValuesChange={onValuesChange}
        initialValues={{ 'idoc-id': selectedError.idocNo }}
      >
        <Space align="baseline" className="reprocessIDocError__idocNumber">
          <Item name="idoc-id">
            <Input />
          </Item>
        </Space>
        <Space align="baseline">
          <Item
            name="transformation"
            rules={[{ required: true, message: errorMessages.onRequiredError }]}
          >
            <Group>
              <Radio value={true}>Reprocess IDocs with Transformation</Radio>
              <Radio value={false}>Reprocess IDocs with No Transformation</Radio>
            </Group>
          </Item>
        </Space>
      </Form>
    </>
  );
};
export default ReprocessIDocError;
