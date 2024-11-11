<template>
  <div id="app">
    <header>
      <h1>Finance Tracker</h1>
      <nav v-if="isAuthenticated">
        <span class="welcome-message">Welcome, {{ getEmail }}</span>
        <button class="button" @click="handleLogout">Logout</button>
      </nav>
    </header>
    <main>
      <div v-if="isAuthenticated">
        <nav-component />
      </div>
      <div class="content-area">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavComponent from './components/NavComponent.vue';

export default {
  name: 'App',
  components: {
    NavComponent
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getEmail']),
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout(); 
      this.$router.push('/login');
    },
  },
};
</script>

<style>
:root {
  --primary-color: #E5D9F2; 
  --secondary-color: #F5EFFF; 
  --accent-color: #A594F9;
  --text-color: #333333;
  --button-hover: #8168ff; 
  --form-color: #faf7ff;
  --sidebar-color: #e9d9f7;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--secondary-color);
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin: 0;
  font-size: 1.8em;
  color: var(--text-color);
}

label {
  margin-bottom: 5px;
  font-weight: bold;
  display: block;
}

select, input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
  margin-right: 10px; 
}

nav {
  display: flex;
  align-items: center;
}

.welcome-message {
  margin-right: 15px;
  font-size: 1em;
  color: var(--text-color);
}

.button {
  padding: 8px 16px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.button:hover {
  background-color: var(--button-hover);
}

.add-button {
  text-align: right;
  margin-bottom: 20px;
}

.submit-button {
    display: block;
    margin-bottom: 20px;
    width: fit-content;
}

main {
  padding: 20px;
  display: flex;
  min-height: 85vh;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: left;
}

.create-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-bottom: 15px;
}

.category-form {
  display: flex;
  flex-direction: column;
  justify-content: left;
  max-width: 80%;
  margin-bottom: 15px;
}

.input-container {
  display: flex; 
  align-items: center;
  margin-bottom: 20px;
}

.edit-form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-bottom: 15px;
}

.content-list {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

table {
    width: 100%;
    border-collapse: collapse; 
}

tr {
  display: table-row;
  border-bottom: 1px solid #e0e0e0;
}

th, td {
  padding: 10px 20px; 
  text-align: left;
}

td:last-child {
    display: inline-table;
    text-align: right;
    margin: 7px 0 7px 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.success {
  color: green;
  text-align: center;
  margin-top: 10px;
}
</style>
