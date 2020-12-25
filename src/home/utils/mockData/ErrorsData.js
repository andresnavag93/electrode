const data = [
  {
    key: 0,
    status: 'open',
    error: 'CILL Error',
    errorId: 'e6656565',
    batchId: '', // no
    parentId: '9876543217',
    idocNo: '', // no
    cillId: '', // no
    errorCode: 'DQ_ERR_001',
    amount: 1000,
    reprocessCILL: '', // no
    creatationDate: '01/10/2020',
  },
  {
    key: 1,
    status: 'draft',
    error: 'Errored IDoc',
    errorId: '', // no
    batchId: 'FN11052007280730',
    parentId: '9876543210',
    idocNo: '1000000002',
    cillId: 'FN110520072807301000000002',
    errorCode: '02',
    amount: 1000,
    reprocessCILL: 'X',
    creatationDate: '01/10/2020',
  },
  {
    key: 2,
    status: 'updated',
    error: 'Errored IDoc',
    errorId: '', // no
    batchId: 'FN11052007280730',
    parentId: '9876543210',
    idocNo: '1000000002',
    cillId: 'FN110520072807301000000002',
    errorCode: '02',
    amount: 1000,
    reprocessCILL: 'X',
    creatationDate: '01/10/2020',
  },
  {
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
  },
];
export default data;
