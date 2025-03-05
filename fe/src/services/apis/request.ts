import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { requestHelpers } from 'helpers';
import { userServices } from '../index';

const baseClient = axios.create({
  baseURL: 'http://0.0.0.0:8000/api/v1',
});

const getAuthorization = () => {
  return userServices.isLoggedIn()
    ? `Bearer ${userServices.getAccessToken()}`
    : '';
};

const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

const responseErrorInterceptor = (error: AxiosError) => {
  requestHelpers.handleResponseError(error);
  return Promise.reject(error);
};

const clients = [baseClient];

clients.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );
});

export default {
  baseClient,
};
