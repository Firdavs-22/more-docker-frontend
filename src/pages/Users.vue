<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar image="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg">
      <v-toolbar-title>Users</v-toolbar-title>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>

    <List :users="users"/>
  </v-card>
</template>
<script setup>
import {onMounted, ref} from "vue";
import List from "@/components/Users/List";
import axios from "@/plugins/axios.js";
import {useRouter} from "vue-router";


const users = ref([])
const router = useRouter();

const getUsers = async () => {
  try {
    const res = await axios.get("/user/");
    if (res.status === 200) {
      users.value = res.data.users;
    }
  } catch (e) {
    console.log("Error on getting users", e);
    if (e.response && e.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }
};

onMounted(getUsers);

</script>
