import axios from 'axios';
import router from "../router/nysee"
import { notification } from 'ant-design-vue';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

import auth from "../utils/auth"

// 添加授权信息，使用jwt_token 的方式
axios.interceptors.request.use(config => {
    config.CancelToken = source.token;
    if (localStorage.getItem('nysee-token')) {
        config.headers.Authorization = 'nysee ' + auth.getToken();
    } else {
        console.log("local storage have no token value : ");
    }
    return config;
}, error => {
    return Promise.reject(error)
});

// 请求结果拦截器,如果，返回error 那么直接退出，并且返回登录页。
// 对于正常的返回，如果 error:true 那么直接输出 包含的message
axios.interceptors.response.use(
    response => {
        let errorMessage = "";
        if (response.data.error) {
            errorMessage = response.data.message || "未知错误";
        } else if (response.data.message == "go away ...") {
            errorMessage = "接口未实现:" + response.config.url;
        }
        if (errorMessage != "") {
            notification.error({
                message: errorMessage
            });
            return false;
        }
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    auth.removeAuth()
                    router.replace({
                        path: '/login'
                    });
                    return;
                default:
                    notification.error({
                        message: "server return " + error.response.status
                    });
            }
        } else {
            notification.error({
                message: "network connect error ...."
            });
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    }
);


axios.defaults.timeout = 30000;

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = "http://localhost:9527/api";
    // 为了接收session 的cookie 该值必须为true
    axios.defaults.withCredentials = true
} else {
    axios.defaults.baseURL = "/api";
}

export default axios;