const errorCodes = [
  {
    errorCode: 'DQ_ERR_001',
    errorDescription: 'NULL VALUE',
    detailedDescription: 'Mandatory field. Data received is null/empty',
  },
  {
    errorCode: 'DQ_ERR_002',
    errorDescription: 'NON NUMERIC',
    detailedDescription: 'Number field. Data received is not number',
  },
  {
    errorCode: 'DQ_ERR_003',
    errorDescription: 'INVALID DATE',
    detailedDescription: 'Date field. Data received is not valid date',
  },
  {
    errorCode: 'DQ_ERR_004',
    errorDescription: 'INVALID DATA LENGTH',
    detailedDescription: 'Data Length is not as per data definition.',
  },
  {
    errorCode: 'DQ_ERR_005',
    errorDescription: 'INVALID DATA',
    detailedDescription: 'Data received is not valid as per business requirements.',
  },
  {
    errorCode: 'DQ_ERR_006',
    errorDescription: 'INVALID DECIMAL FORMAT',
    detailedDescription: 'Data received is not valid as per defined decimal format.',
  },
  {
    errorCode: 'DQ_ERR_007',
    errorDescription: 'DUPLICATE RECORD',
    detailedDescription: 'Input/Source data has duplicate data.',
  },
  {
    errorCode: 'DQ_ERR_008',
    errorDescription: 'COUNT MISMATCH',
    detailedDescription:
      'Input file counts are not matching with the control file, trailer record or any other source',
  },
  {
    errorCode: 'DQ_ERR_009',
    errorDescription: 'OUT OF BALANCE',
    detailedDescription: 'Combination of fields result in out of balance amount (net != zero).',
  },
  {
    errorCode: 'DQ_ERR_017',
    errorDescription: 'TRAILER AMOUNT MISMATCH',
    detailedDescription:
      'Total amount of all the detailed records are not matching with the trailer record amount',
  },
  {
    errorCode: 'DQ_ERR_018',
    errorDescription: 'TRAILER PERCENTAGE VALUE MISMATCH',
    detailedDescription:
      'Total percentage of all the detailed records are not matching with the trailer record percentage value',
  },
  {
    errorCode: 'REF_DATA_ERR_001',
    errorDescription: 'GL ACT LOOKUP FAILURE',
    detailedDescription: 'GL Account master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_002',
    errorDescription: 'STORE LOOKUP FAILURE',
    detailedDescription: 'Store master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_003',
    errorDescription: 'ORG LOOKUP FAILURE',
    detailedDescription: 'ORG XREF does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_004',
    errorDescription: 'PARENT ID LOOKUP FAILURE',
    detailedDescription: 'Parent Id master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_005',
    errorDescription: 'DEPT LOOKUP FAILURE',
    detailedDescription: 'Department master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_006',
    errorDescription: 'MEMO ACT LOOKUP FAILURE',
    detailedDescription: 'Memo Account master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_007',
    errorDescription: 'COST CENTER LOOKUP FAILURE',
    detailedDescription: 'Cost Center master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_008',
    errorDescription: 'PARENT ID LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Parent Id master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_009',
    errorDescription: 'GL ACT LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'GL Account master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_010',
    errorDescription: 'FUNC AREA LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'Functional Area master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_011',
    errorDescription: 'FUNC AREA LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Functional Area master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_012',
    errorDescription: 'ORG LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'ORG XREF master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_013',
    errorDescription: 'PARENT ID- GROUP LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'Parent Id - Group master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_014',
    errorDescription: 'DEPT ON SOURCE LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Dept on Source master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_015',
    errorDescription: 'DEPT NOT ON SOURCE LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Dept not on Source master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_016',
    errorDescription: 'PARENT ID- GROUP LOOKUP FAILURE - CONFLICTS FOUND',
    detailedDescription: 'Parent Id - Group master has conflicting records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_017',
    errorDescription: 'CONFIG RULES LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription: 'There are no records for the given key value in the config rules table.',
  },
  {
    errorCode: 'REF_DATA_ERR_018',
    errorDescription: 'CONFIG RULES LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription:
      'There are multiple records for the given key value in the config rules data.',
  },
  {
    errorCode: 'REF_DATA_ERR_019',
    errorDescription: 'DOCUMENT TYPE LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription: 'Document type master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_020',
    errorDescription: 'DOCUMENT TYPE LOOKUP FAILURE - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Document type master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_021',
    errorDescription: 'INMAR EVENT PARAM LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription: 'Event Param master does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_022',
    errorDescription:
      'INMAR EVENT PARAM LOOKUP FAILURE - MULTI MATCH FOUND - MULTIPLE MATCHES FOUND',
    detailedDescription: 'Event Param master has multi match records for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_023',
    errorDescription: 'OFFSET ACCOUNT CONTROL LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'Offset account control does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_024',
    errorDescription:
      'OFFSET ACCOUNT CONTROL LOOKUP FAILURE - MULTI MATCH FOUND - MULTIPLE MATCHES FOUND',
    detailedDescription:
      'Offset account control does not have any match record for given key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_025',
    errorDescription: 'PROFIT CENTER LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'PR4 FI Org XREF Table does not have any matching record for the given profit center key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_026',
    errorDescription: 'COMPANY CODE LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'PR4 FI Org XREF Table does not have any matching record for the given company code key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_027',
    errorDescription: 'LOCATION TYPE LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'Department_on_source XREF table does not have any matching record for the given location type key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_028',
    errorDescription: 'DEPT ON SOURCE LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'Department_on_source XREF table does not have any matching record for the given department number key value.',
  },
  {
    errorCode: 'REF_DATA_ERR_029',
    errorDescription: 'LOC DIV DEPT MDM LOOKUP FAILURE - NO MATCH FOUND',
    detailedDescription:
      'loc_div_dept table does not have any matching record for given key value.',
  },
  {
    errorCode: 'JE_ERR_001',
    errorDescription: 'FILE OUT OF BALANCE',
    detailedDescription:
      'File is not a balanced file. Credit amount and Debit amount is not matching.',
  },
  {
    errorCode: 'JE_ERR_002',
    errorDescription: 'MORE THAN TWO COMPANY CODES PRESENT',
    detailedDescription: 'One of the documents in the file has more than two company codes present',
  },
];
export default errorCodes;
