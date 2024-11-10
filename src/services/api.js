import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7057/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додавання перехоплювача запитів для додавання токена до заголовків
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Додавання перехоплювача відповідей для обробки помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

export const apiService = {
  async fetchSpendingCategories() {
    return apiClient.get('/SpendingCategories');
  },
  
  async fetchExpenses() {
    return apiClient.get('/Expenses');
  },

  async fetchExpense(id) {
    return apiClient.get(`/Expenses/${id}`);
  },

  async createExpense(payload) {
    return apiClient.post('/Expenses', payload);
  },

  async updateExpense(id, expense) {
    return apiClient.put(`Expenses/${id}`, expense);
  },

  async deleteExpense(id) {
    return apiClient.delete(`/Expenses/${id}`);
  },
};