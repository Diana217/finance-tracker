<template>
    <nav class="sidebar">
        <ul>
          <li class="section">
            <h4>Income</h4>
            <ul>
              <li><router-link to="/income-categories">Income categories</router-link></li>
              <li><router-link to="/income">Income</router-link></li>
            </ul>
          </li>
          <li class="section">
            <h4>Expenses</h4>
            <ul>
              <li><router-link to="/expense-categories">Expense categories</router-link></li>
              <li><router-link to="/expenses">Expenses</router-link></li>
            </ul>
          </li>
          <!-- Add more sections as needed -->
        </ul>
    </nav>
</template>

<style scoped>
.sidebar {
    width: 220px;
    background-color: var(--sidebar-color);
    padding: 20px;
    border-right: 1px solid #ccc;
    display: flex;
    align-items: flex-start;
}

ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: left;
}

.section {
    margin-bottom: 20px;
}

h4 {
    margin: 10px 0;
}

a {
    text-decoration: none;
    color: var(--text-color);
    padding-left: 15px;
}
</style>  