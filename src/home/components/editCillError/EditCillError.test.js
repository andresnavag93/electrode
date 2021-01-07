import React from 'react';
import { shallow, mount } from 'enzyme';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EditCillError from './EditCillError';
import EditFormFieldRow from '../editFormFieldRow/EditFormFieldRow';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
  form: {},
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
};

describe('Edit Cill Error Modal', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditCillError {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
});
