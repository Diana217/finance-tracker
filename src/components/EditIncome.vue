<template>
    <div class="content">
        <h1>Edit Income</h1>
        <form v-if="income" @submit.prevent="updateIncome" class="income-form">
            <label for="category" class="text">Category</label>
            <div class="dropdown">
                <select name="category" v-model="income.categoryId">
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <label for="amount" class="text">Amount</label>
            <input v-model="income.amount" type="number" required />
            <label for="date" class="text">Date</label>
            <input v-model="income.date" type="date" />
            <button type="submit" class="button submit-button">Update</button>
        </form>
        <router-link to="/income" class="button">Back to list</router-link>
    </div>
</template>
<script>
import apiClient from '../services/api';

export default {
    name: 'EditIncome',
    data() {
        return {
            income: null,
            categories: []
        };
    },
    methods: {
        async fetchIncome() {
            const id = this.$route.params.id;
            try {
                const response = await apiClient.get(`/Incomes/${id}`);
                this.income = response.data;
                if (this.income.date) {
                    this.income.date = this.income.date.split('T')[0];
                }
            } catch (err) {
                this.error = 'Failed to fetch the income.';
                console.error(err);
            }
        },
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
        async updateIncome() {
            try {
                const id = this.income.id;
                await apiClient.put(`Incomes/${id}`, this.income);
                this.$router.push('/income');
            } catch (err) {
                this.error = 'Failed to edit income.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchIncome();
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

.income-form {
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