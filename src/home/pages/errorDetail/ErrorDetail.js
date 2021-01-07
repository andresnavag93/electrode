import React from 'react';
import { Row, Table, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import columns from './columns';
import data from '../../utils/mockData/ErrorsData';
import { formatToDollarCurrency } from '../../utils/index';
import './errorDetail.css';

const { Text } = Typography;

const ErrorDetail = ({ errorType, match }) => {
  const history = useHistory();
  const id = parseInt(match.params.id);
  const currentError = data.find((error) => error.key === id);
  const { amount, parentId, interfaceId, processArea, lineCount, errorsAssociated } = currentError;
  const amountWithFormat = formatToDollarCurrency(amount);

  return (
    <div className="error-detail-container">
      <Row justify="start">
        <Button
          type="primary"
          htmlType="submit"
          size="medium"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push('/dashboard')}
        >
          Back
        </Button>

        <Text className="error-detail__title">
          Total Errored Amount <strong>{amountWithFormat}</strong>
        </Text>
      </Row>

      {errorType !== 'cill' && (
        <Row justify="start">
          <Text className="error-detail__headers">
            <strong>Error: </strong>
            {parentId}
            <strong className="error-detail__bold-text">Amount: </strong>
            {amountWithFormat}
            <strong className="error-detail__bold-text">Interface ID: </strong>
            {interfaceId}
            <strong className="error-detail__bold-text">Process Area: </strong>
            {processArea}
            <strong className="error-detail__bold-text">Line Count: </strong>
            {lineCount}
          </Text>
        </Row>
      )}

      <Table
        columns={columns[errorType]}
        dataSource={errorsAssociated}
        className="error-detail___data-table"
        pagination={false}
      />
    </div>
  );
};
export default ErrorDetail;
