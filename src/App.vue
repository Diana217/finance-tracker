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
  --primary-color: #a8dadc; /* Світло-блакитний */
  --secondary-color: #f1faee; /* Світло-зелений */
  --accent-color: #ffb6b9; /* Пастельний рожевий */
  --text-color: #1d3557; /* Темно-синій */
  --button-hover: #ff8b94; /* Темніший рожевий для кнопки при наведенні */
  --form-color: #f5fff3;
  --sidebar-color: #1cbec43c;
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
