import React, { useState } from 'react';
import { Row, Form, DatePicker, Button, Select, Typography, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import Tag from '../../components/errorSearchTag/ErrorSearchTag';
import { parameterKeyOptions, maxParameterKey, errorMessages, general } from '../../config';
import {
  orderArrayByValues,
  hasMoreThanOneDifferentValue,
  hasMoreValues,
  hasInvalidKeyForRangeValue,
  isValueOnOptionsLabel,
  isValueAlreadySelected,
  blockDatesBefore,
  blockDateStartOutOfRange,
  blockDateEndOutOfRange,
} from '../../utils';
import './errorSearch.css';
const { Item } = Form;
const { Option } = Select;
const { Title } = Typography;
const { displayDate } = general;
const ErrorSearch = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [isSearchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const [isDateEndPickerDisabled, setDateEndPickerDisabled] = useState(true);
  const parameterValues = parameterKeyOptions.map((parameter) => parameter.value);
  const onFinish = (values) => {
    const { creationDateStart, creationDateEnd } = form.getFieldsValue();
    if (blockDatesBefore(creationDateEnd, creationDateStart)) {
      message.error(errorMessages.onDateEndBeforeDateStartError);
      return;
    }
    form.resetFields();
    setDateEndPickerDisabled(true);
    setSearchButtonDisabled(true);
  };
  const validateOptionSelected = (selectValues) => {
    if (hasMoreThanOneDifferentValue(parameterValues, selectValues)) {
      message.error(errorMessages.onlyOneDifferentValue);
      selectValues.pop();
      form.setFieldsValue({ select: selectValues });
      return;
    }
    if (hasMoreValues(parameterValues, selectValues, maxParameterKey)) {
      message.error(errorMessages.onMoreThanMaxParameterKeyError(maxParameterKey));
      selectValues.pop();
      form.setFieldsValue({ select: selectValues });
      return;
    }
    if (hasInvalidKeyForRangeValue(selectValues)) {
      message.error(errorMessages.onInvalidKeyForRangeValueError);
      selectValues.pop();
      form.setFieldsValue({ select: selectValues });
      return;
    }
    if (isValueOnOptionsLabel(parameterKeyOptions, selectValues)) {
      const [option] = parameterKeyOptions.filter(
        (parameter) => parameter.label === selectValues[selectValues.length - 1],
      );
      selectValues.pop();
      selectValues.push(option.value);
      form.setFieldsValue({ select: selectValues });
      return;
    }
  };
  const onOptionSelect = (optionsSelected) => {
    validateOptionSelected(optionsSelected);
    form.setFieldsValue({ select: orderArrayByValues(parameterValues, optionsSelected) });
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
        <Item name="select">
          <Select
            mode="tags"
            placeholder="Meta Data Keys"
            tagRender={Tag}
            optionFilterProp="label"
            optionLabelProp="label"
            tokenSeparators={['']}
            onChange={(optionValue, option) => onOptionSelect(optionValue, option)}
          >
            {parameterKeyOptions.map(({ value, label }) => (
              <Option key={value} value={value} label={label}>
                <>
                  <EditOutlined /> {label}
                </>
              </Option>
            ))}
          </Select>
        </Item>
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={isSearchButtonDisabled}
            onClick={() => history.push('/dashboard')}
          >
            Search
          </Button>
        </Row>
      </Form>
    </Row>
  );
};
export default ErrorSearch;
