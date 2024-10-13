<template>
  <div class="content">
    <h1>Income Categories</h1>
    <div class="add-button">
      <router-link to="/create-income-category" class="button">Add a category</router-link>
    </div>
    <ul class="category-list">
      <li v-for="category in incomeCategories" :key="category.id" class="category-item">
        <span>{{ category.name }}</span>
        <div class="actions">
          <router-link :to="`/edit-income-category/${category.id}`" class="button">Edit</router-link>
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
        const response = await apiClient.get('/IncomeCategories');
        this.incomeCategories = response.data;
      } catch (err) {
        this.error = 'Failed to fetch income categories.';
        console.error(err);
      }
    },
    async deleteCategory(id) {
      if (!confirm('Are you sure you want to delete this category?')) return;
      try {
        await apiClient.delete(`/IncomeCategories/${id}`);
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
.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.add-button {
  text-align: right;
  margin-bottom: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>