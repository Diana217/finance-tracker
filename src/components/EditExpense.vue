<template>
    <div class="content">
        <h1>Edit Expense</h1>
        <form v-if="expense" @submit.prevent="updateExpense" class="expense-form">
            <label for="category" class="text">Category</label>
            <div class="dropdown">
                <select name="category" v-model="expense.categoryId">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <label for="amount" class="text">Amount</label>
            <input v-model="expense.amount" type="number" required />
            <label for="date" class="text">Date</label>
            <input v-model="expense.date" type="date" />
            <button type="submit" class="button submit-button">Update</button>
        </form>
        <router-link to="/expenses" class="button">Back to list</router-link>
    </div>
</template>
<script>
import apiClient from '../services/api';

export default {
    name: 'EditExpense',
    data() {
        return {
            expense: null,
            categories: []
        };
    },
    methods: {
        async fetchExpense() {
            const id = this.$route.params.id;
            try {
                const response = await apiClient.get(`/Expenses/${id}`);
                this.expense = response.data;
                if (this.expense.date) {
                    this.expense.date = this.expense.date.split('T')[0];
                }
            } catch (err) {
                this.error = 'Failed to fetch the expense.';
                console.error(err);
            }
        },
        async fetchCategories() {
            try {
                const response = await apiClient.get('SpendingCategories');
                this.categories = response.data; 

                if (this.categories.length > 0) {
                    this.categoryId = this.categories[0].id;
                }
            } catch (err) {
                this.error = 'Failed to fetch spending categories.';
                console.error(err);
            }
        },
        async updateExpense() {
            try {
                const id = this.expense.id;
                await apiClient.put(`Expenses/${id}`, this.expense);
                this.$router.push('/expenses');
            } catch (err) {
                this.error = 'Failed to edit expense.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchExpense();
        this.fetchCategories();
    },
}
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

select, input {
    margin-bottom: 20px;
}

.expense-form {
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