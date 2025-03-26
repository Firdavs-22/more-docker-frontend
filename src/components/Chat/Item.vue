<template>
  <v-list-item class="chat-message mb-2" lines>
    <template v-slot:prepend>
      <v-avatar color="blue lighten-4">
        <v-icon :icon="getAvatar(message.user_id)" size="36"/>
      </v-avatar>
    </template>

    <v-list-item-title class="font-weight-bold">
      {{ message.username }}
      <span class="text-caption text-disabled ml-3">
        {{ timeDifference }}
      </span>
    </v-list-item-title>

    <v-list-item-subtitle>
      {{ message.message }}
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getTimeDifference } from '@/utils/dateDiff.js'
import { getAvatar } from '@/utils/getAvatar.js'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})

const timeDifference = ref(getTimeDifference(props.message.created_at))

const updateTimeDifference = () => {
  timeDifference.value = getTimeDifference(props.message.created_at)
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(updateTimeDifference, 60000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
