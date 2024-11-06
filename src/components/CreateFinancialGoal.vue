<template>
    <div class="content">
        <h1>Create New Financial Goal</h1>
        <form @submit.prevent="createGoal" class="create-form">
            <label for="name" class="text">Name</label>
            <input type="text" v-model="name" required />
            <label for="targetAmount" class="text">Target Amount</label>
            <input type="number" v-model="targetAmount" required>
            <label for="startDate" class="text">Start Date</label>
            <input type="date" v-model="startDate">
            <label for="endDate" class="text">End Date</label>
            <input type="date" v-model="endDate">
            <button type="submit" class="button submit-button">Create</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
        <router-link to="/financial-goals" class="button">Back to List</router-link>
    </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
    name: 'CreateFinancialGoal',
    data() {
        return {
            name: '',
            targetAmount: 0,
            startDate: null,
            endDate: null,
            error: null,
            success: null
        };
    },
    methods: {
        async createGoal(){
            try {
                const payload = {
                    name: this.name,
                    targetAmount: this.targetAmount,
                    startDate: this.startDate,
                    endDate: this.endDate
                };
                await apiClient.post('/FinancialGoals', payload);
                this.success = 'Financial goal created successfully!';
                this.name = '';
                this.$router.push('/financial-goals');
            } catch (err) {
                this.error = 'Failed to create financial goal.';
                console.log(err);
            }
        }
    },
};
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