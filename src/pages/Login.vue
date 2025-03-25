<template>
  <div class="pt-8 mt-8">
    <v-card
      class="mx-auto px-12 pb-8 pt-6 mt-8"
      elevation="8"
      max-width="480"
      rounded="lg"
    >
      <v-card-text class="text-center text-h4 font-weight-medium">Log in to your account</v-card-text>

      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          type="email"
          :rules="[rules.emailRules]"
          :error-messages="emailError"
        />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>
        <v-text-field
          v-model="password"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :rules="[rules.passwordRules]"
          :error-messages="passwordError"
        >
          <template v-slot:append-inner>
            <v-icon
              :icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              @click="visible = !visible"
              tabindex="-1"
            />
          </template>
        </v-text-field>

        <v-btn
          class="my-3"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
          text="Log In"
          :loading="loading"
          :disabled="loading"
        />
      </v-form>

      <v-card-text class="text-center">
        Don't have an account?
        <router-link
          class="text-blue text-decoration-none"
          to="/register"
        >
          Sign up
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "@/plugins/axios.js";
import {useRouter} from "vue-router";

const router = useRouter()

const visible = ref(false)
const email = ref('')
const password = ref('')

const loading = ref(false)
const valid = ref(false)

const emailError = ref('')
const passwordError = ref('')

const rules = {
  emailRules: value => {
    if (!email.value) {
      return 'Email is required.'
    }

    const emailPattern = /.+@.+\..+/
    return emailPattern.test(value) && !/\s/.test(value) || 'Email must be valid.'
  },
  passwordRules: value => !!value.toString().trim() || 'Password is required.',
}

const login = async () => {
  emailError.value = rules.emailRules(email.value) !== true ? rules.emailRules(email.value) : ''
  passwordError.value = rules.passwordRules(password.value) !== true ? rules.passwordRules(password.value) : ''

  if (emailError.value || passwordError.value) {
    return
  }

  emailError.value = ''
  passwordError.value = ''

  if (loading.value) return

  loading.value = true

  try {
    const res = await axios.post("/auth/login", {
      email: email.value,
      password: password.value
    })

    if (res.status === 200) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      router.push("/")
    }
  } catch (e) {
    console.log(e)
    password.value = ""
    if (e.response && e.response.status === 401) {
      passwordError.value = "Invalid email or password."
    } else if (e.response && e.response.status === 404) {
      emailError.value = "Not Exist Email."
    } else {
      alert("An error occurred. Please try again.")
    }
  } finally {
    loading.value = false
  }
}

</script>
