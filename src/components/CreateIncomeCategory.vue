<template>
    <div>
      <h1>Create New Income Category</h1>
      <form @submit.prevent="createCategory">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" required />
        </div>
        <button type="submit">Create</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <router-link to="/" class="button">Back to List</router-link>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'CreateIncomeCategory',
    data() {
      return {
        name: '',
        error: null,
        success: null,
      };
    },
    methods: {
      async createCategory() {
        try {
          const payload = {
            name: this.name,
          };
          await apiClient.post('/IncomeCategory', payload);
          this.success = 'Income category created successfully!';
          this.name = '';
          // Optionally, redirect to the list
          this.$router.push('/');
        } catch (err) {
          this.error = 'Failed to create income category.';
          console.error(err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 10px;
  }
  label {
    display: inline-block;
    width: 100px;
  }
  input {
    padding: 5px;
  }
  .button {
    margin-top: 10px;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>  