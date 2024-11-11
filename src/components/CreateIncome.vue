<template>
    <div class="form-container">
        <h1>Add income</h1>
        <form @submit.prevent="createIncome" class="create-form">
            <label for="category" class="text">Category</label>
            <div class="dropdown">
                <select name="category" v-model="categoryId">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <label for="amount" class="text">Amount</label>
            <input v-model="amount" type="number" required />
            <label for="date" class="text">Date</label>
            <input v-model="date" type="date" />
            <button type="submit" class="button submit-button">Create</button>
        </form>
        <router-link to="/income" class="button">Back to list</router-link>
    </div>
</template>

<script>
import apiClient from '../services/api';

export default {
    name: 'CreateIncome',
    data() {
        return {
            categories: [],
            categoryId: null,
            amount: 0,
            date: null,
        };
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await apiClient.get('IncomeCategories');
                this.categories = response.data; 

                if (this.categories.length > 0) {
                    this.categoryId = this.categories[0].id;
                }
            } catch (err) {
                this.error = 'Failed to fetch income categories.';
                console.error(err);
            }
        },
        async createIncome() {
            try {
                const payload = {
                    categoryId: this.categoryId,
                    amount: this.amount,
                    date: this.date,
                };
                await apiClient.post('Incomes', payload);
                this.$router.push('/income');
            } catch (err) {
                this.error = 'Failed to add income.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchCategories();
    },
}
</script>
<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}

select, input {
    margin-bottom: 20px;
}
</style>