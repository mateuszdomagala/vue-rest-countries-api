import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CountryPage from "../views/CountryPage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/:name',
    name: 'CountryPage',
    component: CountryPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
