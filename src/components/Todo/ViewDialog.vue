<template>
  <v-dialog :model-value="dialog" @update:model-value="value => $emit('update:dialog',value)" max-width="700">
    <v-card>
      <v-toolbar color="blue" dark>
        <v-toolbar-title text="Task Details"/>
        <v-spacer/>
        <v-btn icon="mdi-close" @click="closeDialog"/>
      </v-toolbar>
      <v-card-text v-if="task">
        <div>
          <strong>Task:</strong> {{ task.title }}
        </div>
        <div>
          <strong>Description:</strong> {{ task.description }}
        </div>
        <div>
          <strong>Created:</strong> {{ formatDate(task.created_at) }}
        </div>
        <div>
          <strong>Updated:</strong> {{ formatDate(task.updated_at) }}
        </div>
        <div>
          <strong>Completed:</strong> {{ task.completed_at ? formatDate(task.completed_at) : 'Not completed' }}
        </div>
        <div>
          <strong>Status:</strong>
          <v-icon v-if="task.completed" icon="mdi-check" color="green" />
          <v-icon v-else icon="mdi-close" color="red" />
        </div>
      </v-card-text>
      <v-card-actions class="pr-6 mb-2">
        <v-btn color="grey" variant="flat" @click="closeDialog" text="Close" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { formatDate } from '@/utils/date.js'

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  task: Object
})

console.log(props.task)

const emit = defineEmits(['update:dialog'])

const closeDialog = () => emit('update:dialog', false)

</script>
