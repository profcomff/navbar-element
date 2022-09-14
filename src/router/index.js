import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: "/", exact: true, redirect: "/apps" }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
