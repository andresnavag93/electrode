import React from 'react';
import { Form, DatePicker } from 'antd';
import { mount } from 'enzyme';
import CustomIDocErrorFormItem from './CustomIDocErrorFormItem';
import '../../../../spec/helpers/enzyme';
const defaultProps = {
  field: {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0,
  },
};
describe('CustomIDocErrorFormItem', () => {
  it('the component mounts without crashing', () => {
    const wrapper = mount(
      <Form>
        <CustomIDocErrorFormItem {...defaultProps} selectValue="document-number" />
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });
  it('when selectValue equals document-date, a DatePicker should be rendered', () => {
    const wrapper = mount(
      <Form>
        <CustomIDocErrorFormItem {...defaultProps} selectValue="document-date" />
      </Form>,
    );
    expect(wrapper.find(DatePicker).length).toBe(1);
  });
  it('when selectValue equals posting-date, a DatePicker should be rendered', () => {
    const wrapper = mount(
      <Form>
        <CustomIDocErrorFormItem {...defaultProps} selectValue="posting-date" />
      </Form>,
    );
    expect(wrapper.find(DatePicker).length).toBe(1);
  });
});
