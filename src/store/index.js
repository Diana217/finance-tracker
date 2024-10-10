import { createStore } from 'vuex';
import apiClient from '../services/api';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || null,
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
    setEmail(state, email) {
      state.email = email; 
      localStorage.setItem('email', email); 
    },
    clearEmail(state) {
      state.email = null;
      localStorage.removeItem('email');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
          const response = await apiClient.post('/Auth/login', credentials);
          const token = response.data.token;
          commit('setToken', token);

          const user = jwtDecode(token);
          commit('setEmail', user.sub);
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

        const user = jwtDecode(token);
        commit('setEmail', user.sub);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('clearEmail');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getEmail: (state) => state.email,
  },
});

export default store;