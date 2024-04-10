<script setup lang="ts">
import type { PostWithUser } from "~/types";

const { post } = defineProps<{ post?: PostWithUser }>();
const datePosted = post?.publishedAt
  ? new Date(post.publishedAt).toLocaleDateString()
  : "";
</script>

<template>
  <NuxtLink
    v-if="post"
    :to="`/posts/${post.id}`"
    class="border border-gray-900 rounded-lg hover:shadow-2xl p-5 space-y-2"
  >
    <NuxtImg :src="post.image" class="rounded-t" />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
    <p class="text-gray-500">{{ post.excerpt }}</p>
    <div class="flex space-x-2 items-center">
      <NuxtImg class="w-16 rounded-full" :src="post.user.avatar" />
      <div>
        <p>{{ post.user.firstName }} {{ post.user.lastName }}</p>
        <p>{{ datePosted }}</p>
      </div>
    </div>
  </NuxtLink>
</template>
