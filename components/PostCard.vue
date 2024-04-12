<script setup lang="ts">
import type { PostWithUser } from "~/types";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;
</script>

<template>
  <NuxtLink
    v-if="post"
    :to="`/posts/${post.id}`"
    class="border border-gray-900 rounded-lg hover:shadow-lg p-5 space-y-2"
  >
    <NuxtImg
      :src="post.image + '.webp'"
      class="rounded-t"
      width="1920"
      height="1080"
      loading="lazy"
      densities="x1 x2"
      sizes="sm:200px, 400px"
      :alt="post.title"
      format="webp"
      :placeholder="[400, 250, 75, 5]"
    />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
    <p class="text-gray-500">{{ post.excerpt }}</p>
    <AuthorDetails :user="user" :publishedDate="post.publishedAt" />
  </NuxtLink>
</template>
