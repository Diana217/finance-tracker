<template>
    <div class="form-container">
        <h1>Create New Spending Category</h1>
        <form @submit.prevent="createCategory" class="category-form">
            <label for="name">Name</label>
            <div class="input-container">
                <input type="text" v-model="name" required />
                <button type="submit" class="button">Create</button>
            </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
        <router-link to="/spending-categories" class="button">Back to List</router-link>
    </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
    name: 'CreateIncomeCategory',
    data() {
        return {
            name: '',
            error: null,
            success: null
        };
    },
    methods: {
        async createCategory(){
            try {
                const payload = {
                    name: this.name,
                };
                await apiClient.post('/SpendingCategories', payload);
                this.success = 'Income category created successfully!';
                this.name = '';
                this.$router.push('/spending-categories');
            } catch (err) {
                this.error = 'Failed to create spending category.';
                console.log(err);
            }
        }
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
    text-align: center;
}
</style>