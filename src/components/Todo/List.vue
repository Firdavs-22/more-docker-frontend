<template>
  <v-slide-y-transition>
    <v-list>
      <TodoItem
        v-if="todo.length"
        v-for="item in todo"
        :key="item.id"
        :item="item"
        @toggle-done="toggleDone"
        @edit-task="editTask"
        @delete-task="deleteTask"
        @view-task="viewTask"
      />
      <v-list-item v-else>
        <v-list-item-title class="text-h6">No tasks found</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-slide-y-transition>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'
import TodoItem from './Item'

const props = defineProps({
  todo: Array
})

const emit = defineEmits(['toggle-done', 'edit-task', 'delete-task', 'view-task'])

const toggleDone = (item) => {
  emit('toggle-done', item)
}

const editTask = (item) => {
  emit('edit-task', item)
}

const deleteTask = (item) => {
  emit('delete-task', item)
}

const viewTask = (item) => {
  emit('view-task', item)
}
</script>
