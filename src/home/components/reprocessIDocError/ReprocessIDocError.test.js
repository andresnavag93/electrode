import React from 'react';
import { shallow, mount } from 'enzyme';
import EditErrors from './../editErrors/EditErrors';
import '../../../../spec/helpers/enzyme';
import { Radio } from 'antd';
const defaultPropsIDoc = {
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
describe('ReprocessIDocError', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<EditErrors {...defaultPropsIDoc} isErrorReprocess={true} />);
  });
  it('should render without crashing', () => {
    expect(wrapper).toBeDefined();
  });
  it('should have two radio buttons, and none of them should be selected when the modal is opened', () => {
    expect(wrapper.find('input.ant-radio-input').length).toBe(2);
  });
  it('only one of the radio buttons should be selected at a time', () => {
    wrapper
      .find('input.ant-radio-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('input.ant-radio-input').at(0).props()['checked']).toBeTrue();
    expect(wrapper.find('input.ant-radio-input').at(1).props()['checked']).toBeFalse();
    wrapper
      .find('input.ant-radio-input')
      .at(1)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('input.ant-radio-input').at(1).props()['checked']).toBeTrue();
    expect(wrapper.find('input.ant-radio-input').at(0).props()['checked']).toBeFalse();
  });
  it("when the reprocess modal is opened, the Save button shouldn't appear in the modal footer", () => {
    expect(wrapper.find('div.ant-modal-footer button').length).toBe(2);
    expect(wrapper.find('div.ant-modal-footer button').at(0).text()).toBe('Cancel');
    expect(wrapper.find('div.ant-modal-footer button').at(1).text()).toBe('Submit');
  });
  it('when no radio button is selected, the Submit button should be disabled', () => {
    expect(wrapper.find('div.ant-modal-footer button').at(1).props()['disabled']).toBeTrue();
  });
  it('when one radio button is selected, the Submit button should be enabled', () => {
    wrapper
      .find('input.ant-radio-input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(wrapper.find('div.ant-modal-footer button').at(1).props()['disabled']).toBeFalse();
  });
});
