<template>
    <div class="form-container">
      <h1>Edit Spending Category</h1>
      <form v-if="spendingCategory" @submit.prevent="updateCategory" class="category-form">
        <label for="name">Name</label>
        <div class="input-container">
          <input type="text" v-model="spendingCategory.name" required />
          <button type="submit" class="button">Update</button>
        </div>
      </form>
      <p v-else>Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <router-link to="/spending-categories" class="button">Back to List</router-link>
    </div>
</template>
  
<script>
import apiClient from '../services/api';
  
export default {
  name: 'EditSpendingCategory',
  data() {
    return {
      spendingCategory: null,
      error: null,
      success: null,
    };
  },
  methods: {
    async fetchCategory() {
      const id = this.$route.params.id;
      try {
        const response = await apiClient.get(`/SpendingCategories/${id}`);
        this.spendingCategory = response.data;
      } catch (err) {
        this.error = 'Failed to fetch the spending category.';
        console.error(err);
      }
    },
    async updateCategory() {
      try {
        const id = this.spendingCategory.id;
        await apiClient.put(`/SpendingCategories/${id}`, this.spendingCategory);
        this.success = 'Spending category updated successfully!';
        this.$router.push('/spending-categories');
      } catch (err) {
        this.error = 'Failed to update the spending category.';
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