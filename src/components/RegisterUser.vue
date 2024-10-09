<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label>Username:</label>
          <input v-model="username" type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
      };
    },
    methods: {
      ...mapActions(['register']),
      async registerUser() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Passwords do not match.';
          return;
        }
        try {
          await this.register({
            username: this.username,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });
          this.$router.push('/dashboard');
        } catch (err) {
          this.error = err.response?.data?.message || 'Registration failed.';
        }
      },
      register() {
        this.registerUser();
      },
    },
  };
  </script>  