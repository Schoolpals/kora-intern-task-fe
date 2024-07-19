import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `${accessToken}`;
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
            localStorage.removeItem('access_token');
            return Promise.reject(response.data)
        }

        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
