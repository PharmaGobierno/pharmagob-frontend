/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({
    baseURL: "https://pharma-gateway-682pqs65.uc.gateway.dev/",
    params: {
      key: "AIzaSyBQFlqkqrc80WsmRmSJR4Lgm_YOGUvEYEg"
    },
    timeout: 5000, // Opcional: Establece un tiempo de espera
    headers: {
        'Content-Type': 'application/json',
      },
  });
  

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error) || 'Wrong Services')
);

export default axiosServices;
