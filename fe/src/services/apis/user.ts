import { getData } from 'helpers/request';
import { requestServices } from 'services/index';

const { baseClient } = requestServices;

const login = async (
  email: string,
  password: string
): Promise<{ accessToken: string }> => {
  const response = await baseClient.post('/login', {
    email: email,
    password: password,
  });
  return getData(response);
};

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
};

const getAccessToken = () => {
  return localStorage.getItem('token');
};

export default {
  login,
  isLoggedIn,
  logout,
  getAccessToken,
};
