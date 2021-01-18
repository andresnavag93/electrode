import React from 'react';
import { Form, Select, message } from 'antd';
import { isEmpty } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import Tag from '../errorSearchTag/ErrorSearchTag';
import { parameterKeyOptions } from '../../config';
import { searchBarValidation, errorTypes } from '../../utils/validations/searchBar';
import { getSearchBarParameterValues, orderArrayByValues } from '../../utils';
const { Item } = Form;
const { Option } = Select;
const { IS_VALUE_ON_OPTIONS_LABEL } = errorTypes;
const SearchBar = ({ form, ...rest }) => {
  const parameterValues = getSearchBarParameterValues();
  const onOptionSelect = (optionsSelected) => {
    searchBarValidation(parameterValues, optionsSelected, (errorObject) => {
      if (!isEmpty(errorObject)) {
        const { type, errorMessage } = errorObject;
        if (type === IS_VALUE_ON_OPTIONS_LABEL) {
          const [option] = parameterKeyOptions.filter(
            (parameter) => parameter.label === selectValues[selectValues.length - 1],
          );
          optionsSelected.pop();
          optionsSelected.push(option.value);
        } else {
          message.error(errorMessage);
          optionsSelected.pop();
        }
        form.setFieldsValue({ select: optionsSelected });
      }
    });
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
        onChange={(optionValue, _) => onOptionSelect(optionValue)}
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
