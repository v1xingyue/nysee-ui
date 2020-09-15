// 设置路由加载进度条,及用户授权
import auth from "../utils/auth"
import NProgress from "nprogress";
import "nprogress/nprogress.css"

const commonSuffix = "- ~ -  Now You See Me ! ~ - ~";

const beforeEach = (to, from, next) => {
    // 设置页面通用操作
    document.title = (to.meta.title ? to.meta.title : "") + commonSuffix;

    if (to.path != "/login" && to.path != "/install" && (!auth.isLogin() || !auth.checkToken())) {
        return next({ path: '/login' });
    }

    if (from.path != to.path) {
        NProgress.start();
    }
    next();
}

const afterEach = () => {
    NProgress.done();
}

export default {
    beforeEach,
    afterEach
}