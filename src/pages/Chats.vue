<template>
  <v-card class="mx-auto my-5" max-width="600" elevation="5">
    <v-card-title class="headline grey lighten-3">
      Chat
    </v-card-title>

    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message"
        >
          <v-avatar color="blue lighten-4">
            <v-icon icon="mdi-account" size="36"/>
          </v-avatar>
          <v-list-item-title class="font-weight-bold">
            {{ message.user }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ message.text }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions class="flex-grow pa-4">
      <v-text-field
        label="Type a message..."
        clearable
        dense
        variant="outlined"
        hide-details="auto"
      />
      <v-btn
        color="primary"
        variant="flat"
        size="x-large"
        append-icon="mdi-send"
      >
        Send
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script setup>
import {ref} from 'vue'

const messages = ref([
  {
    user: "Alice",
    text: "Hi everyone!"
  },
  {
    user: "Bob",
    text: "Hello, Alice!"
  }
])
</script>

