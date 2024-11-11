<template>
  <div class="content-list">
    <h1>Spending Categories</h1>
    <div class="add-button">
      <router-link to="/create-spending-category" class="button">Add a category</router-link>
    </div>
    <ul class="category-list">
      <li v-for="category in spendingCategories" :key="category.id" class="category-item">
        <span>{{ category.name }}</span>
        <div class="actions">
          <router-link :to="`/edit-spending-category/${category.id}`" class="button">Edit</router-link>
          <button @click="deleteCategory(category.id)" class="button">Delete</button>
        </div>
      </li>
    </ul>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
  
<script>
import apiClient from '../services/api';
  
export default {
  name: 'SpendingCateforyList',
  data() {
    return {
      spendingCategories: [],
      error: null,
    } 
    },
    methods: {
      async fetchSpendingCategories() {
        try {
          const response = await apiClient.get('/SpendingCategories');
          this.spendingCategories = response.data;
        } catch (err) {
          this.error = 'Failed to fetch spending categories.';
          console.log(err);
        }
      },
      async deleteCategory(id) {
        if (!confirm('Are you sure you want to delete this category?')) return;
        try {
          await apiClient.delete(`/SpendingCategories/${id}`);
          this.spendingCategories = this.spendingCategories.filter(cat => cat.id !== id);
        } catch (err) {
          this.error = 'Failed to delete the category.';
          console.error(err);
        }
      },
    },
    mounted() {
      this.fetchSpendingCategories();
    },
  };
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}
</style>