import React from 'react';
import { Form } from 'antd';
import { shallow, mount } from 'enzyme';
import EditIDocErrorFieldRow from './EditIdocErrorFieldRow';
import { MinusCircleOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
  field: {
    name: 0,
    key: 0,
    isListField: true,
    fieldKey: 0,
  },
  remove: jasmine.createSpy(),
};

describe('EditIDocErrorFieldRow', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Form name="editIDocError__form">
        <EditIDocErrorFieldRow {...defaultProps} />
      </Form>,
    );
  });

  it('it mounts without crashing', () => {
    const wrapper = shallow(
      <Form>
        <EditIDocErrorFieldRow {...defaultProps} />
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });
  it('when the remove icon is clicked the remove function is called with the correct parameter', () => {
    const { remove } = defaultProps;
    wrapper.find(MinusCircleOutlined).simulate('click');
    expect(remove).toHaveBeenCalledOnceWith(defaultProps.field.name);
  });
  it('when Document Date is selected in the select, a calendar suffix icon is shown in the inputs', () => {
    expect(wrapper.find(DownOutlined).length).toBe(1);
    wrapper.find('input#editIDocError__form_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find(CalendarOutlined).length).toBe(2);
    expect(wrapper.find(DownOutlined).length).toBe(0);
  });
  it('when Posting Date is selected in the select, a calendar suffix icon is shown in the inputs', () => {
    expect(wrapper.find(DownOutlined).length).toBe(1);
    wrapper.find('input#editIDocError__form_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    expect(wrapper.find(CalendarOutlined).length).toBe(2);
    expect(wrapper.find(DownOutlined).length).toBe(0);
  });
  it('when SAP Document No. option is selected, the calendar icon should not appear in the inputs', () => {
    expect(wrapper.find(CalendarOutlined).length).toBe(0);
    wrapper.find('input#editIDocError__form_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    expect(wrapper.find(DownOutlined).length).toBe(0);
    wrapper.find('input#editIDocError__form_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find(CalendarOutlined).length).toBe(0);
  });
  it('only three options appear in the select, and none of them is "IDocs"', () => {
    wrapper.find('input#editIDocError__form_0_field').at(0).simulate('mousedown');
    expect(wrapper.find('div.ant-select-item-option-content').length).toBe(3);
    expect(wrapper.find('div.ant-select-item-option-content').at(0)).not.toBe('IDocs');
    expect(wrapper.find('div.ant-select-item-option-content').at(1)).not.toBe('IDocs');
    expect(wrapper.find('div.ant-select-item-option-content').at(2)).not.toBe('IDocs');
  });
});
