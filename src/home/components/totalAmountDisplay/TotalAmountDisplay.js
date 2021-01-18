import React from 'react';
import { Typography } from 'antd';
import ErrorCodesLink from '../../components/errorCodesLink/ErrorCodesLink';
import { formatToDollarCurrency } from '../../utils/index';
import './totalAmountDisplay.css';
const { Title } = Typography;
const TotalAmountDisplay = ({ total = '0.00', selectionTotal = '0.00' }) => {
  return (
    <div className="total-amount-display">
      <div className="total-amount-display__error-codes-link-container">
        <Title level={3}>Total Errored Amount {formatToDollarCurrency(total)}</Title>
        <div className="error-codes-link-container___error-codes-link">
          <ErrorCodesLink />
        </div>
      </div>
      <Title level={3}>Selection Amount {formatToDollarCurrency(selectionTotal)}</Title>
    </div>
  );
};
export default TotalAmountDisplay;
