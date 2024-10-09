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
