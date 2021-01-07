import React, { useState } from 'react';
import { Row, Form, DatePicker, Button, Typography, message } from 'antd';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
import { errorMessages, general } from '../../config';
import { blockDatesBefore, blockDateStartOutOfRange, blockDateEndOutOfRange } from '../../utils';
import './errorSearch.css';
const { Item } = Form;
const { Title } = Typography;
const { displayDate } = general;
const ErrorSearch = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isSearchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const [isDateEndPickerDisabled, setDateEndPickerDisabled] = useState(true);
  const onFinish = (values) => {
    const { creationDateStart, creationDateEnd } = form.getFieldsValue();
    if (blockDatesBefore(creationDateEnd, creationDateStart)) {
      message.error(errorMessages.onDateEndBeforeDateStartError);
      return;
    }
    form.resetFields();
    setDateEndPickerDisabled(true);
    setSearchButtonDisabled(true);
    history.push('/dashboard');
  };
  return (
    <Row justify="center" className="error-search-container">
      <Row justify="start" className="title-container">
        <Title level={4}>CILL Error Search</Title>
      </Row>
      <Form
        form={form}
        layout="vertical"
        name="errorSearch"
        className="error-search__form"
        onFinish={onFinish}
      >
        <SearchBar form={form} placeholder="Meta Data Keys" />
        <Row justify="space-between">
          <Item
            className="date-picker-container"
            name="creationDateStart"
            label="Creation Date Start"
            rules={[{ required: true, message: errorMessages.onRequiredStartDateError }]}
          >
            <DatePicker
              allowClear={false}
              size="large"
              placeholder={displayDate}
              format={displayDate}
              disabledDate={(current) => blockDateStartOutOfRange(current)}
              onChange={(date) => setDateEndPickerDisabled(false)}
            />
          </Item>
          <Item
            className="date-picker-container"
            name="creationDateEnd"
            label="Creation Date End"
            rules={[{ required: true, message: errorMessages.onRequiredEndDateError }]}
          >
            <DatePicker
              allowClear={false}
              disabled={isDateEndPickerDisabled}
              size="large"
              placeholder={displayDate}
              format={displayDate}
              disabledDate={(current) => {
                const startDate = form.getFieldValue('creationDateStart');
                return blockDateEndOutOfRange(current, startDate);
              }}
              onChange={(date) => setSearchButtonDisabled(false)}
            />
          </Item>
          <Button type="primary" htmlType="submit" size="large" disabled={isSearchButtonDisabled}>
            Search
          </Button>
        </Row>
      </Form>
    </Row>
  );
};
export default ErrorSearch;
