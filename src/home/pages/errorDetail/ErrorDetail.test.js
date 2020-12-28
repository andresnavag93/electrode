import React from 'react';
import { shallow, mount } from 'enzyme';
import { Table, Button } from 'antd';
import ErrorDetail from './ErrorDetail';
import '../../../../spec/helpers/enzyme';

describe('IDoc Error View Detail: ', () => {
  const match = { params: { id: 0 } };
  const shallowWrapper = shallow(<ErrorDetail errorType="idoc" match={match} />);
  const mountWrapper = mount(<ErrorDetail errorType="idoc" match={match} />);

  it('the component mounts without crashing', () => {
    expect(shallowWrapper).toBeDefined();
  });

  it('must render one Table component', () => {
    expect(shallowWrapper.find(Table).length).toBe(1);
  });

  it('must render three table columns', () => {
    expect(mountWrapper.find('th.ant-table-cell').length).toBe(4);
    expect(mountWrapper.find('th.ant-table-cell').at(0).text()).toBe('Error No.');
    expect(mountWrapper.find('th.ant-table-cell').at(1).text()).toBe('Error Code');
    expect(mountWrapper.find('th.ant-table-cell').at(2).text()).toBe('Error Code Description');
    expect(mountWrapper.find('th.ant-table-cell').at(3).text()).toBe('Message');
  });

  it('must render only one Table row', () => {
    expect(mountWrapper.find('tr.ant-table-row.ant-table-row-level-0').length).toBe(1);
  });

  it('must render a button with left arrow icon and back text', () => {
    expect(mountWrapper.find(Button).length).toBe(1);
    expect(mountWrapper.find('span.anticon.anticon-arrow-left').length).toBe(1);
    expect(mountWrapper.find('span').at(1).text()).toBe('Back');
  });

  it('must render a title for the cill total errored amount', () => {
    expect(mountWrapper.find('span.ant-typography.error-detail__title').length).toBe(1);
  });
});
