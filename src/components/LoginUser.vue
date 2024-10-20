<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="password-field">
        <label for="password">Password</label>
        <input 
          :type="passwordVisible ? 'text' : 'password'" 
          v-model="password" 
          required 
        />
        <span class="toggle-password" @click="togglePasswordVisibility">
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
      <button type="submit" class="button">Login</button>
    </form>
    <div class="or-text">OR</div>
    <button class="register-button" @click="goToRegister">Register</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginUser',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      passwordVisible: false, 
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
        console.log(err);
        this.error = err.response?.data?.message || 'Login failed.';
      }
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--form-color);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  color: var(--text-color);
}

form div {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
  font-weight: normal;
}

input {
  width: 96%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 33px;
  cursor: pointer;
  color: #888;
}

.toggle-password:hover {
  color: var(--accent-color);
}

.button {
  width: 100%;
  padding: 10px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--button-hover);
}

.or-text {
  text-align: center;
  margin: 20px 0;
  color: #afafaf;
}

.register-button {
  width: 100%;
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #5a6268;
}

.error {
  margin-top: 10px;
  color: red;
  font-weight: bold;
}
</style>