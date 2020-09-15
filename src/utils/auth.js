const storeageRoleName = "nysee-role"
const nyseeTokenName = "nysee-token"
const nyseeUserName = "nysee-user"

//import Cookies from "js-cookie";

// 默认授权通过
const defaultAuth = false

const getCurrentRole = () => {
    let roleStr = localStorage.getItem(storeageRoleName) || "";
    return roleStr.split(",");
}

// 权限检查，默认允许所有访问
const checkAuth = (pageAuthStr) => {
    if (pageAuthStr) {
        let pageAuth = pageAuthStr.split(",");
        let current = getCurrentRole();
        return current.some(item => { pageAuth.includes(item) })
    }
    return defaultAuth;
}

// 检查用户是否登录
const isLogin = () => {
    let current = getCurrentRole();
    return current && current[0] != "" && current[0] != "guest";
}

const removeAuth = () => {
    for (let name of [storeageRoleName, nyseeTokenName, nyseeUserName]) {
        localStorage.removeItem(name);
        //Cookies.remove("NFsChttYpHGsQUeRgMiFNhJsUdwW5p");
    }

}

const setAuth = (role, token, username) => {
    localStorage.setItem(storeageRoleName, role)
    localStorage.setItem(nyseeTokenName, token)
    localStorage.setItem(nyseeUserName, username)
}

const checkToken = () => {
    let token = localStorage.getItem(nyseeTokenName);
    return token && token != "";
}

const getUser = () => {
    return localStorage.getItem(nyseeUserName)
}

const getToken = () => {
    return localStorage.getItem(nyseeTokenName)
}


export default {
    getCurrentRole,
    isLogin,
    checkAuth,
    setAuth,
    removeAuth,
    checkToken,
    getToken,
    getUser
}