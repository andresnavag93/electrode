import React from 'react';
import { Tag as TagAnt } from 'antd';

import { parameterKeyOptions, colors } from '../../config/index';

const ErrorSearchTag = ({ label, value, closable, onClose }) => {
  const color = parameterKeyOptions.some((option) => option.value === value) ? colors.blue : null;
  return (
    <TagAnt color={color} closable={closable} onClose={onClose} value={value}>
      {label}
    </TagAnt>
  );
};
export default ErrorSearchTag;
