<template>
  <v-app>
    <component :is="layout" v-bind="layoutProps">
      <RouterView />
    </component>
  </v-app>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "@/plugins/axios.js";
import AuthLayout from "@/layouts/AuthLayout";
import Layout from "@/layouts/Layout";


const route = useRoute();
const router = useRouter()

const layout = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : Layout;
});

const layoutProps = computed(() => {
  return route.meta.layout === 'auth' ? {} : {
    items,
    user: user ? user.value : null
  };
});

const items = [
  {
    text: 'ToDo',
    prependIcon: 'mdi-format-list-checkbox',
    path: '/'
  },
  {
    text: 'Users',
    prependIcon: 'mdi-account-multiple-outline',
    path: "/users"
  },
  {
    text: 'Chat',
    prependIcon: 'mdi-forum-outline',
    path: "/chats"
  }
]

const user = ref(JSON.parse(localStorage.getItem("user")));

const updatePage = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user.id){
      try {
        const res = await axios.get("/user/me");
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          user.value = res.data.user;
        } else {
          localStorage.removeItem("token")
          localStorage.removeItem("user");
          router.push("/login");
        }
      } catch (e) {
        console.log("Error on Checking user",e);
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        router.push("/login");
      }

    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("user");
      router.push("/login");
    }
  }
}

onMounted(updatePage)

watch(route, updatePage)

</script>
