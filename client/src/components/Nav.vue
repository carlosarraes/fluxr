<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ListPlus, ListMinus, Text, ArrowBigLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <nav class="flex flex-col items-center justify-center w-full">
    <ul class="flex flex-row items-center justify-center w-full gap-8 p-4">
      <li
        class="flex flex-col items-center justify-center gap-2 text-green-500 cursor-pointer hover:scale-105 duration-150"
        @click="() => router.push({ name: 'receitas' })"
        v-if="route.name !== 'receitas'"
      >
        <ListPlus :size="20" />
        <span>Receitas</span>
      </li>
      <li
        class="flex flex-col items-center justify-center gap-2 text-red-500 cursor-pointer hover:scale-105 duration-150"
        @click="() => router.push({ name: 'despesas' })"
        v-if="route.name !== 'despesas'"
      >
        <ListMinus :size="20" />
        <span>Despesas</span>
      </li>
      <li
        class="flex flex-col items-center justify-center gap-2 text-blue-500 cursor-pointer hover:scale-105 duration-150"
        @click="() => router.push({ name: 'relatorio' })"
        v-if="route.name !== 'relatorio'"
      >
        <Text :size="20" />
        <span>Relatórios</span>
      </li>
      <li
        class="flex flex-col items-center justify-center gap-2 text-gray-200 cursor-pointer hover:scale-105 duration-150"
        @click="() => router.push({ name: 'dashboard' })"
      >
        <ArrowBigLeft :size="20" />
        <span>Voltar</span>
      </li>
    </ul>
  </nav>
</template>
