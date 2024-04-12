<script setup lang="ts">
import type { PostWithUser } from "~/types";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;

const imgLoading = ref(true);
</script>

<template>
  <NuxtLink
    v-if="post"
    :to="`/posts/${post.id}`"
    class="border border-gray-900 w-full flex flex-col rounded-lg hover:shadow-lg p-5 space-y-2"
  >
    <NuxtImg
      v-show="!imgLoading"
      :src="post.image + '.webp'"
      class="rounded-t"
      fit="cover"
      width="400"
      height="225"
      densities="x1 x2"
      sizes="sm:200px, md:300px, lg:400px, 400px"
      :alt="post.title"
      format="webp"
      @load="imgLoading = false"
    />
    <div
      v-show="imgLoading"
      class="w-full aspect-video bg-gray-300 animate-pulse rounded-t"
    />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
    <p class="text-gray-500">{{ post.excerpt }}</p>
    <AuthorDetails :user="user" :publishedDate="post.publishedAt" />
  </NuxtLink>
</template>
