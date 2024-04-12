<script setup lang="ts">
import type { PostWithUser } from "~/types";
import LoadingSpinner from "./LoadingSpinner.vue";

const { post } = defineProps<{ post?: PostWithUser }>();

const user = post?.user as User;

const imgLoading = ref(true);
</script>
<template>
  <div class="min-h-screen">
    <header>
      <NuxtImg
        v-show="!imgLoading"
        :src="post?.image"
        class="w-full h-48 md:h-96 object-cover"
        width="1920"
        height="1080"
        fit="cover"
        preload
        alt=""
        densities="x1 x2"
        format="webp"
        sizes="xs:320px, sm:640px, md:768px, lg:1024px, 1920px"
        @load="imgLoading = false"
      />
      <div
        v-show="imgLoading"
        class="w-full h-48 md:h-96 bg-gray-300 animate-pulse"
      />
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
