import {defineStore} from 'pinia'
import {io} from 'socket.io-client'
import {nextTick} from "vue";
import {useRouter} from "vue-router";

export const useSocketStore = defineStore('socket',{
  state: () => ({
    connected: null,
    messages: [],
    socket: null,
  }),
  actions: {
    async connect(callback) {
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return useRouter().push('/login')
      }

      try {
        this.socket = io(import.meta.env.VITE_APP_API_URL, {
          auth: {
            token: token
          }
        })
        this.socket.on('connect', () => {
          callback()
          this.connected = true
          this.setupSocketListeners()
          this.socket.emit('getAllMessages')
        })
        this.socket.on('disconnect', () => {
          this.connected = false
        })
      } catch (e) {
        console.log("Error on socket connect", e)
        callback()
      }
    },
    setupSocketListeners() {
      this.socket.on('unauthorized', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        useRouter().push('/login')
      })

      this.socket.on('allMessages', async (data) => {
        this.messages = data
        await nextTick()
        this.scrollToBottom()
      })

      this.socket.on("newMessage", async (data) => {
        this.messages.push(data)
        await nextTick()
        this.scrollToBottom()
      })
    },
    sendMessage({ message, callback }) {
      if (!message || message.trim() === '') {
        return
      }
      callback()
      this.socket.emit('sendMessage', message)
    },
    disconnect() {
      if (this.socket) {
        this.socket.disconnect()
        this.connected = null
      }
    },
    scrollToBottom() {
      const chatContainer = document.querySelector('.chat-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }
  },
})
