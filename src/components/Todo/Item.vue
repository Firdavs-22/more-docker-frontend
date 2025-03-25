<template>
  <v-slide-y-transition>
    <v-list-item class="py-3">
      <v-fade-transition>
        <v-list-item-title
          class="cursor-pointer"
          :class="{ 'text-decoration-line-through text-grey': item.completed }"
          @click="viewTask"
        >
          {{ item.title }}
        </v-list-item-title>
      </v-fade-transition>

      <v-fade-transition>
        <v-list-item-subtitle
          v-if="item.description"
          class="mb-1 opacity-100"
          :class="{ 'text-decoration-line-through text-grey': item.completed }"
          v-text="item.description"
        />
      </v-fade-transition>

      <v-fade-transition>
        <v-list-item-subtitle class="text-high-emphasis text-caption">{{
            formatDate(item.created_at)
          }}
        </v-list-item-subtitle>
      </v-fade-transition>

      <template v-slot:prepend>
        <v-list-item-action class="mr-3">
          <v-checkbox-btn
            v-if="!item.completed"
            :model-value="item.completed"
            @update:model-value="toggleDone"
            color="blue"
          />
          <v-checkbox-btn
            v-else
            :model-value="item.completed"
            readonly
            color="blue"
          />
        </v-list-item-action>
      </template>

      <template v-slot:append>
        <v-list-item-action>
          <v-btn
            color="white"
            icon="mdi-pencil"
            variant="text"
            @click="editTask"
          />
          <v-btn
            color="red"
            icon="mdi-delete"
            variant="text"
            @click="deleteTask"
          />
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-slide-y-transition>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import {formatDate} from '@/utils/date'

const props = defineProps({
  item: Object
})


const emit = defineEmits(['toggle-done', 'edit-task', 'delete-task', 'view-task'])

const toggleDone = () => {
  emit('toggle-done', props.item)
}

const editTask = () => {
  emit('edit-task', props.item)
}

const deleteTask = () => {
  emit('delete-task', props.item)
}

const viewTask = () => {
  emit('view-task', props.item)
}
</script>
