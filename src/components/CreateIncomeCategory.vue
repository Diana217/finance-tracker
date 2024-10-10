<template>
  <div class="content">
    <h1>Create New Income Category</h1>
    <form @submit.prevent="createCategory" class="category-form">
      <div class="form-group">
        <label for="name">Name</label>
        <div class="input-container">
          <input type="text" v-model="name" required />
          <button type="submit" class="button">Create</button>
        </div>
      </div>
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
.content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.category-form {
  display: flex;
  flex-direction: column;
  justify-content: left;
  max-width: 80%;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
}

.input-container {
  display: flex; 
  align-items: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  margin-right: 10px; 
}

.button {
  padding: 10px 15px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  max-width: fit-content;
}

.button:hover {
  background-color: var(--button-hover);
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.success {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
