<template>
  <div id="app">
    <header>
      <h1>Finance Tracking App</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  background-color: #42b983;
  padding: 20px;
  color: white;
  text-align: center;
}
main {
  margin-top: 20px;
}
.button {
  padding: 5px 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.button:hover {
  background-color: #369870;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
