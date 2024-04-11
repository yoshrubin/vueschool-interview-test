<script setup lang="ts">
import type { PostWithUser } from "~/types";
import { useDateFormat } from "@vueuse/core";

const { post } = defineProps<{ post?: PostWithUser }>();

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
      <section class="p-10 max-w-4xl mx-auto space-y-4" v-if="post">
        <h1 class="text-4xl font-bold">{{ post.title }}</h1>
        <AuthorDetails :user="post.user" :date="formattedDate" />
        <article v-html="post.content" />
      </section>
      <section v-else>Loading...</section>
    </main>
  </div>
</template>
