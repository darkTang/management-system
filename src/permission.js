import router from "./router";
import store from "./store";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';

const whiteList = ['/404', '/login'];

router.beforeEach((to, from, next) => {
  const token = store.getters.token;
  nProgress.start();
  if (token) {
    if (to.path === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
  nProgress.done();    // bug 解决手动切换地址进度条不关闭的情况
});


router.afterEach((to, from) => {
  nProgress.done();
});
