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
    <v-icon left class="mr-2">{{ toastIcon }}</v-icon>
    {{ toast.message }}
    <template v-slot:actions>
      <v-btn icon="mdi-close" text density="comfortable" @click="close"  />
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['close']);

const visible = ref(true);

const toastColor = computed(() => {
  if (props.toast.type === 'warning') return 'warning';
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

