<template>
  <v-dialog :model-value="dialog" @update:model-value="value => $emit('update:dialog', value)" max-width="700">
    <v-card>
      <v-toolbar color="blue" dark>
        <v-toolbar-title text="Edit Task"/>
        <v-spacer/>
        <v-btn icon="mdi-close" @click="closeDialog"/>
      </v-toolbar>

      <v-card-item>
        <v-text-field
          v-model="editedTask"
          label="Task"
          placeholder="Edit task"
          outlined
          required
          dense
          class="my-3"
          variant="outlined"
          :rules="[() => !!editedTask.toString().trim() || 'Task field is required']"
          :error-messages="editTaskError"
          clearable
          @input="editTaskError = ''"
        />
        <v-text-field
          variant="outlined"
          v-model="editedDescription"
          label="Description"
          placeholder="Edit description"
          outlined
          dense
          clearable
        />
      </v-card-item>

      <v-card-actions class="pr-6 mb-2">
        <v-btn color="grey" variant="flat" @click="closeDialog" text="Close"/>
        <v-btn color="blue" variant="flat" @click="handleEditTask" text="Save Changes"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue'

const props = defineProps({
  dialog: {
    type: Boolean,
    required: true
  },
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:dialog', 'edit-task'])

const editedTask = ref("")
const editedDescription = ref("")
const editTaskError = ref("")

watch(() => props.task, (value) => {
  if (value) {
    editedTask.value = value.title
    editedDescription.value = value.description
  }
})

const closeDialog = () => emit('update:dialog', false)

const handleEditTask = () => {
  if (!editedTask.value.toString().trim()) {
    editTaskError.value = "Task field is required"
    return
  }
  emit('edit-task', {
    ...props.task,
    title: editedTask.value.toString().trim(),
    description: editedDescription.value?.toString()?.trim() || "",
  })
  closeDialog()

  editTaskError.value = ""
  editedDescription.value = ""
  editedTask.value = ""
}
</script>
