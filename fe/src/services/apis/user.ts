import { getData } from 'src/helpers/request';
import { IUser } from 'src/interfaces/user';
import { requestServices } from 'src/services/index';

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

const logout = () => {
  localStorage.removeItem('token');
};

const getAccessToken = () => {
  return localStorage.getItem('token');
};

const getMe = async (): Promise<IUser> => {
  const response = await baseClient.get('/me');
  return getData(response);
};

export default {
  login,
  isLoggedIn,
  logout,
  getAccessToken,
  getMe,
};
