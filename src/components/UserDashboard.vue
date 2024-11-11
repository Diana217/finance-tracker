<template>
  <div class="content-list dashboard">
      <h1>Dashboard</h1>

      <!-- Charts and Progress Bar in 2x2 Grid -->
      <div class="grid-container">
          <!-- Income vs. Expenses Line Chart -->
          <div class="grid-item chart-container">
              <h2>Income vs. Expenses</h2>
              <canvas id="incomeExpensesChart"></canvas>
          </div>

          <!-- Spending Breakdown Pie Chart -->
          <div class="grid-item chart-container">
              <h2>Spending Breakdown</h2>
              <div class="pie">
                <canvas id="spendingBreakdownChart"></canvas>
              </div>
          </div>

          <!-- Cash Flow Histogram -->
          <div class="grid-item chart-container">
              <h2>Cash Flow</h2>
              <canvas id="cashFlowChart"></canvas>
          </div>

          <!-- Savings Progress Bar -->
          <div class="grid-item chart-container">
            <h2>Savings Goals Progress</h2>
            <div v-for="goal in financialGoals" :key="goal.id" class="goal-progress">
              <h4 class="goal-name">{{ goal.name }}</h4>
              <div class="progress-bar" 
                :title="`${calculateProgress(goal)}% reached`">
                <div class="progress"
                  :style="{ width: `${calculateProgress(goal)}%` }"
                ></div>
              </div>
              <div class="goal-amounts">
                <span>{{ formatNumber(getCurrentSavings(goal)) }}</span>
                <span>{{ formatNumber(goal.targetAmount) }}</span>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import apiClient from '../services/api';

Chart.register(...registerables);

