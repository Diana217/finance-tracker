<template>
    <div class="content-list">
        <h1>Financial Goals</h1>
        <div class="add-button">
            <router-link to="/create-financial-goal" class="button">Add a financial goal</router-link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Target Amount</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="goal in goals" :key="goal.id">
                    <td>{{ goal.name }}</td>
                    <td>{{ goal.targetAmount }}</td>
                    <td>{{ goal.startDate }}</td>
                    <td>{{ goal.endDate }}</td>
                    <td>
                        <div class="actions">
                            <router-link :to="`/edit-financial-goal/${goal.id}`" class="button">Edit</router-link>
                            <button @click="deleteGoal(goal.id)" class="button">Delete</button>
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
    name: "FinancialGoalList",
    data() {
        return {
            goals: [],
        };
    },
    methods : {
        async fetchGoal() {
            try {
                const response = await apiClient.get('/FinancialGoals');
                this.goals = response.data.map(goal => {
                    if (goal.startDate) {
                        goal.startDate = goal.startDate.split('T')[0];
                    }
                    if (goal.endDate) {
                        goal.endDate = goal.endDate.split('T')[0];
                    }
                    return goal;
                });
            } catch (err) {
                this.error = 'Failed to fetch financial goal.';
                console.error(err);
            }
        },
        async deleteGoal(id) {
            if (!confirm('Are you sure you want to delete this goal?')) return;
            try{ 
                await apiClient.delete(`/FinancialGoals/${id}`);
                this.goals = this.goals.filter(inc => inc.id !== id);
            } catch (err) {
                this.error = 'Failed to delete financial goal.';
                console.error(err);
            }
        },
    },
    mounted() {
        this.fetchGoal();
    }
}
</script>
<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
}
</style>
