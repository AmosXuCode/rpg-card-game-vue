import { createRouter, createWebHistory } from "vue-router";
import HeroInterface from "../views/HeroInterface.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HeroInterface",
      component: HeroInterface,
    },
    {
      path: "/arena",
      name: "arena",
      component: () => import("../views/ArenaArea.vue"),
    },
  ],
});

export default router;