export default {
  name: "UserDashboard",
  data() {
      return {
        incomeExpensesData: {
            income: [],
            expenses: [],
          },
          spendingBreakdownData: [],
          cashFlowData: [],
          financialGoals: [],
          savings: [],
      };
  },
  methods: {
    renderIncomeExpensesChart() {
        const incomeData = this.getAggregatedData(this.incomeExpensesData.income);
        const expensesData = this.getAggregatedData(this.incomeExpensesData.expenses);

        new Chart(document.getElementById('incomeExpensesChart'), {
            type: 'line',
            data: {
                labels: this.getMonthLabels(),
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        borderColor: '#4CAF50',
                        fill: false
                    },
                    {
                        label: 'Expenses',
                        data: expensesData,
                        borderColor: '#F44336',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    },

    getAggregatedData(data) {
        const aggregated = {};
        data.forEach(item => {
            const month = item.date.slice(0, 7); // Отримуємо 'YYYY-MM'
            if (!aggregated[month]) {
                aggregated[month] = 0;
            }
            aggregated[month] += item.amount; // Сума за кожен місяць
        });
        
        return this.getMonthLabels().map(label => {
            const [month, year] = label.split(' ');
            const monthFormatted = `${year}-${new Date(month + " 1").getMonth() + 1}`.padStart(2, '0');
            return aggregated[monthFormatted] || 0;
        });
    },

    getMonthLabels() {
        const dates = [
            ...this.incomeExpensesData.income.map(item => item.date.slice(0, 7)),
            ...this.incomeExpensesData.expenses.map(item => item.date.slice(0, 7))
        ];

        const uniqueMonths = [...new Set(dates)].sort(); // Унікальні місяці в порядку зростання

        return uniqueMonths.map(month => {
            const date = new Date(`${month}-01`);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        });
    },

    renderSpendingBreakdownChart() {
        if (this.spendingChart) {
            this.spendingChart.destroy();
        }
        
        this.calculateSpendingBreakdownData();

        this.spendingChart = new Chart(document.getElementById('spendingBreakdownChart'), {
            type: 'pie',
            data: {
                labels: this.spendingBreakdownData.map(data => data.category),
                datasets: [
                    {
                        data: this.spendingBreakdownData.map(data => data.amount),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    },

    calculateSpendingBreakdownData() {
      const breakdown = {};
      this.incomeExpensesData.expenses.forEach(expense => {
        const categoryName = expense.category.name;
        if (!breakdown[categoryName]) {
          breakdown[categoryName] = 0;
        }
        breakdown[categoryName] += expense.amount;
      });
      this.spendingBreakdownData = Object.entries(breakdown).map(([name, amount]) => ({
        category: name,
        amount: amount
      }));
    },
    
    renderCashFlowChart() {
      if (this.cashFlowChart) {
        this.cashFlowChart.destroy();
      }

      const backgroundColors = this.cashFlowData.map(value => (value >= 0 ? '#4CAF50' : '#F44336'));

      this.cashFlowChart = new Chart(document.getElementById('cashFlowChart'), {
        type: 'bar',
        data: {
          labels: this.getMonthLabels(),
          datasets: [
            {
              label: 'Cash Flow',
              data: this.cashFlowData,
              backgroundColor: backgroundColors
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    },

    calculateCashFlowData() {
      const aggregated = {};

      // Aggregate income by month
      this.incomeExpensesData.income.forEach(income => {
        const month = income.date.slice(0, 7);
        if (!aggregated[month]) aggregated[month] = { income: 0, expenses: 0 };
        aggregated[month].income += income.amount;
      });

      // Aggregate expenses by month
      this.incomeExpensesData.expenses.forEach(expense => {
        const month = expense.date.slice(0, 7);
        if (!aggregated[month]) aggregated[month] = { income: 0, expenses: 0 };
        aggregated[month].expenses += expense.amount;
      });

      // Calculate net cash flow for each month label
      this.cashFlowData = this.getMonthLabels().map(label => {
        const [month, year] = label.split(' ');
        const monthFormatted = `${year}-${new Date(month + " 1").getMonth() + 1}`.padStart(2, '0');
        const values = aggregated[monthFormatted] || { income: 0, expenses: 0 };
        return values.income - values.expenses;
      });
    },

    calculateProgress(goal) {
      const savedAmount = this.getCurrentSavings(goal);
      return ((savedAmount / goal.targetAmount) * 100).toFixed(1);
    },

    getCurrentSavings(goal) {
      const savingsForGoal = this.savings
        .filter(s => s.goalId === goal.id)
        .reduce((total, s) => total + s.amount, 0);
      return savingsForGoal;
    },

    async fetchGoalsAndSavings() {
      try {
        const goalsResponse = await apiClient.get('/FinancialGoals');
        this.financialGoals = goalsResponse.data;
        
        const savingsResponse = await apiClient.get('/Savings');
        this.savings = savingsResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    formatNumber(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    async fetchIncome() {
            try {
                const response = await apiClient.get('/Incomes');
                this.incomeExpensesData.income = response.data.map(income_ => {
                    if (income_.date) {
                        income_.date = income_.date.split('T')[0];
                    }
                    return income_;
                });
            } catch (err) {
                this.error = 'Failed to fetch income.';
                console.error(err);
            }
        },
        async fetchExpenses() {
            try {
                const response = await apiClient.get('/Expenses');
                this.incomeExpensesData.expenses = response.data.map(expense => {
                    if (expense.date) {
                        expense.date = expense.date.split('T')[0];
                    }
                    return expense;
                });
            } catch (err) {
                this.error = 'Failed to fetch expenses.';
                console.error(err);
            }
        }
      },

      async mounted() {
        try {
          await Promise.all([this.fetchIncome(), this.fetchExpenses(), this.fetchGoalsAndSavings()]);
          this.calculateCashFlowData();
          this.renderIncomeExpensesChart();
          this.renderSpendingBreakdownChart();
          this.renderCashFlowChart();
        } catch (error) {
          console.error("Error during fetch: ", error);
        }
      }
}
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 350px;
}

.chart-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.goal-progress {
  width: 90%;
  margin-bottom: 20px;
}

.goal-progress h4 {
  text-align: left;
  margin: 0;
  font-weight: normal;
  color: #333;
}

.progress-bar {
  width: 100%;
  background-color: #ddd;
  border-radius: 8px;
  overflow: hidden;
  height: 20px;
  margin: 5px 0;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s;
}

.goal-amounts {
  display: flex;
  justify-content: space-between;
  font-size: 0.9em;
  color: #555;
}

.goal-amounts span {
  margin-top: 5px;
}

.pie {
  width: 250px;
  height: 250px;
}
</style>
