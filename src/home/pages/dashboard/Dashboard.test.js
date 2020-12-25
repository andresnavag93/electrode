import React from 'react';
import { Table } from 'antd';
import { shallow, mount } from 'enzyme';
import Dashboard from './Dashboard';
import ErrorsFilter from '../../components/errorsFilter/ErrorsFilter';
import '../../../../spec/helpers/enzyme';
describe('dashboard suite', () => {
  it('contains a table', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toBeDefined();
  });
  it('must render a Table', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find(Table).length).toBe(1);
  });
  it('must disable Edit and Reprocess buttons when checking select all checkbox', () => {
    const wrapper = mount(<Dashboard />);
    const selectAllCheckbox = wrapper.find('div.ant-table-selection .ant-checkbox-input');
    selectAllCheckbox.at(0).simulate('change', { target: { checked: true } });
    expect(wrapper.find('#errors-filter-reprocess-button').at(0)).toBeDisabled();
    expect(wrapper.find('#errors-filter-edit-button').at(0)).toBeDisabled();
  });
  it('must render ErrorsFilter component', () => {
    const wrapper = shallow(<ErrorsFilter />);
    expect(wrapper).toBeDefined();
  });
});
