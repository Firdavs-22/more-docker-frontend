<template>
  <div v-if="connected !== null">
    <div ref="chatContainer" class="chat-container" @scroll="handleScroll">
      <v-list>
        <Item
          v-for="message in messages"
          :key="message.id"
          :message="message"
          @deleteMessage="() => handleDeleteMessage(message)"
          :deletable="isDeletable(message.user_id)"
        />
      </v-list>

      <v-btn
        :class="{ hidden: atBottom }"
        color="grey-lighten-1"
        variant="flat"
        @click="scrollToBottomSmooth"
        class="sticky-button"
        icon="mdi-chevron-down"
        :disabled="atBottom"
      />
    </div>

    <v-divider></v-divider>

    <v-form lazy-validation @submit.prevent="handleCreateMessage">
      <v-card-actions class="pa-4">
        <v-text-field
          label="Type a message..."
          clearable
          placeholder="Write your message here..."
          dense
          variant="outlined"
          hide-details="auto"
          :error-messages="errorMessage"
          :disabled="connected === false"
          v-model="newMessages"
        />
        <v-btn
          type="submit"
          color="primary"
          variant="flat"
          size="x-large"
          append-icon="mdi-send"
          class="align-self-start"
          text="Send"
          :disabled="connected === false"
        />
      </v-card-actions>
    </v-form>
  </div>

  <v-card-text v-else class="text-center pa-8 text-h6">
    Please press the
    <v-chip text="connect to chat" class="text-uppercase" color="green-lighten-1"/>
    button to start chatting.
  </v-card-text>
</template>

<script setup>
import {nextTick, onMounted, ref, watch} from "vue";
import Item from "@/components/Chat/Item.vue";

const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
  connected: Boolean
})
const emit = defineEmits(['createMessage', "nextMessages", "deleteMessage"])

const chatContainer = ref(null)
const atBottom = ref(true)
const newMessages = ref("")
const errorMessage = ref("")

const handleCreateMessage = () => {
  if (!newMessages.value || newMessages.value.toString().trim() === "") {
    errorMessage.value = "Message cannot be empty"
    return
  }
  errorMessage.value = ''
  emit('createMessage', {
    message: newMessages.value,
    callback: () => {
      newMessages.value = ""
    }
  })
}

const handleScroll = () => {
  if (chatContainer.value) {
    const threshold = 100
    const position = chatContainer.value.scrollTop + chatContainer.value.clientHeight
    const height = chatContainer.value.scrollHeight
    atBottom.value = position >= height - threshold

    if (chatContainer.value.scrollTop === 0) {
      emit("nextMessages")
    }
  }
}

const scrollToBottomSmooth = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTo({
      top: chatContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const user = JSON.parse(localStorage.getItem('user'))
const isDeletable = (user_id) => {
  return Number(user.id) === user_id
}


const handleDeleteMessage = (item) => {
  if (isDeletable(item.user_id)) emit('deleteMessage', item.id)
}

onMounted(scrollToBottom)

</script>

<style scoped>
.chat-container {
  height: 600px;
  overflow-y: auto;
  position: relative;
}

.sticky-button {
  position: sticky;
  bottom: 10px;
  left: 90%;
}

.hidden {
  opacity: 0;
  transition: opacity 0.3s linear;
}
</style>
