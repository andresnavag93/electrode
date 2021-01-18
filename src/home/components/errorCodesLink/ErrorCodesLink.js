import React from 'react';
import { useHistory } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import './errorCodesLink.css';
const ErrorCodesLink = () => {
  const history = useHistory();
  return (
    <div className="error-codes-link">
      <a className="error-codes-link__text-color" onClick={() => history.push('/error-codes')}>
        Error Codes <QuestionCircleOutlined />
      </a>
    </div>
  );
};
export default ErrorCodesLink;
