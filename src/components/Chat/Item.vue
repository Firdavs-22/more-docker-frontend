<template>
  <v-list-item
    class="chat-message mb-2"
    lines
  >
    <template v-slot:prepend>
      <v-avatar color="blue lighten-4">
        <v-icon :icon="getAvatar(message.user_id)" size="36"/>
      </v-avatar>
    </template>

    <v-list-item-title class="font-weight-bold">
      {{ message.username }}
      <span class="text-caption text-disabled ml-3">
              {{ getTimeDifference(message.created_at) }}
            </span>
    </v-list-item-title>

    <v-list-item-subtitle>
      {{ message.message }}
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup>
import {getTimeDifference} from "@/utils/dateDiff.js";
import {getAvatar} from "@/utils/getAvatar.js";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
</script>
