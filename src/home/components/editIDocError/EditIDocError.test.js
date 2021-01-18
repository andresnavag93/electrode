import React from 'react';
import { shallow, mount } from 'enzyme';
import { DatePicker, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import '../../../../spec/helpers/enzyme';
import EditErrors from '../editErrors/EditErrors';
const defaultProps = {
  isModalVisible: true,
  closeModal: jasmine.createSpy(),
  selectedError: {
    key: 4,
    status: 'updated',
    error: 'Errored IDoc',
    errorId: '', // no
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
  let setSubmitButtonDisabled;
  beforeEach(() => {
    setSubmitButtonDisabled = jasmine.createSpy('setSubmitButtonDisabled');
  });
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditErrors {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
  it('when the user opens the modal, one field should appear as default (IDoc number)', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    expect(
      wrapper.find('#editIDocError__form div.ant-space .ant-select-selection-item').text(),
    ).toBe('IDocs');
    expect(wrapper.find('#editIDocError__form_idoc-id').at(0).props()['value']).toBe('1000000003');
  });
  it('when the user clicks on the add field button, it should append the respective fields', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    wrapper.find(PlusCircleOutlined).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(2);
  });
  it('when the user clicks on the add field button three times, the add button should disappear', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('#editIDocError__form div.ant-space').length).toBe(1);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find(PlusCircleOutlined).simulate('click');
    expect(wrapper.find(PlusCircleOutlined).length).toBe(0);
  });
  it('when the user clicks on the add field button, and selects SAP Document No. a normal input must be rendered', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(Input).length).toBe(1);
  });
  it('when the user clicks on the add field button, and selects Document Date a DatePicker must be rendered', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(DatePicker).length).toBe(
      1,
    );
  });
  it('when the user clicks on the add field button, and selects Posting Date a DatePicker must be rendered', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    expect(wrapper.find('#editIDocError__form div.ant-space').at(1).find(DatePicker).length).toBe(
      1,
    );
  });
  it('When the user open the modal the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal and enters text on text area and click on checkbox the submit button must be enable', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    wrapper
      .find('#editIDocError__form_mark-as-complete.ant-checkbox-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(false);
  });
  it('When the user open the modal, select Document No. the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper
      .find('input#editIDocError__form_fields_0_value')
      .at(0)
      .simulate('change', { target: { value: '1234567890' } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Document No. and enters text on text area the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper
      .find('input#editIDocError__form_fields_0_value')
      .at(0)
      .simulate('change', { target: { value: '1234567890' } });
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Document No., enters text on text area and click on checkbox the submit button must be enable', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper
      .find('input#editIDocError__form_fields_0_value')
      .at(0)
      .simulate('change', { target: { value: '1234567890' } });
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    wrapper
      .find('#editIDocError__form_mark-as-complete.ant-checkbox-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(false);
  });
  it('When the user open the modal, select Document No. and set a length value different of 10, enters text on text area and click on checkbox the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    wrapper
      .find('input#editIDocError__form_fields_0_value')
      .at(0)
      .simulate('change', { target: { value: '123456789' } });
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    wrapper
      .find('#editIDocError__form_mark-as-complete.ant-checkbox-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Document Date. the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Document Date and enters text on text area the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Document Date, enters text on text area and click on checkbox the submit button must be enable', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(1).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    wrapper
      .find('#editIDocError__form_mark-as-complete.ant-checkbox-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(false);
  });
  it('When the user open the modal, select Posting date. the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });

  it('When the user open the modal, select Posting date. the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Posting date and enters text on text area the submit button must be disabled', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(true);
  });
  it('When the user open the modal, select Posting date, enters text on text area and click on checkbox the submit button must be enable', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    wrapper.find(PlusCircleOutlined).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_field').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(2).simulate('click');
    wrapper.find('input#editIDocError__form_fields_0_value').simulate('mousedown');
    wrapper.find('a.ant-picker-today-btn').at(0).simulate('click');
    wrapper
      .find('textarea#editIDocError__form_comment.ant-input')
      .simulate('change', { target: { value: 'Some text' } });
    wrapper
      .find('#editIDocError__form_mark-as-complete.ant-checkbox-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('button.ant-btn.ant-btn-primary').props()['disabled']).toBe(false);
  });
});
