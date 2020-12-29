import React from 'react';
import { Typography } from 'antd';
import { formatToDollarCurrency } from '../../utils/index';
import './totalAmountDisplay.css';
const { Title } = Typography;

const TotalAmountDisplay = ({ total = '0.00', selectionTotal = '0.00' }) => {
  return (
    <div className="total-amount-display">
      <Title level={3}>Total Errored Amount {formatToDollarCurrency(total)}</Title>
      <Title level={3}>Selection Amount {formatToDollarCurrency(selectionTotal)}</Title>
    </div>
  );
};
export default TotalAmountDisplay;
