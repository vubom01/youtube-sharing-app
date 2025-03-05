import { notification } from 'antd';

const handleResponseError = (error: any) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    default:
      let message = null;
      if (error.response && error.response.data) {
        message = error.response.data.message;
      }
      notification.error({
        message: 'Error',
        description: message || 'Error',
        placement: 'topRight',
      });
      break;
  }
};

export const getResult = (response: any) => response.data;
export const getData = (response: any) => response.data.data;

export default {
  handleResponseError,
};
