import { getToken, setToken, removeToken } from '@/utils/auth';
import { login } from '@/api/user';

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    removeToken(state) {
      state.token = null;
      removeToken();
    }
  },
  actions: {
    async login({ commit }, loginInfo) {
      const res = await login(loginInfo);
      commit('setToken', res.data)
      console.log(res);
    }
  }
};