<script setup lang="ts">
import type { Post } from "@/types";
const { post } = defineProps<{ post?: Post }>();
console.log(post);
</script>

<template>
  <NuxtLink
    v-if="post"
    :to="`/posts/${post.id}`"
    class="border-b border border-gray-900 rounded-lg shadow-md p-5"
  >
    <NuxtImg :src="post.image" />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
  </NuxtLink>
</template>
