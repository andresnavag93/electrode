import React, { useContext, useEffect, useState } from 'react';
import { Row, Form, DatePicker, Button, Typography, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { errorMessages, general } from '../../config';
import { store } from '../../context/ContextProvider';
import { CILL } from '../../context/types';
import SearchBar from '../../components/searchBar/SearchBar';
import {
  blockDatesBefore,
  blockDateStartOutOfRange,
  blockDateEndOutOfRange,
  getSearchBarFiltersValue,
} from '../../utils';
import './errorSearch.css';
const { Item } = Form;
const { Title } = Typography;
const { displayDate } = general;
const { SET_FILTERS, RESET_FILTERS } = CILL;
const {
  onDateEndBeforeDateStartError,
  onRequiredStartDateError,
  onRequiredEndDateError,
} = errorMessages;
const ErrorSearch = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { dispatch } = useContext(store);
  const [isSearchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const [isDateEndPickerDisabled, setDateEndPickerDisabled] = useState(true);
  useEffect(() => {
    dispatch({ type: RESET_FILTERS });
  }, []);
  const setFilterValues = ({ creationStartDate, creationEndDate, select }) => {
    let payload = {};
    payload.creationStartDate = creationStartDate.format();
    payload.creationEndDate = creationEndDate.format();
    if (select) {
      payload = { ...payload, ...getSearchBarFiltersValue(select) };
    }
    dispatch({ type: SET_FILTERS, payload });
  };
  const onFinish = (values) => {
    const { creationStartDate, creationEndDate } = form.getFieldsValue();
    if (blockDatesBefore(creationEndDate, creationStartDate)) {
      message.error(onDateEndBeforeDateStartError);
      return;
    }
    setFilterValues(values);
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
            name="creationStartDate"
            label="Creation Date Start"
            rules={[{ required: true, message: onRequiredStartDateError }]}
          >
            <DatePicker
              allowClear={false}
              size="large"
              placeholder={displayDate}
              format={displayDate}
              disabledDate={(current) => blockDateStartOutOfRange(current)}
              onChange={(_) => setDateEndPickerDisabled(false)}
            />
          </Item>
          <Item
            className="date-picker-container"
            name="creationEndDate"
            label="Creation Date End"
            rules={[{ required: true, message: onRequiredEndDateError }]}
          >
            <DatePicker
              allowClear={false}
              disabled={isDateEndPickerDisabled}
              size="large"
              placeholder={displayDate}
              format={displayDate}
              disabledDate={(current) => {
                const startDate = form.getFieldValue('creationStartDate');
                return blockDateEndOutOfRange(current, startDate);
              }}
              onChange={(_) => setSearchButtonDisabled(false)}
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
