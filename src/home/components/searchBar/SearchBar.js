import React from 'react';
import { Form, Select, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Tag from '../errorSearchTag/ErrorSearchTag';
import { parameterKeyOptions, maxParameterKey, errorMessages } from '../../config';
import {
  orderArrayByValues,
  hasMoreThanOneDifferentValue,
  hasMoreValues,
  hasInvalidKeyForRangeValue,
  isValueOnOptionsLabel,
  isValueAlreadySelected,
} from '../../utils';
const { Item } = Form;
const { Option } = Select;
const SearchBar = ({ form, ...rest }) => {
  const parameterValues = parameterKeyOptions.map((parameter) => parameter.value);
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
    <Item name="select">
      <Select
        {...rest}
        mode="tags"
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
  );
};
export default SearchBar;
