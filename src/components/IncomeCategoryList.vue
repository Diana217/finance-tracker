<template>
    <div>
      <h1>Income Categories</h1>
      <router-link to="/create" class="button">Add New Category</router-link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in incomeCategories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.userId }}</td>
            <td>
              <router-link :to="`/edit/${category.id}`" class="button">Edit</router-link>
              <button @click="deleteCategory(category.id)" class="button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'IncomeCategoryList',
    data() {
      return {
        incomeCategories: [],
        error: null,
      };
    },
    methods: {
      async fetchIncomeCategories() {
        try {
          const response = await apiClient.get('/IncomeCategory');
          this.incomeCategories = response.data;
        } catch (err) {
          this.error = 'Failed to fetch income categories.';
          console.error(err);
        }
      },
      async deleteCategory(id) {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
          await apiClient.delete(`/IncomeCategory/${id}`);
          this.incomeCategories = this.incomeCategories.filter(cat => cat.id !== id);
        } catch (err) {
          this.error = 'Failed to delete the category.';
          console.error(err);
        }
      },
    },
    mounted() {
      this.fetchIncomeCategories();
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  .button {
    margin-right: 5px;
  }
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>  