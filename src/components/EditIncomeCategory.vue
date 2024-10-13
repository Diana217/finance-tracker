<template>
  <div class="content">
    <h1>Edit Income Category</h1>
    <form v-if="incomeCategory" @submit.prevent="updateCategory" class="category-form">
      <label for="name">Name</label>
        <div class="input-container">
          <input type="text" v-model="incomeCategory.name" required />
          <button type="submit" class="button">Update</button>
        </div>
    </form>
    <p v-else>Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
    <router-link to="/income-categories" class="button">Back to List</router-link>
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
        const response = await apiClient.get(`/IncomeCategories/${id}`);
        this.incomeCategory = response.data;
      } catch (err) {
        this.error = 'Failed to fetch the income category.';
        console.error(err);
      }
    },
    async updateCategory() {
      try {
        const id = this.incomeCategory.id;
        await apiClient.put(`/IncomeCategories/${id}`, this.incomeCategory);
        this.success = 'Income category updated successfully!';
        // Optionally, redirect to the list
        this.$router.push('/income-categories');
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
</style>