import axios from 'axios';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axiosInstance.interceptors.request.use(async (config) => {
  // config.headers.Authorization = `Bearer ${UserService.getToken()}`;
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY`;
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json';
  return await Promise.resolve(config);
});

// interceptors for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', error.response);
    const { status, data } = error.response;
    if (status !== 500) {
      return data;
      // put error logic here
    }
  }
);

export default axiosInstance;
