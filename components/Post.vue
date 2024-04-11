<script setup lang="ts">
import type { PostWithUser } from "~/types";
import LoadingSpinner from "./LoadingSpinner.vue";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;
</script>
<template>
  <div class="min-h-screen">
    <header>
      <NuxtImg
        v-if="post"
        :src="post.image + '.webp'"
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
      <section v-if="post" class="px-10 max-w-4xl mx-auto space-y-4 mt-5">
        <NuxtLink to="/posts" class="text-blue-600 hover:underline self-start">
          ← Back to posts
        </NuxtLink>
        <article>
          <h1 class="text-4xl font-bold">{{ post.title }}</h1>
          <AuthorDetails :user="user" :publishedDate="post.publishedAt" />
          <div class="prose lg:prose-xl" v-html="post.content" />
        </article>
      </section>
      <LoadingSpinner v-else class="text-gray-900 h-16 w-16" />
    </main>
  </div>
</template>
