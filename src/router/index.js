import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue"

const routes = [
  { path: "/", exact: true, redirect: "/timetable" },
  {
    path: '/timetable',
    name: 'timetable',
    component: App,
    meta: { requiresGroup: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.requiresGroup && !localStorage.getItem('timetable-group-id') && localStorage.getItem('timetable-group-id') != "-1")
    next({ name: 'init' });
  else next();
})

export default router;
