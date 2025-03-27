<template>
  <v-snackbar
    v-model="visible"
    :timeout="toast.timeout"
    :color="toastColor"
    variant="tonal"
    :opacity="Math.random() * 10"
    transition="scale-transition"
    @input="onInput"
  >
    <v-icon v-if="!toast.user_id" left class="mr-2">{{ toastIcon }}</v-icon>
    <v-avatar v-else size="24" :color="getColor(toast.user_id)" :icon="getAvatar(toast.user_id)" />

    {{ toast.message }}
    <template v-slot:actions>
      <v-btn icon="mdi-close" text density="comfortable" @click="close"  />
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from 'vue';
import {getAvatar, getColor} from "@/utils/getAvatar.js";

const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['close']);

const visible = ref(true);

const toastColor = computed(() => {
  if (props.toast.type === 'warning' || props.toast.type === 'disconnected') return 'warning';
  if (props.toast.type === 'error') return 'error';
  return 'info';
});

const toastIcon = computed(() => {
  if (props.toast.type === 'warning') return 'mdi-alert';
  if (props.toast.type === 'error') return 'mdi-alert-circle';
  return 'mdi-information';
});

function onInput(value) {
  if (!value) {
    emit('close', props.toast.id);
  }
}

function close() {
  visible.value = false;
}
</script>

