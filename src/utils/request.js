import axios from 'axios';
import router from "../router/nysee"
import { notification } from 'ant-design-vue';

import auth from "../utils/auth"

// 添加授权信息，使用jwt_token 的方式
axios.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'nysee ' + auth.getToken();
    } else {
        console.log("local storage have no token value : ");
    }
    return config;
}, error => {
    return Promise.reject(error)
});

// 请求结果拦截器,如果，返回error 那么直接退出，并且返回登录页。
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            notification.error(error.response.status);
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    auth.removeAuth()
                    router.replace({
                        path: '/login'
                    });
                    return;
            }
        } else {
            notification.error({
                message: "network connect error ...."
            });
        }
        return Promise.reject(error);   // 返回接口返回的错误信息
    }
);


axios.defaults.timeout = 3000;

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = "http://localhost:9527/api";
} else {
    axios.defaults.baseURL = "/api";
}

export default axios;