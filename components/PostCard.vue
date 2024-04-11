<script setup lang="ts">
import type { PostWithUser } from "~/types";
import { useDateFormat } from "@vueuse/core";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;
const formattedDate = useDateFormat(post?.publishedAt, "MMMM Do, YYYY");
</script>

<template>
  <NuxtLink
    v-if="post"
    :to="`/posts/${post.id}`"
    class="border border-gray-900 rounded-lg hover:shadow-2xl p-5 space-y-2"
  >
    <NuxtImg
      :src="post.image"
      class="rounded-t"
      width="400"
      height="300"
      loading="lazy"
      :alt="post.title"
    />
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
    <p class="text-gray-500">{{ post.excerpt }}</p>
    <AuthorDetails :user="user" :date="formattedDate" />
  </NuxtLink>
</template>
