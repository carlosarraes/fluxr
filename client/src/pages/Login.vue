<script setup lang="ts">
import { inject, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
const url = 'http://localhost:8080'

const email = ref('')
const password = ref('')
const token = inject('token')
const toast = useToast()
const router = useRouter()
let controller: AbortController

const onSubmit = async (e: Event) => {
  if (controller) controller.abort()
  e.preventDefault()
  const data = {
    email: email.value,
    password: password.value,
  }

  try {
    controller = new AbortController()
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    })

    if (!response.ok) throw new Error('Email ou senha incorretos')

    token.value = (await response.json()).token
    router.push({ name: 'dashboard' })
  } catch (error) {
    toast.error(error.message)
  } finally {
    controller = null
  }
}
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-2 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="border-1 border-green-600 text-black"
    />
    <input
      v-model="password"
      type="password"
      placeholder="Senha"
      class="border-1 border-green-600 text-black"
    />
    <button
      type="submit"
      class="bg-green-600 text-white p-2 rounded-md cursor-pointer hover:bg-green-700 duration-300"
    >
      Login
    </button>
  </form>
</template>
