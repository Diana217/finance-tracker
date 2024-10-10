<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="password-field">
        <label for="password">Password</label>
        <input 
          :type="passwordVisible ? 'text' : 'password'" 
          id="password" 
          v-model="password" 
          required 
        />
        <span class="toggle-password" @click="togglePasswordVisibility">
          <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
      <div class="password-field">
        <label for="confirmPassword">Confirm Password</label>
        <input 
          :type="confirmPasswordVisible ? 'text' : 'password'" 
          id="confirmPassword" 
          v-model="confirmPassword" 
          required 
        />
        <span class="toggle-password" @click="toggleConfirmPasswordVisibility">
          <i :class="confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
      <button type="submit" class="button">Register</button>
    </form>
    <div class="registered-text">Have account?</div>
    <button class="login-button" @click="goToLogin">Login</button>
    <div v-if="error" class="error">{{ error }}</div>
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
      passwordVisible: false,
      confirmPasswordVisible: false,
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
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: var(--form-color);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

.registered-text {
  text-align: center;
  margin: 20px 0;
  color: #afafaf;
}

.login-button {
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

.login-button:hover {
  background-color: #5a6268;
}

.error {
  margin-top: 10px;
  color: red;
  font-weight: bold;
}
</style>
