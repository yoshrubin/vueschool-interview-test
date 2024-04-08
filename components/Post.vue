<script setup lang="ts">
import type { Post } from "@/types";
const { post } = defineProps<{ post?: Post }>();
console.log(post);
</script>

<template>
  <div v-if="post" class="border-b border-gray-600">
    <NuxtImg :src="post.image" />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
  </div>
</template>
