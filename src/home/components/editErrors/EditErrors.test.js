import React from 'react';
import { shallow, mount } from 'enzyme';
import EditErrors from './EditErrors';
import EditCillError from '../editCillError/EditCillError';
import EditIDocError from '../editIDocError/EditIDocError';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
  isModalVisible: true,
  closeModal: jasmine.createSpy(),
  selectedError: {
    key: 3,
    status: 'completed',
    error: 'CILL Error',
    errorId: 'e489523',
    batchId: '', // no
    parentId: '9876543217',
    idocNo: '', // no
    cillId: '', // no
    errorCode: 'DQ_ERR_001',
    amount: 1000,
    reprocessCILL: '', // no
    creatationDate: '01/10/2020',
    legacyAccount: '1234567890',
    divisionNumber: '12345678',
    storeNumber: 'FN1234',
  },
};

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

describe('Edit Errors Modal', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditErrors {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
  it('should render the respective component according to the error type: Cill Error', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    expect(wrapper.find(EditCillError).exists()).toBeTruthy();
  });
  it('should render the respective component according to the error type: idoc', () => {
    const wrapper = mount(<EditErrors {...defaultPropsIDoc} />);
    expect(wrapper.find(EditIDocError).exists()).toBeTruthy();
  });
  it('when the users click on the cancel btn, the modal should close', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    const { closeModal } = defaultProps;
    wrapper.find('div.ant-modal-footer button').at(0).simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
  it('when the users click on the X btn, the modal should close', () => {
    const wrapper = mount(<EditErrors {...defaultProps} />);
    const { closeModal } = defaultProps;
    wrapper.find('button.ant-modal-close').simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});
