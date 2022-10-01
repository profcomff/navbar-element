import { createRouter, createWebHistory } from 'vue-router'

const routes = [{ path: "/", exact: true, redirect: "/timetable" }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
