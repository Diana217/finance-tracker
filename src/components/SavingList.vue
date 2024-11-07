<template>
    <div class="content">
        <h1>Savings</h1>
        <div class="add-button">
            <router-link to="/create-saving" class="button">Add a saving</router-link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Financial Goal</th>
                    <th>Amount</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="saving in savings" :key="saving.id">
                    <td>{{ saving.date }}</td>
                    <td>{{ saving.goal.name }}</td>
                    <td>{{ saving.amount }}</td>
                    <td>
                        <div class="actions">
                            <router-link :to="`/edit-saving/${saving.id}`" class="button">Edit</router-link>
                            <button @click="deleteSaving(saving.id)" class="button">Delete</button>
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
    name: "SavingList",
    data() {
        return {
            savings: [],
        };
    },
    methods : {
        async fetchSavings() {
            try {
                const response = await apiClient.get('/Savings');
                this.savings = response.data.map(saving => {
                    if (saving.date) {
                        saving.date = saving.date.split('T')[0];
                    }
                    return saving;
                });
            } catch (err) {
                this.error = 'Failed to fetch savings.';
                console.error(err);
            }
        },
        async deleteSaving(id) {
            if (!confirm('Are you sure you want to delete this saving?')) return;
            try{ 
                await apiClient.delete(`/Savings/${id}`);
                this.savings = this.savings.filter(inc => inc.id !== id);
            } catch (err) {
                this.error = 'Failed to delete saving.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchSavings();
    }
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
