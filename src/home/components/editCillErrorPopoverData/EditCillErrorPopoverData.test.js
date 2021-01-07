import React from 'react';
import { shallow } from 'enzyme';
import EditCillErrorPopoverData from './EditCillErrorPopoverData';

import '../../../../spec/helpers/enzyme';

const defaultProps = {
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
};

describe('Edit Cill Error Modal', () => {
  it('the component mounts without crashing', () => {
    const wrapper = shallow(<EditCillErrorPopoverData {...defaultProps} />);
    expect(wrapper).toBeDefined();
  });
});
