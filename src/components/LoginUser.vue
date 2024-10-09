<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div>
          <label>Username:</label>
          <input v-model="username" type="text" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit">Login</button>
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
        password: '',
        error: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      async loginUser() {
        try {
          await this.login({
            username: this.username,
            password: this.password,
          });
          this.$router.push('/dashboard');
        } catch (err) {
          console.log(err)
          this.error = err.response?.data?.message || 'Login failed.';
        }
      },
    },
  };
  </script>  