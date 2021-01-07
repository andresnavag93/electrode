import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import EditFormFieldRow from './EditFormFieldRow';
import { editCillErrorPosibleFieldsValues } from '../../constants/editCillErrorPosibleFieldsValues';
import '../../../../spec/helpers/enzyme';
const defaultProps = {
  remove: jasmine.createSpy(),
  field: { name: 0, key: 0, isListField: true, fieldKey: 0 },
  error: {
    key: 0,
    status: 'open',
    error: 'CILL Error',
    errorId: 'e6656565',
    batchId: '', // no
    parentId: '9876543217',
    idocNo: '', // no
    cillId: '', // no
    errorCode: 'REF_DATA_ERR_001',
    amount: 1000,
    reprocessCILL: '', // no
    creatationDate: '01/10/2020',
    legacyAccount: '1234567890',
    divisionNumber: '12345678',
    storeNumber: 'FN1234',
    transactionLevelData: [
      {
        key: 1,
        data: 'OSI Transaction ID',
        value: '01',
      },
      {
        key: 2,
        data: 'Division Number',
        value: '02',
      },
      {
        key: 3,
        data: 'Store Number',
        value: '03',
      },
      {
        key: 4,
        data: 'Account Number',
        value: '04',
      },
      {
        key: 5,
        data: 'Supplier Number',
        value: '05',
      },
      {
        key: 6,
        data: 'Reference Document Number',
        value: '06',
      },
      {
        key: 7,
        data: 'Departament Number',
        value: '07',
      },
      {
        key: 8,
        data: 'Country',
        value: '08',
      },
      {
        key: 9,
        data: 'Document Currency Cost Amount',
        value: '09',
      },
      {
        key: 10,
        data: 'Retail Amount',
        value: '10',
      },
    ],
  },
  posibleNewFieldValues: editCillErrorPosibleFieldsValues,
  selectedEditProp: [],
  setSelectedEditProp: jasmine.createSpy(),
};
describe('Edit Cill Error Row Select input component', () => {
  it('the component mounts without crashing', () => {
    const wrapper = mount(
      <Form>
        <EditFormFieldRow {...defaultProps} />
      </Form>,
    );
    expect(wrapper).toBeDefined();
  });
  it('when the remove icon is clicked the remove function is called with the correct parameter', () => {
    const { remove } = defaultProps;
    const wrapper = mount(
      <Form>
        <EditFormFieldRow {...defaultProps} />
      </Form>,
    );
    wrapper.find(MinusCircleOutlined).simulate('click');
    expect(remove).toHaveBeenCalledOnceWith(defaultProps.field.name);
  });
  it('should update original value input on select change', () => {
    const wrapper = mount(
      <Form>
        <EditFormFieldRow {...defaultProps} />
      </Form>,
    );
    wrapper.find('input').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('input').at(1).props().placeholder).toBe('1234567890');
  });
  it('should enable new values select', () => {
    const wrapper = mount(
      <Form>
        <EditFormFieldRow {...defaultProps} />
      </Form>,
    );
    expect(wrapper.find('form div.ant-select').at(1).hasClass('ant-select-disabled')).toBe(true);
    wrapper.find('input').at(0).simulate('mousedown');
    wrapper.find('div.ant-select-item-option-content').at(0).simulate('click');
    expect(wrapper.find('form div.ant-select').at(1).hasClass('ant-select-disabled')).toBe(false);
  });
});
