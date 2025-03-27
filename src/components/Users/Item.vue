<template>
  <v-list-item
    :title="user.username"
    :subtitle="getTimeDifference(user.last_login_at)"
  >
    <template v-slot:prepend>
      <v-avatar :color="getColor(user.id)" :icon="getAvatar(user.id)"/>
    </template>

    <template v-slot:append>
      <v-btn
        color="grey-lighten-1"
        icon="mdi-email-outline"
        variant="text"
        :href="`mailto:${user.email}`"
        target="_blank"
      />
      <v-btn
        color="grey-lighten-1"
        icon="mdi-message-outline"
        to="/chats"
        variant="text"
      />
    </template>
  </v-list-item>
</template>

<script setup>
import {getTimeDifference} from "@/utils/dateDiff.js";
import {getAvatar, getColor} from "@/utils/getAvatar.js";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});



</script>

