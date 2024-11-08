import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginUser from '../components/LoginUser.vue';
import RegisterUser from '../components/RegisterUser.vue';
import UserDashboard from '../components/UserDashboard.vue';
import IncomeCategoryList from '../components/IncomeCategoryList.vue';
import CreateIncomeCategory from '../components/CreateIncomeCategory.vue';
import EditIncomeCategory from '../components/EditIncomeCategory.vue';
import SpendingCategoryList from '@/components/SpendingCategoryList.vue';
import CreateSpendingCategory from '../components/CreateSpendingCategory.vue';
import EditSpendingCategory from '@/components/EditSpendingCategory.vue';
import CreateIncome from '@/components/CreateIncome.vue';
import EditIncome from '@/components/EditIncome.vue';
import IncomeList from '@/components/IncomeList.vue';
import CreateExpense from '@/components/CreateExpense.vue';
import EditExpense from '@/components/EditExpense.vue';
import ExpensesList from '@/components/ExpensesList.vue';
import CreateFinancialGoal from '@/components/CreateFinancialGoal.vue';
import EditFinancialGoal from '@/components/EditFinancialGoal.vue';
import FinancialGoalList from '@/components/FinancialGoalList.vue';
import CreateSaving from '@/components/CreateSaving.vue';
import EditSaving from '@/components/EditSaving.vue';
import SavingList from '@/components/SavingList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserDashboard,
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
    path: '/income-categories',
    name: 'IncomeCategoryList',
    component: IncomeCategoryList,
    meta: { requiresAuth: true } 
  },
  {
    path: '/create-spending-category',
    name: 'CreateSpendingCategory',
    component: CreateSpendingCategory,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-spending-category/:id',
    name: 'EditSpendingCategory',
    component: EditSpendingCategory,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/spending-categories',
    name: 'SpendingCategoryList',
    component: SpendingCategoryList,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-income',
    name: 'CreateIncome',
    component: CreateIncome,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-income/:id',
    name: 'EditIncome',
    component: EditIncome,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/income',
    name: 'IncomeList',
    component: IncomeList,
    meta: { requiresAuth: true } 
  },
  {
    path: '/create-expense',
    name: 'CreateExpense',
    component: CreateExpense,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-expense/:id',
    name: 'EditExpense',
    component: EditExpense,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/expenses',
    name: 'ExpensesList',
    component: ExpensesList,
    meta: { requiresAuth: true } 
  },
  {
    path: '/create-financial-goal',
    name: 'CreateFinancialGoal',
    component: CreateFinancialGoal,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-financial-goal/:id',
    name: 'EditFinancialGoal',
    component: EditFinancialGoal,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/financial-goals',
    name: 'FinancialGoalList',
    component: FinancialGoalList,
    meta: { requiresAuth: true } 
  },
  {
    path: '/create-saving',
    name: 'CreateSaving',
    component: CreateSaving,
    meta: { requiresAuth: true } 
  },
  {
    path: '/edit-saving/:id',
    name: 'EditSaving',
    component: EditSaving,
    props: true,
    meta: { requiresAuth: true } 
  },
  {
    path: '/savings',
    name: 'SavingList',
    component: SavingList,
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
      next({ name: 'LoginUser' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;