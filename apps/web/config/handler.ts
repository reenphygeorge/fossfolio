import Axios from 'axios';
import { ENV } from './ENV';

export const apiHandler = Axios.create({
    baseURL: ENV.api_base + '/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiHandler.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        console.log(error);
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest.url === ENV.api_base + '/auth/refresh'
            // redirecting when the refresh call fails
        ) {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            // exp date in token is expressed in seconds, while now() returns milliseconds:
            return apiHandler
                .post('/auth/refresh')
                .then((response) => {
                    return apiHandler(originalRequest);
                })
                .catch((err) => {
                    // console.log(err);
                });
        } else {
            // console.log('Refresh token is expired', tokenParts.exp, now);
            window.location.href = '/';
            return Promise.reject(error);
        }
    },
);
