<script setup lang="ts">
import type { PostWithUser } from "~/types";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;
</script>
<template>
  <div class="min-h-screen">
    <header>
      <NuxtImg
        v-if="post"
        :src="post.image"
        class="w-full h-96 object-cover"
        preload
        fit="cover"
        alt=""
        densities="x1 x2"
        width="1920"
        height="1080"
        format="webp"
        sizes="sm:320px, md:640px, 1920px"
        :placeholder="[1920, 1080, 75, 5]"
      />
      <div v-else class="w-full h-96 bg-gray-300 animate-pulse" />
    </header>
    <main class="flex justify-center items-center flex-col overflow-auto">
      <article class="p-10 max-w-4xl mx-auto space-y-4" v-if="post">
        <h1 class="text-4xl font-bold">{{ post.title }}</h1>
        <AuthorDetails :user="user" :publishedDate="post.publishedAt" />
        <div class="prose lg:prose-xl" v-html="post.content" />
      </article>
      <section v-else>Loading...</section>
    </main>
  </div>
</template>
