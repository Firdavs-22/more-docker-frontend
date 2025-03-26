<template>
  <v-chip v-if="connected === false" color="yellow" text="Connection lost. Please wait..."/>
  <v-btn v-if="connected === null" @click="connect" :loading="loading" color="green-lighten-1" variant="flat"
         text="Connect To Chat"/>
  <v-btn v-else color="red" variant="flat" text="Disconnect" @click="disconnect"/>
</template>

<script setup>
import {ref, defineEmits} from 'vue'

const props = defineProps({
  connected: Boolean
})

const loading = ref(false)

const emits = defineEmits(['connect', 'disconnect'])

const connect = async () => {
  loading.value = true
  emits('connect', () => loading.value = false)
}

const disconnect = () => {
  emits('disconnect')
}
</script>
