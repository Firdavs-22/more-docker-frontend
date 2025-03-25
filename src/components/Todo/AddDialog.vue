<template>
  <v-dialog :model-value="dialog" @update:model-value="value => $emit('update:dialog', value)" max-width="700">
    <v-card>
      <v-toolbar color="blue" dark>
        <v-toolbar-title text="Add New Task"/>
        <v-spacer />
        <v-btn icon="mdi-close" @click="closeDialog" />
      </v-toolbar>

      <v-card-item>
        <v-text-field
          v-model="newTask"
          variant="outlined"
          label="Task"
          placeholder="Enter a new task"
          clearable
          outlined
          required
          dense
          class="my-3"
          :rules="[() => !!newTask.toString().trim() || 'Task field is required']"
          :error-messages="taskError"
          @input="taskError = ''"
        />
        <v-text-field
          v-model="newDescription"
          variant="outlined"
          label="Description"
          placeholder="Enter a description"
          outlined
          clearable
          dense
        />
      </v-card-item>

      <v-card-actions class="pr-6 mb-2">
        <v-btn color="grey" variant="flat" @click="closeDialog" class="mr-2" text="Close"/>
        <v-btn color="blue" variant="flat" @click="handleAddTask" text="Add Task" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits} from 'vue'

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:dialog', 'add-task'])

const newTask = ref("")
const newDescription = ref("")
const taskError = ref("")

const closeDialog = () => emit('update:dialog', false)

const handleAddTask = () => {
  if (!newTask.value.toString().trim()) {
    taskError.value = "Task field is required"
    return
  }
  taskError.value = ""
  emit('add-task', {
    task: newTask.value.toString().trim(),
    description: newDescription.value.toString().trim()
  })
  closeDialog()
  newTask.value = "";
  newDescription.value = "";
}
</script>
