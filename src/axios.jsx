import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vast-shore-74260.herokuapp.com',
});

export default axiosInstance;
