import React from 'react';
import { Table } from 'antd';
import { columns } from './popoverTablecolumns';

const EditCillErrorPopoverData = ({ transactionLevelData }) => {
  return (
    <Table
      className="editError__transaction0-level-data-table"
      columns={columns}
      dataSource={transactionLevelData}
      pagination={false}
    />
  );
};

export default EditCillErrorPopoverData;
