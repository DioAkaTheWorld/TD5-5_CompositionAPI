import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue";
import GameView from "../views/GameView.vue";
import StatsView from "../views/StatsView.vue";
import { pseudo } from '../plugins/profile'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: "/game",
      name: "game",
      component: GameView
    },
    {
      path: "/stats",
      name: "stats",
      component: StatsView
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'home' && pseudo.value.trim() === '') {
    next('/home');
  } else {
    next();
  }
});

export default router
