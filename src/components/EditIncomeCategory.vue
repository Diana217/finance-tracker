<template>
    <div>
      <h1>Edit Income Category</h1>
      <form v-if="incomeCategory" @submit.prevent="updateCategory">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="incomeCategory.name" required />
        </div>
        <div>
          <label for="userId">User ID:</label>
          <input type="text" v-model="incomeCategory.userId" required />
        </div>
        <button type="submit">Update</button>
      </form>
      <p v-else>Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <router-link to="/" class="button">Back to List</router-link>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'EditIncomeCategory',
    data() {
      return {
        incomeCategory: null,
        error: null,
        success: null,
      };
    },
    methods: {
      async fetchCategory() {
        const id = this.$route.params.id;
        try {
          const response = await apiClient.get(`/IncomeCategory/${id}`);
          this.incomeCategory = response.data;
        } catch (err) {
          this.error = 'Failed to fetch the income category.';
          console.error(err);
        }
      },
      async updateCategory() {
        try {
          const id = this.incomeCategory.id;
          await apiClient.put(`/IncomeCategory/${id}`, this.incomeCategory);
          this.success = 'Income category updated successfully!';
          // Optionally, redirect to the list
          this.$router.push('/');
        } catch (err) {
          this.error = 'Failed to update the income category.';
          console.error(err);
        }
      },
    },
    mounted() {
      this.fetchCategory();
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