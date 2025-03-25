<template>
  <v-app>
    <component :is="layout" v-bind="layoutProps">
      <RouterView />
    </component>
  </v-app>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import { useRoute } from 'vue-router';

import AuthLayout from "@/layouts/AuthLayout";
import Layout from "@/layouts/Layout";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout === 'auth' ? AuthLayout : Layout;
});

const layoutProps = computed(() => {
  return route.meta.layout === 'auth' ? {} : {
    items,
    userName: userName.value
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

const userName = ref("");

const updatePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(user && user.username){
    userName.value = user.username;
  } else {
    userName.value = ""
  }
}

onMounted(updatePage)

watch(route, updatePage)

</script>
