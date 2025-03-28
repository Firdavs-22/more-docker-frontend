<template>
  <v-layout>
    <v-app-bar class="px-md-4 border-b" flat>
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="$vuetify.display.smAndDown"
          @click="drawer = !drawer"
        />
      </template>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :active="item.path === route.path"
          class="me-2 text-none"
          v-bind="item"
          :to="item.path"
        />
      </template>

      <v-spacer/>

      <template #append>
        <v-btn class="ms-1">
          <v-avatar :color="getColor(user.id)" density="compact"  class="mr-1" :icon="getAvatar(user.id)"/>
          <span style="text-transform: none;" class="text-body-1 font-weight-bold">
            {{ user.username }}
          </span>

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Update profile"/>

              <v-list-item link title="Sign out" @click="signOut"/>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      location="left"
      temporary
    >
      <v-list class="py-0" slim>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :active="item.path === route.path"
          link
          :prepend-icon="item.prependIcon"
          :title="item.text"
          :to="item.path"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="pa-4 pt-6">
        <slot/>
      </div>

      <Toast
        v-for="(toast,i) in toastStore.toasts"
        :key="toast.id"
        :toast="toast"
        :style="{ marginBottom: calcMargin(i) }"
        @close="toastStore.removeToast"
      />

    </v-main>
  </v-layout>
</template>

<script setup>
import {shallowRef} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useSocketStore} from "@/stores/socket";
import {useToastStore} from "@/stores/toast";
import Toast from "@/components/UI/Toast.vue";
import {getAvatar, getColor} from "@/utils/getAvatar";

const route = useRoute();
const router = useRouter();
const socket = useSocketStore()
const toastStore = useToastStore()

function calcMargin(i) {
  if (i === 0) return 20 + 'px';
  return (i * 60 + 20) + 'px';
}

const drawer = shallowRef(false)
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  }
})

const signOut = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  socket.disconnect()
  router.push("/login")
}
</script>
