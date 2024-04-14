<script setup lang="ts">
import type { OrderBy } from "~/types";

const order = defineModel<OrderBy>("order");
</script>
<template>
  <section class="flex items-center mb-4">
    <input v-model="order" type="radio" value="newestFirst" id="newestFirst" />
    <label class="ml-2" for="newestFirst">Newest First</label>
    <input
      class="ml-4"
      v-model="order"
      type="radio"
      value="oldestFirst"
      id="oldestFirst"
    />
    <label class="ml-2" for="oldestFirst">Oldest First</label>
  </section>
</template>
