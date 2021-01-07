import React from 'react';
import { shallow, mount } from 'enzyme';
import { DatePicker, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import EditIDocError from './EditIDocError';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
  selectedError: {
    key: 4,
    status: 'updated',
    error: 'Errored IDoc',
    errorId: '',
    batchId: 'FN11052007280731',
    parentId: '9876543211',
    idocNo: '1000000003',
    cillId: 'FN110520072807301000000003',
    errorCode: '02',
    amount: 1000,
    reprocessCILL: '',
    creatationDate: '01/10/2020',
  },
};

describe('Edit IDoc Error', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditIDocError {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
  it('when the user opens the modal, one field should appear as default (IDoc number)', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    expect(
      wrapper.find('#editIDocError__form div.ant-space .ant-select-selection-item').text(),
    ).toBe('IDocs');
    expect(wrapper.find('#editIDocError__form_idoc-id').at(0).props()['value']).toBe('1000000003');
  });
  it('when the user clicks on the add field button, it should append the respective fields', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    wrapper.find(PlusCircleOutlined).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(2);
  });
  it('when the user clicks on the add field button three times, the add button should disappear', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find(PlusCircleOutlined).simulate('click');
    expect(wrapper.find(PlusCircleOutlined).length).toBe(0);
  });
  it('when the user clicks on the add field button, and selects SAP Document No. a normal input must be rendered', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(Input).length).toBe(1);
  });
  it('when the user clicks on the add field button, and selects Document Date a DatePicker must be rendered', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(DatePicker).length).toBe(
      1,
    );
  });
  it('when the user clicks on the add field button, and selects Posting Date a DatePicker must be rendered', () => {
    const wrapper = mount(<EditIDocError {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(DatePicker).length).toBe(
      1,
    );
  });
});
