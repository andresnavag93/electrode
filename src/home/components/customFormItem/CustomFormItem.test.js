import React from 'react';
import { Form } from 'antd';
import { shallow, mount } from 'enzyme';
import CustomFormItem from './CustomFormItem';
import '../../../../spec/helpers/enzyme';
const defaultProps = {
  form: {
    getFieldValue: () => {
      return [{ field: 'legacy-account', value: '1234567891' }];
    },
  },
  field: { name: 0, key: 0, isListField: true, fieldKey: 0 },
};
const validateInputOnChange = jasmine.createSpy();
describe('Custom form item', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Form>
        <CustomFormItem {...defaultProps} />
      </Form>,
    );
  });
  it('the component mounts without crashing', () => {
    expect(wrapper).toBeDefined();
  });
  it('when the users make a change on the input it should trigger a function', () => {
    wrapper
      .find('form.ant-form div.ant-form-item input.ant-input')
      .at(0)
      .simulate('change', { target: { value: '1234567891' } });
    expect(wrapper.find('form.ant-form div.ant-form-item span.anticon-check-circle').exists()).toBe(
      true,
    );
  });
});
