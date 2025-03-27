<template>
  <v-list-item class="chat-message mb-2" lines>
    <template v-slot:prepend>
      <v-avatar :color="getColor(message.user_id)">
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

    <template v-if="deletable" v-slot:append>
      <v-btn color="red" icon="mdi-delete" density="compact" size="small" variant="text" class="mr-1" @click="$emit('deleteMessage')" />
    </template>
  </v-list-item>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getTimeDifference } from '@/utils/dateDiff.js'
import {getAvatar, getColor} from '@/utils/getAvatar.js'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  deletable: Boolean
})

const emit = defineEmits(['deleteMessage'])

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
