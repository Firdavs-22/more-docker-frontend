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
          <v-icon icon="mdi-account-outline" size="x-large" class="mr-1"/>
          <span style="text-transform: none;">
            {{ userName }}
          </span>

          <v-menu activator="parent" origin="top">
            <v-list>
              <v-list-item link title="Update profile"/>

              <v-list-item link title="Sign out" @click="signOut" />
            </v-list>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.display.smAndDown"
      v-model="drawer"
      location="top"
      temporary
      :width="(items.length * 50)"
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
    </v-main>
  </v-layout>
</template>

<script setup>
import {shallowRef} from 'vue'
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const drawer = shallowRef(false)
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  }
})

const signOut = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  router.push("/login")
}
</script>
