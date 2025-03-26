<template>
  <v-list-item
    :title="user.username"
    :subtitle="getTimeDifference(user.last_login_at)"
  >
    <template v-slot:prepend>
      <v-avatar color="grey-lighten-3" :icon="`mdi-${icons[user.id % icons.length]}`"/>
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

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const icons = [
  'account',
  'account-outline',
  'account-cowboy-hat',
  'account-cowboy-hat-outline',
  'account-hard-hat-outline',
  'account-hard-hat',
  'account-school-outline',
  'account-school',
  'account-tie-hat-outline',
  'account-tie-hat',
  'account-tie-outline',
  'account-tie',
  'account-tie-woman',
]

</script>

