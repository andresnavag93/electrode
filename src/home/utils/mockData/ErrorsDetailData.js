const data = [
  {
    key: 0,
    error: 'CILL Error',
    parentId: '9876543217',
    errorCode: 'DQ_ERR_001',
    amount: 1000,
    interfaceId: '', // no
    processArea: '', // no
    lineCount: '', // no
    errorsAssociated: [
      {
        key: 1,
        errorCode: 'DQ_ERR_001',
        errorDescription: 'Profit Center blocked, GL Account blocked',
        message: '', // no
      },
    ],
  },
  {
    key: 1,
    error: 'Errored IDoc',
    parentId: '9876543210',
    errorCode: '02',
    amount: 1000,
    interfaceId: '010101',
    processArea: 'Value',
    lineCount: 'Line Value',
    errorsAssociated: [
      {
        key: 1,
        errorCode: '02',
        errorDescription: 'Mapping Error',
        message: '200.15',
      },
    ],
  },
  {
    key: 2,
    error: 'Errored IDoc',
    parentId: '9876543210',
    errorCode: '02',
    amount: 1000,
    interfaceId: '010101',
    processArea: 'Value',
    lineCount: 'Line Value',
    errorsAssociated: [
      {
        key: 1,
        errorCode: '02',
        errorDescription: 'Mapping Error',
        message: '200.15',
      },
    ],
  },
  {
    key: 3,
    parentId: '9876543217',
    errorCode: 'DQ_ERR_001',
    amount: 1000,
    interfaceId: '', // no
    processArea: '', // no
    lineCount: '', // no
    errorsAssociated: [
      {
        key: 1,
        errorCode: 'DQ_ERR_001',
        errorDescription: 'Profit Center blocked, GL Account blocked',
        message: '', // no
      },
    ],
  },
];
export default data;
