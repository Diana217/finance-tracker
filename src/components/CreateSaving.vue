<template>
    <div class="form-container">
        <h1>Add saving</h1>
        <form @submit.prevent="createSaving" class="create-form">
            <label for="goal" class="text">Financial Goal</label>
            <div class="dropdown">
                <select name="goal" v-model="goalId">
                    <option v-for="goal in goals" :key="goal.id" :value="goal.id">{{ goal.name }}</option>
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
    name: 'CreateSaving',
    data() {
        return {
            goals: [],
            goalId: null,
            amount: 0,
            date: null,
        };
    },
    methods: {
        async fetchGoals() {
            try {
                const response = await apiClient.get('FinancialGoals');
                this.goals = response.data; 

                if (this.goals.length > 0) {
                    this.goalId = this.goals[0].id;
                }
            } catch (err) {
                this.error = 'Failed to fetch financial goals.';
                console.error(err);
            }
        },
        async createSaving() {
            try {
                const payload = {
                    goalId: this.goalId,
                    amount: this.amount,
                    date: this.date,
                };
                await apiClient.post('Savings', payload);
                this.$router.push('/savings');
            } catch (err) {
                this.error = 'Failed to add saving.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchGoals();
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