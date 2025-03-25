import {createWebHistory, createRouter} from "vue-router";

import Todos from "@/pages/Todos.vue"
import Login from "@/pages/Login"
import Register from "@/pages/Register";
import Users from "@/pages/Users";
import Chats from "@/pages/Chats";

export const routes = [
  {path: "/", component: Todos},
  {path: "/todos", component: Todos},
  {path: "/users", component: Users},
  {path: "/chats", component: Chats},
  {path: "/login", component: Login, meta: {layout: "auth"}},
  {path: "/register", component: Register, meta: {layout: "auth"}},
  {path: "/:pathMatch(.*)*", redirect: "/"}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if (!token && to.path !== "/login" && to.path !== "/register") {
    next("/login")
  } else if (token && (to.path === "/login" || to.path === "/register")) {
    next("/")
  } else {
    next()
  }
})


export default router
