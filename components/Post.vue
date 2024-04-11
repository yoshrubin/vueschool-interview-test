<script setup lang="ts">
import type { PostWithUser } from "~/types";
import { useDateFormat } from "@vueuse/core";

const { post } = defineProps<{ post?: PostWithUser }>();

const datePosted = post?.publishedAt
  ? new Date(post.publishedAt).toLocaleDateString()
  : "";

const formattedDate = useDateFormat(post?.publishedAt, "MMMM Do, YYYY");
</script>
<template>
  <div class="min-h-screen">
    <header>
      <NuxtImg
        v-if="post"
        :src="post.image"
        class="w-full h-96 object-cover"
        loading="lazy"
        :alt="post.title"
      />
      <div v-else class="w-full h-96 bg-gray-300 animate-pulse" />
    </header>
    <main class="flex justify-center items-center flex-col overflow-auto">
      <section class="p-10 max-w-4xl mx-auto space-y-4">
        <h1 class="text-4xl font-bold">{{ post?.title }}</h1>
        <p class="text-gray-500">{{ post?.excerpt }}</p>
        <div class="flex items-center space-x-2">
          <NuxtImg
            v-if="post"
            class="w-16 h-16 rounded-full"
            :src="post.user.avatar"
            loading="lazy"
            :alt="`${post.user.firstName} ${post.user.lastName}`"
          />
          <div>
            <p>{{ post?.user.firstName }} {{ post?.user.lastName }}</p>
            <p class="text-sm text-gray-700">
              {{ new Date(formattedDate).toLocaleDateString() }}
            </p>
          </div>
        </div>
        <article v-html="post?.content" />
      </section>
    </main>
  </div>
</template>
