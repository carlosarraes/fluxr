<script setup lang="ts">
import { inject } from 'vue'

const token = inject('token')
</script>

<template>
  <h1>{{ token }}</h1>
</template>
