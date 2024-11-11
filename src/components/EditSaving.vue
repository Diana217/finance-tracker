<template>
    <div class="form-container">
        <h1>Edit Saving</h1>
        <form v-if="saving" @submit.prevent="updateSaving" class="edit-form">
            <label for="goal" class="text">Category</label>
            <div class="dropdown">
                <select name="goal" v-model="saving.goalId">
                    <option v-for="goal in goals" :key="goal.id" :value="goal.id">{{ goal.name }}</option>
                </select>
            </div>
            <label for="amount" class="text">Amount</label>
            <input v-model="saving.amount" type="number" required />
            <label for="date" class="text">Date</label>
            <input v-model="saving.date" type="date" />
            <button type="submit" class="button submit-button">Update</button>
        </form>
        <router-link to="/savings" class="button">Back to list</router-link>
    </div>
</template>
<script>
import apiClient from '../services/api';

export default {
    name: 'EditSaving',
    data() {
        return {
            saving: null,
            goals: []
        };
    },
    methods: {
        async fetchSaving() {
            const id = this.$route.params.id;
            try {
                const response = await apiClient.get(`/Savings/${id}`);
                this.saving = response.data;
                if (this.saving.date) {
                    this.saving.date = this.saving.date.split('T')[0];
                }
            } catch (err) {
                this.error = 'Failed to fetch the saving.';
                console.error(err);
            }
        },
        async fetchGoals() {
            try {
                const response = await apiClient.get('FinancialGoals');
                this.goals = response.data; 

                if (this.goals.length > 0) {
                    this.goalId = this.goals[0].id;
                }
            } catch (err) {
                this.error = 'Failed to fetch goals.';
                console.error(err);
            }
        },
        async updateSaving() {
            try {
                const id = this.saving.id;
                await apiClient.put(`Savings/${id}`, this.saving);
                this.$router.push('/savings');
            } catch (err) {
                this.error = 'Failed to edit saving.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchSaving();
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