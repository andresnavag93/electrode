import React from 'react';
import { Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import columns from './columns';
import errorCodes from '../../constants/errorCodes';
import './errorCodes.css';
const ErrorCodes = () => {
  const history = useHistory();
  return (
    <div className="error-codes-container">
      <a className="error-codes-container__link" onClick={() => history.goBack()}>
        <ArrowLeftOutlined /> Back
      </a>
      <Table
        columns={columns}
        size="small"
        dataSource={errorCodes}
        className="error-codes___data-table"
        rowKey={(record) => record.errorCode}
        pagination={false}
      />
    </div>
  );
};
export default ErrorCodes;
