<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" title="Chat"/>

    <div ref="chatContainer" class="chat-container" @scroll="handleScroll">
      <v-list>
        <v-list-item
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message mb-2"
          lines
        >
          <template v-slot:prepend>
            <v-avatar color="blue lighten-4">
              <v-icon icon="mdi-account" size="36"/>
            </v-avatar>
          </template>

          <v-list-item-title class="font-weight-bold">
            {{ message.user }}
            <span class="text-caption text-disabled ml-3">
              {{ getTimeDifference(message.created_at) }}
            </span>
          </v-list-item-title>

          <v-list-item-subtitle>
            {{ message.text }}
          </v-list-item-subtitle>
        </v-list-item>
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

    <v-card-actions class="pa-4 ">
      <v-text-field
        label="Type a message..."
        clearable
        placeholder="Write your message here..."
        dense
        variant="outlined"
        hide-details="auto"
      />
      <v-btn
        color="primary"
        variant="flat"
        size="x-large"
        append-icon="mdi-send"
        text="Send"
      />

    </v-card-actions>
  </v-card>
</template>


<script setup>
import {onMounted, ref} from 'vue'
import {getTimeDifference} from "@/utils/dateDiff";

const messages = ref([
  {
    user: "Alice",
    text: "Hi everyone! How are you all doing today?",
    created_at: "2024-09-01T12:00:00"
  },
  {
    user: "Bob",
    text: "Hello, Alice! I'm doing well, thank you. How about you?",
    created_at: "2024-09-01T12:05:00"
  },
  {
    user: "Charlie",
    text: "Hey folks! Just finished a big project at work.",
    created_at: "2024-09-01T12:10:00"
  },
  {
    user: "Alice",
    text: "How's it going? I'm doing great, just enjoying the weather.",
    created_at: "2024-09-01T12:15:00"
  },
  {
    user: "Bob",
    text: "All good here! Just relaxing after a long day.",
    created_at: "2024-09-01T12:20:00"
  },
  {
    user: "Charlie",
    text: "Same here! Looking forward to the weekend.",
    created_at: "2024-09-01T12:25:00"
  },
  {
    user: "Alice",
    text: "Great to hear! Any plans for the weekend?",
    created_at: "2024-09-01T12:30:00"
  },
  {
    user: "Bob",
    text: "I'm planning to go hiking. What about you, Charlie?",
    created_at: "2024-09-01T12:35:00"
  },
  {
    user: "Charlie",
    text: "I'm thinking of visiting some friends and maybe catching a movie.",
    created_at: "2024-09-01T12:40:00"
  },
  {
    user: "Alice",
    text: "That sounds fun! I might just relax at home and read a book.",
    created_at: "2024-09-01T12:45:00"
  },
  {
    user: "Bob",
    text: "Reading sounds like a great idea. Any book recommendations?",
    created_at: "2024-09-01T12:50:00"
  },
  {
    user: "Charlie",
    text: "I've been reading 'The Great Gatsby' recently. It's a classic!",
    created_at: "2024-09-01T12:55:00"
  },
  {
    user: "Alice",
    text: "I love 'The Great Gatsby'! It's one of my favorites.",
    created_at: "2024-09-01T13:00:00"
  },
  {
    user: "Bob",
    text: "I'll have to check it out. Thanks for the recommendation!",
    created_at: "2024-09-01T13:05:00"
  },
  {
    user: "Charlie",
    text: "No problem! Let me know what you think of it.",
    created_at: "2024-09-01T13:10:00"
  },
  {
    user: "Alice",
    text: "Will do! Have a great weekend, everyone!",
    created_at: "2024-09-01T13:15:00"
  },
  {
    user: "Bob",
    text: "You too, Alice! Take care!",
    created_at: "2025-03-26T09:20:00"
  },
  {
    user: "Charlie",
    text: 'See you all later! Enjoy your weekend! And happy reading, Bob! No spoilers! How about we catch up on Monday? Or maybe Tuesday? Let me know! Maybe we can go for a movie or something. Have a great weekend! Take care! See you all later! Enjoy your weekend! And happy reading, Bob! No spoilers! How about we catch up on Monday? Or maybe Tuesday? Let me know! Maybe we can go for a movie or something. Have a great weekend! Take care',
    created_at: "2025-03-26T09:40:00"
  }
])

const chatContainer = ref(null)
const atBottom = ref(true)

const handleScroll = () => {
  if (chatContainer.value) {
    const threshold = 50
    const position = chatContainer.value.scrollTop + chatContainer.value.clientHeight
    const height = chatContainer.value.scrollHeight
    atBottom.value = position >= height - threshold
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
  transition: opacity 0.5s ease-in;
}

</style>
