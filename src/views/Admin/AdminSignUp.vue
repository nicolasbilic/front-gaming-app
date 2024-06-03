<template>
  <section>
    <form @submit.prevent="signup">
      <h2>Inscription</h2>
      <label for="email"></label>
      <input type="email" v-model="email" id="email" name="email" placeholder="Email" required>
      <label for="password"></label>
      <input type="password" v-model="password" id="password" name="password" placeholder="Mot de passe" required>
      <button>M'INSCRIRE</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const signup = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/signup`, { email: email.value, password: password.value })
    if (response.data.success) {
      router.push('/admin/login')
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    errorMessage.value = 'An error occurred. Please try again.'
  }
}
</script>

<style scoped>
h2 {
  color: var(--text-color-secondary);
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 80vh;

  input {
    width: 50%;
    height: 60px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    font-size: 18px;

    &::placeholder {
      color: var(--text-color-secondary);
      padding-left: 15px;
    }
  }

  a,
  button {
    width: 50%;
    height: 50px;
    border-radius: 8px;
    background-color: rgb(234, 149, 74);
    border: none;
    color: var(--text-color-secondary);
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: #e26f03;
    }
  }
}
</style>
