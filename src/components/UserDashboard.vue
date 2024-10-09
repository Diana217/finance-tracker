<template>
  <div>
    <h2>Dashboard</h2>
    <p>Welcome to the protected Dashboard!</p>
    <button @click="fetchIncomeCategories">Get Income Categories</button>
    <ul>
      <li v-for="category in incomeCategories" :key="category">{{ category }}</li>
    </ul>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import apiClient from '../services/api';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      incomeCategories: [],
    };
  },
  computed: {
    ...mapState(['token']),
  },
  methods: {
    ...mapActions(['logout']),
    async fetchIncomeCategories() {
      try {
        const response = await apiClient.get('/IncomeCategory');
        this.incomeCategories = response.data;
      } catch (error) {
        console.error('Error fetching income categories:', error);
      }
    },
    handleLogout() {
      this.logout(); 
      this.$router.push('/login');
    },
  },
};
</script>