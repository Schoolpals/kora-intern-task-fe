import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('userName');
            return Promise.reject(response.data)
        }

        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('userName');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
