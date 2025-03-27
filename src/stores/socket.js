import {defineStore} from 'pinia'
import {io} from 'socket.io-client'
import {nextTick} from "vue";
import {useRouter} from "vue-router";
import {useToastStore} from "@/stores/toast"

export const useSocketStore = defineStore('socket', {
  state: () => ({
    connected: null,
    messages: [],
    socket: null,
    isLastMessage: true,
    lastMessageId: null,
    isFirstLoad: true,
    toastStore: useToastStore(),
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
          this.toastStore.addToast("Connected to chat")
          callback()
          this.connected = true
          if (this.isFirstLoad) {
            this.isFirstLoad = false
            this.setupSocketListeners()
            this.socket.emit('getAllMessages')
          }
        })
        this.socket.on('disconnect', () => {
          this.toastStore.addToast("Disconnected from chat", {
            type: 'warning'
          })
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
        if (data.length === 0) {
          this.isLastMessage = true
          this.lastMessageId = null
        }
        this.isLastMessage = false
        this.lastMessageId = data[0].id

        this.messages = data
        await nextTick()
        this.scrollToBottom()
      })

      this.socket.on("newMessage", async (data) => {
        this.messages.push(data)
        await nextTick()
        this.scrollToBottom()
      })

      this.socket.on('nextMessages', async (data) => {
        const chatContainer = document.querySelector('.chat-container')
        const currentScrollHeight = chatContainer.scrollHeight
        const currentScrollTop = chatContainer.scrollTop

        if (data.length === 0 || data.length < 20) {
          this.isLastMessage = true
          this.lastMessageId = null
        } else {
          this.isLastMessage = false
          this.lastMessageId = data[0].id
        }

        this.messages = [...data, ...this.messages]
        await nextTick()
        chatContainer.scrollTop = chatContainer.scrollHeight - currentScrollHeight + currentScrollTop

      })

      this.socket.on('messageDeleted', async (message_id) => {
        this.messages = this.messages.filter(message => message.id !== message_id)
        this.messages = this.messages.filter(message => message.id !== message_id)
      })
    },
    sendMessage({message, callback}) {
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
        this.messages = []
        this.isLastMessage = true
        this.lastMessageId = null
        this.isFirstLoad = true
      }
    },
    scrollToBottom() {
      const chatContainer = document.querySelector('.chat-container')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    },
    nextMessages() {
      if (!this.isLastMessage && this.lastMessageId) {
        this.socket.emit('nextMessages', this.lastMessageId)
      }
    },
    deleteMessage(message_id) {
      this.socket.emit('deleteMessage', message_id)
    }
  },
})
