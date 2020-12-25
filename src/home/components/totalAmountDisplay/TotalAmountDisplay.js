import React from 'react';
import { Typography } from 'antd';
import './totalAmountDisplay.css';
const { Title } = Typography;
const formatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const TotalAmountDisplay = ({ total = '0.00', selectionTotal = '0.00' }) => {
  return (
    <div className="total-amount-display">
      <Title level={3}>Total Errored Amount {formatter.format(total)}</Title>
      <Title level={3}>Selection Amount {formatter.format(selectionTotal)}</Title>
    </div>
  );
};
export default TotalAmountDisplay;
