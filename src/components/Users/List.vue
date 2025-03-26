<template>
  <v-list class="scrollable-list" lines="two" max-height="600" overflow-y="auto">
    <Item
      v-if="users.length !== 0"
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
    <v-list-item v-else>
      <v-list-item-title>No users found</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import Item from "@/components/Users/Item.vue";

const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
});

</script>

<style scoped>
.scrollable-list {
  box-shadow:
    inset 0 20px 20px 0 rgba(18, 18, 18, .7),
    inset 0 -20px 20px 0 rgba(18, 18, 18, .7);
}
</style>
