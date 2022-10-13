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
    path: '/timetable/event/:eventId',
    component: App
  },
  {
    path: '/timetable/room/:roomId',
    component: App
  },
  {
    path: '/timetable/lecturer/:lecturerId',
    component: App
  },
  {
    path: '/timetable/admin',
    component: App
  },
  {
    path: '/timetable/admin/lecturer',
    component: App
  },
  {
    path: '/timetable/admin/room',
    component: App
  },
  {
    path: '/timetable/admin/event',
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
  console.log(to)
  if (to.meta.requiresGroup && !localStorage.getItem('timetable-group-id') && localStorage.getItem('timetable-group-id') != "-1")
    next({ name: 'init' });
  else next();
})

export default router;
