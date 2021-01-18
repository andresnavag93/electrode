import React from 'react';
import { shallow, mount } from 'enzyme';
import { Table } from 'antd';
import ErrorCodes from './ErrorCodes';
import '../../../../spec/helpers/enzyme';
describe('Error Codes View Detail: ', () => {
  const shallowWrapper = shallow(<ErrorCodes />);
  const mountWrapper = mount(<ErrorCodes />);
  it('the component mounts without crashing', () => {
    expect(shallowWrapper).toBeDefined();
  });
  it('must render one Table component', () => {
    expect(shallowWrapper.find(Table).length).toBe(1);
  });
  it('must render three table columns', () => {
    expect(mountWrapper.find('th.ant-table-cell').length).toBe(3);
    expect(mountWrapper.find('th.ant-table-cell').at(0).text()).toBe('Error Code');
    expect(mountWrapper.find('th.ant-table-cell').at(1).text()).toBe('Error Description');
    expect(mountWrapper.find('th.ant-table-cell').at(2).text()).toBe('Detailed Description');
  });
  it('must render only forty two Table rows', () => {
    expect(mountWrapper.find('tr.ant-table-row.ant-table-row-level-0').length).toBe(42);
  });
  it('must render a link with left arrow icon and back text', () => {
    expect(mountWrapper.find('a.error-codes-container__link').length).toBe(1);
    expect(mountWrapper.find('span.anticon.anticon-arrow-left').length).toBe(1);
  });
});
