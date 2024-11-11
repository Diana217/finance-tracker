<template>
  <div class="form-container">
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
h1 {
  margin-bottom: 20px;
  text-align: center;
}
</style>