import { getToken, setToken, removeToken, getTimeStamp, setTimeStamp } from '@/utils/auth';
import { login, getUserInfo, getUserDetail } from '@/api/user';

export default {
  namespaced: true,
  // vuex的state数据做了响应式处理，与data是一样的
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    removeToken(state) {
      state.token = null;
      removeToken();
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    removeUserInfo(state) {
      state.userInfo = {};
    }
  },
  actions: {
    async login({ commit }, loginInfo) {
      const token = await login(loginInfo);
      // 存入时间戳
      setTimeStamp();
      commit('setToken', token);
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo();
      const baseInfo = await getUserDetail(res.userId);
      const obj = { ...res, ...baseInfo };
      commit('setUserInfo', obj);
    },
    logout({ commit }) {
      commit('removeToken');
      commit('removeUserInfo');
    }
  }
};