<template>
  <div class="pt-8 mt-8">
    <v-card
      class="mx-auto px-12 pb-8 pt-6 mt-8"
      elevation="8"
      max-width="480"
      rounded="lg"
    >
      <v-card-text class="text-center text-h4 font-weight-medium">Sign up for an account</v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="register">
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>
        <v-text-field
          v-model="username"
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          :rules="[rules.usernameRules]"
          :error-messages="usernameError"
        />

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
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

        <v-text-field
          v-model="confirmPassword"
          type="password"
          density="compact"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          :rules="[rules.confirmPasswordRules]"
          :error-messages="confirmPasswordError"
        />

        <v-btn
          class="my-3"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
          text="Sign Up"
          :loading="loading"
          @click="register"
        />
      </v-form>


      <v-card-text class="text-center">
        Already have an account?
        <router-link
          class="text-blue text-decoration-none"
          to="/login"
        >
          Log in
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
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const loading = ref(false)
const valid = ref(false)

const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

const rules = {
  usernameRules: value => !!value.toString().trim() || 'Username is required.',
  emailRules: value => {
    if (!email.value) {
      return 'Email is required.'
    }

    const emailPattern = /.+@.+\..+/
    return emailPattern.test(value) && !/\s/.test(value) || 'Email must be valid.'
  },
  passwordRules: value => !!value.toString().trim() || 'Password is required.',
  confirmPasswordRules: value => value === password.value || 'Passwords must match.'
}

const register = async () => {
  usernameError.value = rules.usernameRules(username.value) !== true ? rules.usernameRules(username.value) : ''
  emailError.value = rules.emailRules(email.value) !== true ? rules.emailRules(email.value) : ''
  passwordError.value = rules.passwordRules(password.value) !== true ? rules.passwordRules(password.value) : ''
  confirmPasswordError.value = rules.confirmPasswordRules(confirmPassword.value) !== true ? rules.confirmPasswordRules(confirmPassword.value) : ''

  if (usernameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }

  usernameError.value = ''
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  if (loading.value) return

  loading.value = true

  try {
    const response = await axios.post("/auth/register", {
      username: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })
    if (response.status === 201) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      router.push("/")
    }
  } catch (e) {
    console.log("Error: ", e)
    password.value = ''
    confirmPassword.value = ''
    if (e.response && e.response.status === 409) {
      emailError.value = "Email is already taken."
    } else if (e.response && e.response.status === 401) {
      alert(e.message)
    } else {
      alert("An error occurred. Please try again.")
    }
  } finally {
    loading.value = false
  }

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
