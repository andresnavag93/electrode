import React from 'react';
import { Form, InputNumber, Input, Select, Tooltip, DatePicker } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { blockDateStartOutOfRange } from '../../utils';
import { inputTypes } from '../../constants/searchErrors';

const { select, input, inputNumber, datePicker } = inputTypes;

export const CustomFilterFormItem = ({ type, filterObj, className, ...rest }) => {
  const { label, options, help, validations, format } = filterObj;

  const checkInputType = (type) => {
    switch (type) {
      case select:
        return (
          <Select
            suffixIcon={
              help && (
                <Tooltip title={help}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )
            }
            placeholder={label}
            options={options}
            {...rest}
          />
        );
      case inputNumber:
        return (
          <InputNumber
            suffix={
              help && (
                <Tooltip title={help}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )
            }
            placeholder={label}
            {...rest}
          />
        );
      case input:
        return (
          <Input
            suffix={
              help && (
                <Tooltip title={help}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )
            }
            placeholder={label}
            {...rest}
          />
        );
      case datePicker:
        return (
          <DatePicker
            placeholder={label}
            format={format}
            disabledDate={(current) => blockDateStartOutOfRange(current)}
          ></DatePicker>
        );
      default:
        break;
    }
  };
  return (
    <Form.Item name={label} className={className} rules={validations && validations}>
      {checkInputType(type)}
    </Form.Item>
  );
};
