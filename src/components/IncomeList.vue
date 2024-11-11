<template>
    <div class="content-list">
        <h1>Income</h1>
        <div class="add-button">
            <router-link to="/create-income" class="button">Add an income</router-link>
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
                <tr v-for="income_ in income" :key="income_.id">
                    <td>{{ income_.date }}</td>
                    <td>{{ income_.category.name }}</td>
                    <td>{{ income_.amount }}</td>
                    <td>
                        <div class="actions">
                            <router-link :to="`/edit-income/${income_.id}`" class="button">Edit</router-link>
                            <button @click="deleteIncome(income_.id)" class="button">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import apiClient from '../services/api';

export default {
    name: "IncomeList",
    data() {
        return {
            income: [],
        };
    },
    methods : {
        async fetchIncome() {
            try {
                const response = await apiClient.get('/Incomes');
                this.income = response.data.map(income_ => {
                    if (income_.date) {
                        income_.date = income_.date.split('T')[0];
                    }
                    return income_;
                });
            } catch (err) {
                this.error = 'Failed to fetch income.';
                console.error(err);
            }
        },
        async deleteIncome(id) {
            if (!confirm('Are you sure you want to delete this income?')) return;
            try{ 
                await apiClient.delete(`/Incomes/${id}`);
                this.income = this.income.filter(inc => inc.id !== id);
            } catch (err) {
                this.error = 'Failed to delete income.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchIncome();
    }
}
</script>
<style scoped>
</style>
