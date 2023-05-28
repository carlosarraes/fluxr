<script setup lang="ts">
import { inject, onMounted, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { User } from '../types'
import { ListPlus, ListMinus, Text, LogOut } from 'lucide-vue-next'

const router = useRouter()
const token = inject('token') as Ref<string | null>
const url = inject('url') as Ref<string>
const user = ref<User>({
  name: '',
  email: '',
})

const fetchUser = async () => {
  const response = await fetch(`${url}/user/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  if (!response.ok) {
    router.push({ name: 'login' })
    return
  }

  user.value = (await response.json()) as User
}

const logout = () => {
  token.value = null
  router.push({ name: 'login' })
}

onMounted(() => {
  if (!token.value) {
    router.push({ name: 'login' })
    return
  }

  fetchUser()
})
</script>

<template>
  <header class="flex flex-col items-center justify-center w-full">
    <h1 class="text-4xl font-bold">Dashboard</h1>
    <h2 class="text-md font-bold flex items-center gap-2 underline cursor-pointer" @click="logout">
      {{ user.name }}
      <LogOut :size="20" class="self-center" />
    </h2>
  </header>
  <main class="flex flex-col items-center justify-start w-full gap-4">
    <button
      class="flex justify-center items-center gap-4 bg-green-600 hover:bg-green-700 duration-200 text-white px-4 w-1/4 py-2 rounded-md"
    >
      <ListPlus />
      Receitas
    </button>
    <button
      class="flex justify-center items-center gap-4 bg-red-600 hover:bg-red-700 duration-200 text-white px-4 w-1/4 py-2 rounded-md"
    >
      <ListMinus />
      Despesas
    </button>
    <button
      class="flex justify-center items-center gap-4 bg-blue-600 hover:bg-blue-700 duration-200 text-white px-4 w-1/4 py-2 rounded-md"
    >
      <Text />
      Relatório
    </button>
  </main>
</template>

<style scoped>
header {
  height: 20vh;
}

main {
  height: 80vh;
}
</style>
