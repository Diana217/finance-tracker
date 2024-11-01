<template>
    <div class="container">
        <h1>Add expense</h1>
        <form @submit.prevent="createExpense" class="create-form">
            <label for="category" class="text">Category</label>
            <div class="dropdown">
                <select name="category" v-model="categoryId">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <label for="amount" class="text">Amount</label>
            <input type="number" v-model="amount" required>
            <label for="date" class="text">Date</label>
            <input type="date" v-model="date">
            <button type="submit" class="button submit-button">Create</button>
        </form>
        <router-link to="/expenses" class="button">Back to list</router-link>
    </div>
</template>
<script>
import apiClient from '../services/api';

export default {
    name: 'CreateExpense',
    data() {
        return {
            categories: [],
            categoryId: null,
            amount: null,
            date: null,
        };
    },
    methods: {
        async fetchCategories() {
            try {
                var response = await apiClient.get('/SpendingCategories');
                this.categories = response.data;

                if (this.categories.length > 0) {
                    this.categoryId = this.categories[0].id;
                }
            } catch (err) {
                this.error = 'Failed to fetch spending categories.';
                console.error(err);
            }
        },
        async createExpense() {
            try {
                const payload = { 
                    categoryId: this.categoryId,
                    amount: this.amount,
                    date: this.date,
                };
                await apiClient.post('/Expenses', payload);
                this.$router.push('/expenses');
            } catch (err) {
                this.error = 'Failed to add expense.';
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
.container {
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

select, input {
    margin-bottom: 20px;
}

.create-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-bottom: 15px;
}

.submit-button {
    display: block;
    margin-bottom: 20px;
    width: fit-content;
}
</style>