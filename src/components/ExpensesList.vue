<template>
    <div class="content">
        <h1>Expenses</h1>
        <div class="add-button">
            <router-link to="/create-expense" class="button">Add an expense</router-link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expense in expenses" :key="expense.id">
                    <td>{{ expense.date }}</td>
                    <td>{{ expense.category.name }}</td>
                    <td>{{ expense.amount }}</td>
                    <td>
                        <div class="actions">
                            <router-link :to="`/edit-expense/${expense.id}`" class="button">Edit</router-link>
                            <button @click="deleteExpense(expense.id)" class="button">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { apiService } from '../services/api';

export default {
    name: 'ExpensesList',
    data() {
        return { 
            expenses: [],
        };
    },
    methods: {
        async loadExpenses() {
            try {
                const response = await apiService.fetchExpenses();
                this.expenses = response.data.map(expense => {
                    if (expense.date) {
                        expense.date = expense.date.split('T')[0];
                    }
                    return expense;
                });
            } catch (err) {
                this.error = 'Failed to fetch expenses.';
                console.error(err);
            }
        },
        async deleteExpense(id) {
            if (!confirm('Are you sure you want to delete this expense?')) return;
            try {
                await apiService.deleteExpense(id);
                this.expenses = this.expenses.filter(exp => exp.id !== id);
            } catch (err) {
                this.error = 'Failed to delete expense.';
                console.error(err);
            }
        }
    },
    mounted() {
        this.loadExpenses();
    },
}
</script>
<style scoped>
.content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse; 
}

tr {
  display: table-row;
  border-bottom: 1px solid #e0e0e0;
}

th, td {
  padding: 10px 20px; 
  text-align: left;
}

td:last-child {
    display: inline-table;
    text-align: right;
    margin: 7px 0 7px 20px;
}
</style>
