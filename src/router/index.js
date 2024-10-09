import { createRouter, createWebHistory } from 'vue-router';
import IncomeCategoryList from '../components/IncomeCategoryList.vue';
import CreateIncomeCategory from '../components/CreateIncomeCategory.vue';
import EditIncomeCategory from '../components/EditIncomeCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IncomeCategoryList,
  },
  {
    path: '/create',
    name: 'CreateIncomeCategory',
    component: CreateIncomeCategory,
  },
  {
    path: '/edit/:id',
    name: 'EditIncomeCategory',
    component: EditIncomeCategory,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;