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
];
export default data;
