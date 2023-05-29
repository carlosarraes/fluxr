<script setup lang="ts">
import { Ref, inject, ref } from 'vue'
import Nav from '../components/Nav.vue'
import type { User } from '@/types'
import { useToast } from 'vue-toastification'

const date = ref(new Date(Date.now() - 86400000).toISOString().slice(0, 10))
const cash = ref(0)
const pix = ref(0)
const credit = ref(0)
const debit = ref(0)
const meal = ref(0)
const user = inject('user') as Ref<User>
const toast = useToast()

const token = inject('token') as Ref<string | null>
const url = inject('url') as Ref<string>

const onSubmit = async () => {
  try {
    const response = await fetch(`${url}/transaction/revenue`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyId: user.value.companyId,
        transactionDate: date.value,
        cash: cash.value,
        pix: pix.value,
        credit: credit.value,
        debit: debit.value,
        meal: meal.value,
      }),
    })

    if (!response.ok) {
      throw new Error('Erro ao adicionar transação')
    }

    toast.success('Transação adicionada com sucesso')
  } catch (error) {
    console.log(error)
    if (error instanceof Error) toast.error(error.message)
  } finally {
    cash.value = 0
    pix.value = 0
    credit.value = 0
    debit.value = 0
    meal.value = 0
  }
}
</script>

<template>
  <Nav />
  <section>
    <h1>Receitas</h1>
  </section>
  <main class="w-full">
    <form class="w-full flex flex-col justify-center items-center p-4" @submit.prevent="onSubmit">
      <label
        for="date"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 mb-2 ml-2"
      >
        Data do dia
      </label>
      <input
        id="date"
        name="date"
        type="date"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model="date"
      />
      <label
        for="cash"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Dinheiro
      </label>
      <input
        id="cash"
        name="cash"
        type="number"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model.number="cash"
      />
      <label
        for="pix"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Pix
      </label>
      <input
        id="pix"
        name="pix"
        type="number"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model.number="pix"
      />
      <label
        for="credit"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Crédito
      </label>
      <input
        id="credit"
        name="credit"
        type="number"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model.number="credit"
      />
      <label
        for="debit"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Débito
      </label>
      <input
        id="debit"
        name="debit"
        type="number"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model.number="debit"
      />
      <label
        for="meal"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Vale Refeição
      </label>
      <input
        id="meal"
        name="meal"
        type="number"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-black duration-200 px-4 py-2 rounded-md"
        v-model.number="meal"
      />
      <button
        type="submit"
        class="mt-12 w-full sm:w-1/2 md:w-1/3 flex justify-center items-center gap-4 text-white duration-200 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  </main>
</template>

<style scoped>
nav {
  height: 15vh;
}

main {
  height: 85vh;
}
</style>
