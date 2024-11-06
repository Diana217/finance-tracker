<template>
    <div class="content">
      <h1>Edit Financial Goal</h1>
      <form v-if="goal" @submit.prevent="updateGoal" class="goal-form">
        <label for="name" class="text">Name</label>
        <input type="text" v-model="goal.name" required />
        <label for="targetAmount" class="text">Target Amount</label>
        <input v-model="goal.targetAmount" type="number" required />
        <label for="startDate" class="text">Start Date</label>
        <input v-model="goal.startDate" type="date" />
        <label for="endDate" class="text">End Date</label>
        <input v-model="goal.endDate" type="date" />
        <button type="submit" class="button submit-button">Update</button>
      </form>
      <p v-else>Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
      <router-link to="/financial-goals" class="button">Back to List</router-link>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    name: 'EditFinancialGoal',
    data() {
      return {
        goal: null,
        error: null,
        success: null,
      };
    },
    methods: {
      async fetchGoal() {
        const id = this.$route.params.id;
        try {
          const response = await apiClient.get(`/FinancialGoals/${id}`);
          this.goal = response.data;
        } catch (err) {
          this.error = 'Failed to fetch the financial goal.';
          console.error(err);
        }
      },
      async updateGoal() {
        try {
          const id = this.goal.id;
          await apiClient.put(`/FinancialGoals/${id}`, this.goal);
          this.success = 'Financial goal updated successfully!';
          // Optionally, redirect to the list
          this.$router.push('/financial-goals');
        } catch (err) {
          this.error = 'Failed to update the financial goal.';
          console.error(err);
        }
      },
    },
    mounted() {
      this.fetchGoal();
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

.goal-form {
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