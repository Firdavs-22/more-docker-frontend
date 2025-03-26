<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar image="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-toolbar-title text="Todo List"/>
      <v-card-actions class="pr-6">
        <v-btn color="green-lighten-1" variant="flat" @click="openAddDialog" text="Add New Task"/>
      </v-card-actions>
    </v-toolbar>

    <TodoList :todo="todo" @toggle-done="toggleDone" @edit-task="openEditDialog" @delete-task="handleDeleteTask"
              @view-task="openViewDialog"/>

    <AddDialog v-model:dialog="addDialog" @add-task="handleAddTask"/>
    <EditTaskDialog v-model:dialog="editDialog" :task="currentTask" @edit-task="handleEditTask"/>
    <ViewTaskDialog v-model:dialog="viewDialog" :task="selectedTask"/>
  </v-card>
</template>

<script setup>
import {onMounted, ref} from 'vue'

import TodoList from '@/components/Todo/List.vue'
import AddDialog from '@/components/Todo/AddDialog.vue'
import EditTaskDialog from '@/components/Todo/EditDialog.vue'
import ViewTaskDialog from '@/components/Todo/ViewDialog.vue'
import axios from "@/plugins/axios.js";

const todo = ref([])

const addDialog = ref(false)
const editDialog = ref(false)
const viewDialog = ref(false)

const currentTask = ref(null)
const selectedTask = ref(null)

const fetchTodos = async () => {
  try {
    const res = await axios.get("/todos/")
    if (res.status === 200) {
      todo.value = res.data.todos
    }
  } catch (e) {
    console.log("Error fetching todos", e)
  }
}

const openAddDialog = () => {
  addDialog.value = true
}

const openEditDialog = (item) => {
  currentTask.value = item
  editDialog.value = true
}

const openViewDialog = (item) => {
  selectedTask.value = item
  viewDialog.value = true
}

const handleAddTask = async (task) => {
  try {
    const res = await axios.post("/todos/", {
      title: task.task,
      description: task.description,
    })
    if (res.status === 201) {
      todo.value = [res.data.todo].concat(todo.value)
    }
  } catch (e) {
    console.log("Error adding task", e)
  }
}

const handleEditTask = async (task) => {
  try {

    const res = await axios.put(`/todos/${task.id}`, {
      title: task.title,
      description: task.description,
      completed: false
    })
    if (res.status === 200) {
      const index = todo.value.findIndex(t => t.id === task.id)
      if (index !== -1) {
        todo.value[index] = res.data.todo
      }
    }
  } catch (e) {
    console.log("Error editing task", e)
  } finally {
    editDialog.value = false
    currentTask.value = null
  }
}

const toggleDone = async (item) => {
  if (item.completed) return
  try {
    const res = await axios.patch(`/todos/${item.id}/complete`)
    if (res.status === 200) {
      item.completed = true
      item.completed_at = res.data.todo.completed_at
    }
  } catch (e) {
    console.log("Error on complete task", e)
  }
}

const handleDeleteTask =async (item) => {
  try {
    const res = await axios.delete(`/todos/${item.id}`)
    if (res.status === 204) {
      todo.value = todo.value.filter(task => task.id !== item.id)
    }
  } catch (e) {
    console.log("Error deleting task", e)
  }
}

onMounted(fetchTodos)
</script>
