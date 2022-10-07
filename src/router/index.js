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
  {
    path: '/timetable/init',
    name: 'init',
    component: App
  },
  {
    path: '/apps',
    name: 'services',
    component: App
  },
  {
    path: '/apps/:errorCode',
    name: 'errors',
    component: App
  },
  { path: "/:pathMatch(.*)*", redirect: '/apps/404'}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

console.log(router.options.routes)

router.beforeEach((to, from, next) => {
  if (to.meta.requiresGroup && !localStorage.getItem('timetable-group-id') && localStorage.getItem('timetable-group-id') != "-1")
    next({ name: 'init' });
  else next();
})

export default router;
