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

    <List
      :messages="messages"
      :connected="connected"
      @createMessage="handleSendMessage"
      @nextMessages="socketStore.nextMessages"
      @deleteMessage="socketStore.deleteMessage"
    />
  </v-card>
</template>


<script setup>
import {storeToRefs} from "pinia";
import {useSocketStore} from '@/stores/socket'
import Connect from "@/components/Chat/Connect";
import List from "@/components/Chat/List";

const socketStore = useSocketStore()
const {connected, messages} = storeToRefs(socketStore)

const handleConnect = async (callback) => {
  socketStore.connect(callback)
}

const handleSendMessage = (args) => socketStore.sendMessage(args)

const handleDisconnect = () => socketStore.disconnect()
</script>
