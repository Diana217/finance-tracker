<template>
    <div class="form-container">
        <h1>Edit Expense</h1>
        <form v-if="expense" @submit.prevent="updateExpense" class="edit-form">
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
import { apiService } from '../services/api';

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
                const response = await apiService.fetchExpense(id);
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
                var response = await apiService.fetchSpendingCategories();
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
                await apiService.updateExpense(id, this.expense);
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
h1 {
  margin-bottom: 20px;
  text-align: center;
}

select, input {
    margin-bottom: 20px;
}
</style>