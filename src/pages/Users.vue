<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar color="secondary">
      <v-toolbar-title>Users</v-toolbar-title>

      <v-btn icon="mdi-magnify" variant="text"></v-btn>


    </v-toolbar>

    <v-list lines="two">

      <v-list-item
        v-for="user in users"
        :key="user.id"
        :title="user.username"
        :subtitle="user.last_login_at"
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-3" :icon="`mdi-${user.icon}`"/>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-email-outline"
            variant="text"
            :href="`mailto:${user.email}`"
            target="_blank"
          />
          <v-btn
            color="grey-lighten-1"
            icon="mdi-message-outline"
            to="/chats"
            variant="text"
          />
        </template>
      </v-list-item>

    </v-list>
  </v-card>
</template>
<script setup>

const users = [
  {
    id: 1,
    username: 'John Doe',
    last_login_at: 'Jan 9, 2014',
    email: 'johndoe@gmail.com',
    icon: 'account-outline',
  },
  {
    id: 2,
    username: 'Jane Doe',
    last_login_at: 'Jan 9, 2014',
    email: 'jane.doe@gmail.com',
    icon: 'account',
  },
]
</script>
