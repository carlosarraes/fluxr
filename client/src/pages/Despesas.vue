<script setup lang="ts">
import { User } from '@/types'
import Nav from '../components/Nav.vue'
import { Ref, inject, ref } from 'vue'
import { useToast } from 'vue-toastification'

const date = ref(new Date(Date.now() - 86400000).toISOString().slice(0, 10))
const categoryId = ref(0)
const categories = ref([
  { id: 1, name: 'Impostos' },
  { id: 2, name: 'Compras' },
  { id: 3, name: 'Folha de Pagamento' },
  { id: 4, name: 'Aluguel' },
  { id: 5, name: 'Manutenções' },
  { id: 6, name: 'Receita' },
  { id: 7, name: 'Royalties' },
])
const recurring = ref(false)
const recurringInterval = ref('0')
const amount = ref(0)
const description = ref('')
const token = inject('token') as Ref<string | null>
const url = inject('url') as Ref<string>
const user = inject('user') as Ref<User>
const toast = useToast()

const onSubmit = async () => {
  console.log(recurring)
  try {
    const response = await fetch(`${url}/transaction/expense`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description.value,
        companyId: user.value.companyId,
        categoryId: categoryId.value,
        transactionDate: date.value,
        amount: amount.value,
        recurring: recurring.value,
        recurringInterval: recurringInterval.value,
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
    amount.value = 0
    description.value = ''
    recurring.value = false
    recurringInterval.value = '0'
  }
}
</script>

<template>
  <Nav />
  <section>
    <h1 class="text-xl text-red-500 text-center">Despesa</h1>
  </section>
  <main class="w-full">
    <form class="w-full flex flex-col justify-center items-center p-2" @submit.prevent="onSubmit">
      <label for="date" class="w-full sm:w-1/2 md:w-1/3 text-left text-lg mb-2 ml-2">
        Data do débito
      </label>
      <input
        type="date"
        id="date"
        name="date"
        class="w-full sm:w-1/2 md:w-1/3 text-black border-2 border-gray-300 rounded-md p-2"
        v-model="date"
      />
      <label for="category" class="w-full sm:w-1/2 md:w-1/3 text-left text-lg my-2 ml-2">
        Categoria
      </label>
      <select
        id="category"
        name="category"
        class="w-full sm:w-1/2 md:w-1/3 text-black border-2 border-gray-300 rounded-md p-2"
        v-model="categoryId"
      >
        <option disabled selected value="0">Escolha a categoria</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <div class="flex items-center justify-between sm:justify-center gap-2 sm:gap-12 my-4 w-full">
        <div class="flex gap-2 items-center">
          <input id="recurring" name="recurring" type="checkbox" v-model="recurring" />
          <label for="recurring" class="w-full sm:w-1/2 md:w-1/3 text-gray-300"> Recorrente </label>
        </div>
        <select
          id="recurringInterval"
          name="recurringInterval"
          class="w-full sm:w-1/5 text-black border-2 border-gray-300 rounded-md p-2 disabled:opacity-50"
          v-model="recurringInterval"
          :disabled="!recurring"
        >
          <option disabled selected value="0">Intervalo</option>
          <option value="7d">7 Dias</option>
          <option value="15d">15 Dias</option>
          <option value="30d">30 Dias</option>
        </select>
      </div>
      <label
        for="amount"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Valor
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        step="0.01"
        min="0"
        class="w-full sm:w-1/2 md:w-1/3 text-black border-2 border-gray-300 rounded-md p-2"
        v-model.number="amount"
      />
      <label
        for="description"
        class="w-full sm:w-1/2 md:w-1/3 flex justify-start items-center text-gray-300 my-2 ml-2"
      >
        Descrição
      </label>
      <textarea
        id="description"
        name="description"
        class="w-full sm:w-1/2 md:w-1/3 text-black border-2 border-gray-300 rounded-md p-2"
        v-model="description"
        placeholder="Descrição"
      ></textarea>
      <button
        type="submit"
        class="w-full sm:w-1/2 md:w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Salvar
      </button>
    </form>
  </main>
</template>

<style scoped>
nav {
  height: 12vh;
}

main {
  height: 88vh;
}
</style>
