import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorCodesLink from './ErrorCodesLink';
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../../../../spec/helpers/enzyme';
describe('Error Codes View Detail: ', () => {
  const shallowWrapper = shallow(<ErrorCodesLink />);
  const mountWrapper = mount(<ErrorCodesLink />);
  it('the component mounts without crashing', () => {
    expect(shallowWrapper).toBeDefined();
  });
  it('must render one QuestionCircleOutlined component', () => {
    expect(shallowWrapper.find(QuestionCircleOutlined).length).toBe(1);
  });
  it('must find class error-codes-link__text-color', () => {
    expect(mountWrapper.find('.error-codes-link a.error-codes-link__text-color').length).toBe(1);
  });
});
