import React from 'react';
import { Tag } from 'antd';
const getStatusColor = (status) => {
  let color = '';
  switch (status) {
    case 'open':
      color = 'cyan';
      break;
    case 'draft':
      color = 'geekblue';
      break;
    case 'updated':
      color = 'magenta';
      break;
    case 'completed':
      color = 'green';
      break;
    default:
      color = '';
  }
  return color;
};
const getErrorColor = (error) => {
  let color = '';
  switch (error) {
    case 'CILL Error':
      color = 'blue';
      break;
    case 'Errored IDoc':
      color = 'orange';
      break;
    default:
      color = '';
  }
  return color;
};
const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      return <Tag color={getStatusColor(status)}>{status}</Tag>;
    },
  },
  {
    title: 'Error Type',
    dataIndex: 'error',
    key: 'error',
    render: (error) => {
      return <Tag color={getErrorColor(error)}>{error}</Tag>;
    },
  },
  { title: 'Parent ID', dataIndex: 'parentId', key: 'parentId' },
  { title: 'Error ID', dataIndex: 'errorId', key: 'errorId' },
  { title: 'Batch ID', dataIndex: 'batchId', key: 'batchId' },
  { title: 'IDoc ID', dataIndex: 'idocNo', key: 'idocNo' },
  { title: 'CILL Unique Identifier', dataIndex: 'cillId', key: 'cillId' },
  { title: 'Error Code', dataIndex: 'errorCode', key: 'errorCode' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Creation Date', dataIndex: 'creatationDate', key: 'creatationDate' },
  { title: 'Reprocess from CILL', dataIndex: 'reprocessCILL', key: 'reprocessCILL' },
];
export default columns;
