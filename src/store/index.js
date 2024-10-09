import { createStore } from 'vuex';
import apiClient from '../services/api';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
        try {
          const response = await apiClient.post('/Auth/login', credentials);
          const token = response.data.token;
          commit('setToken', token);
      
        //   const userResponse = await apiClient.get('/Auth/user', {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        //   commit('setUser', userResponse.data);
        } catch (error) {
          console.log(error);
          throw error;
        }
    },      
    async register({ commit }, userData) {
      try {
        const response = await apiClient.post('/Auth/register', userData);
        const token = response.data.token;
        commit('setToken', token);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('clearUser');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});

export default store;