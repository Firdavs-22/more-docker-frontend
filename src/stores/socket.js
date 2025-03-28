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
          callback()
          this.connected = true
          if (this.isFirstLoad) {
            this.toastStore.addToast("Connected to chat")
            this.isFirstLoad = false
            this.setupSocketListeners()
            this.socket.emit('getAllMessages')
          } else {
            this.toastStore.addToast("Reconnected to chat")
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
        this.toastStore.addToast("Unauthorized", {
          type: 'error'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        useRouter().push('/login')
      })

      this.socket.on('userConnected', (data) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (data.id !== currentUser.id) this.toastStore.addToast(`${data.username} connected`, {
          type: "connected",
          user_id: data.id
        });
      });

      this.socket.on('userDisconnected', (data) => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (data.id !== currentUser.id) this.toastStore.addToast(`${data.username} disconnected`, {
          type: 'disconnected',
          user_id: data.id
        });

      });

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
        if (data.user_id !== JSON.parse(localStorage.getItem('user')).id) {
          this.toastStore.addToast(`New message from: ${data.username}`)
        }
        this.messages.push(data)

        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return
        const threshold = 800;
        const isNearBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < threshold;
        await nextTick()
        if (isNearBottom) {
          this.scrollToBottom()
        }
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
        const data = this.messages.find(message => message.id === message_id)
        if (data) {
          const user = JSON.parse(localStorage.getItem('user'))
          console.log(user.id, data.user_id)
          if (user.id !== data.user_id) {
            this.toastStore.addToast(`${data.username} deleted a message`)
          } else {
            this.toastStore.addToast(`You deleted a message`)
          }
        }
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
