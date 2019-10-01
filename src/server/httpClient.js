const axios = require('axios');

const initHttpClient = () => {
    const instance = axios.create();

    instance.interceptors.response.use(
        response => response,
        error => {
            if (!!error.response && error.response.status === 302) {
                return error.response;
            } else {
                return Promise.reject(error);
            }
        }
    );

    return instance;
};

const httpClient = initHttpClient();

module.exports = { httpClient };
