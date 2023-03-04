import router from "./router";
import store from "./store";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';

const whiteList = ['/404', '/login'];

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token;
  nProgress.start();
  if (token) {
    if (to.path === '/login') {
      next('/');
    } else {
      if (!store.getters.userId) {
        const { roles: { menus,points } } = await store.dispatch('user/getUserInfo');
        const newRoutes = await store.dispatch('permission/filterRoutes', menus);
        router.addRoutes([...newRoutes, { path: '*', redirect: '/404', hidden: true }]);
        next(to.path);   // 这里必须用next(to.path), 否则会导致刷新动态路由出现白屏
      } else {
        next();
      }
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
