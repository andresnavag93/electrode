import { message as messageAntd } from 'antd';

export const successMessage = (message) => {
  messageAntd.success(message);
};

export const errorMessage = (message) => {
  messageAntd.error(message);
};

export const warningMessage = (message) => {
  messageAntd.warning(message);
};
