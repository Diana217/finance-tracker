import { createRouter, createWebHistory } from 'vue-router';
import IncomeCategoryList from '../components/IncomeCategoryList.vue';
import CreateIncomeCategory from '../components/CreateIncomeCategory.vue';
import EditIncomeCategory from '../components/EditIncomeCategory.vue';
import store from '../store';
import LoginUser from '../components/LoginUser.vue';
import RegisterUser from '../components/RegisterUser.vue';
import UserDashboard from '../components/UserDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IncomeCategoryList,
  },
  {
    path: '/create-income-category',
    name: 'CreateIncomeCategory',
    component: CreateIncomeCategory,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-income-category/:id',
    name: 'EditIncomeCategory',
    component: EditIncomeCategory,
    props: true,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    name: 'LoginUser', 
    component: LoginUser
  },
  { 
    path: '/register', 
    name: 'RegisterUser', 
    component: RegisterUser 
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;