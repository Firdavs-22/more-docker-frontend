<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-toolbar-title>
        <v-icon
          v-if="connected !== null"
          :icon="connected ? 'mdi-lan-connect' : 'mdi-lan-disconnect'"
          :color="connected ? 'green' : 'red'"
          class="mr-1"
        />
        Chat
      </v-toolbar-title>
      <v-card-actions class="pr-3">
        <Connect :connected="connected" @connect="handleConnect" @disconnect="handleDisconnect"/>
      </v-card-actions>
    </v-toolbar>


    <List :messages="messages" :connected="connected" @createMessage="handleSendMessage"/>
  </v-card>
</template>


<script setup>
import {ref} from 'vue'
import {io} from 'socket.io-client'
import {useRouter} from 'vue-router'

import Connect from "@/components/Chat/Connect";
import List from "@/components/Chat/List";

const router = useRouter()
const connected = ref(null)
const messages = ref([])
let socket = null

const handleConnect = async (callback) => {
  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
    return
  }
  try {
    socket = io(import.meta.env.VITE_APP_API_URL, {
      auth: {
        token: token
      }
    })
    socket.on('connect', () => {
      callback()
      connected.value = true
      setupSocketListeners(socket)
      socket.emit('getAllMessages')
    })
    socket.on('disconnect', () => {
      connected.value = false
    })
  } catch (e) {
    console.log("Error on socket connect", e)
    callback()
  }
}

const setupSocketListeners = (socket) => {
  socket.on('unauthorized', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  })

  socket.on('allMessages', (data) => {
    messages.value = data
  })

  socket.on("newMessage", (data) => {
    messages.value.push(data)
  })
}

const handleSendMessage = ({message, callback}) => {
  if (!message || message.trim() === '') {
    return
  }
  callback()
  socket.emit('sendMessage', message)
}

const handleDisconnect = () => {
  if (socket) {
    socket.disconnect()
    connected.value = null
  }
}


</script>
