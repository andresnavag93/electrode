import React from 'react';
import { shallow, mount } from 'enzyme';
import { Form } from 'antd';
import EditCillErrorNewValueInput from './EditCillErrorNewValueInput';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
  field: { name: 0, key: 0, isListField: true, fieldKey: 0 },
  posibleNewValues: [
    {
      label: '1234567890',
      value: '1234567890',
    },
    {
      label: '9876543210',
      value: '9876543210',
    },
    {
      label: '0123456789',
      value: '0123456789',
    },
  ],
};

describe('Edit Cill Error Select New Values input component', () => {
  it('the component mounts without crashing', () => {
    const wrapper = mount(
      <Form>
        <EditCillErrorNewValueInput {...defaultProps} />
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });

  it('on select a element it should display a check green icon', () => {
    const wrapper = mount(
      <Form>
        <EditCillErrorNewValueInput {...defaultProps} />
      </Form>,
    );
    wrapper.find('input').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('form.ant-form div.ant-form-item span.anticon-check-circle').exists()).toBe(
      true,
    );
  });
});
