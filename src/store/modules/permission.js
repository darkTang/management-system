// 专门处理权限路由的模块
import { constantRoutes } from '@/router/routes';
import { asyncRoutes } from '@/router/routes';
export default {
  namespaced: true,
  state: {
    routes: constantRoutes
  },
  mutations: {
    setRoutes(state, newRoutes) {
      state.routes = [...constantRoutes, ...newRoutes];
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const newRoutes = [];
      asyncRoutes.forEach(item => {
        menus.forEach(routeName => {
          if ((item.name && item.name === routeName) || (item.children && item.children[0].name === routeName)) {
            newRoutes.push(item);
          }
        });
      });
      commit('setRoutes', newRoutes);
      return newRoutes;
    }
  }
};