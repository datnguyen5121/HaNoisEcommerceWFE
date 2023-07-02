import axios from 'axios'
import { toast } from 'react-toastify'

const instance = axios.create({
    // baseURL: 'http://localhost:8080/'
    baseURL: 'https://hanoisecommercewbe.onrender.com/'
})

instance.defaults.withCredentials = true
// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // const access_token = store?.getState()?.user?.account?.access_token;
        // console.log(access_token);
        // config.headers["Authorization"] = `Bearer ${access_token}`;
        // Do something before request is sent
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // console.log('>>> interceptor',response);
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response && response.data ? response.data : response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // const status = (error && error.response && error.response.status) || 500;

        if (error.response.data && error.response.EC === -999) {
            window.location.href = '/'
        }

        const status = error

        console.log(status)
        switch (status) {
            case 401: {
                // window.location.href = "/login";
                toast.error('Error status 401')
                return Promise.reject(error)
            }

            // forbidden (permission related issues)
            case 403: {
                toast.error('Error status 403')
                return Promise.reject(error)
            }

            // bad request
            case 400: {
                toast.error('Error status 400')
                return Promise.reject(error)
            }

            // not found
            case 404: {
                toast.error('Error status 404')
                return Promise.reject(error)
            }

            // conflict
            case 409: {
                toast.error('Error status 409')
                return Promise.reject(error)
            }

            // unprocessable
            case 422: {
                toast.error('Error status 422')
                return Promise.reject(error)
            }

            // generic api error (server related) unexpected
            default: {
                toast.error(`Error status ${error.response.data.EM}`)

                return Promise.reject(error)
            }
        }
    }
)
export default instance
