<script setup lang="ts">
import type { PostWithUser } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const {
  data: post,
  pending,
  error,
} = await useFetch<PostWithUser>(`/api/posts/${slug}`, {
  query: { include: "user" },
});

if (error.value) {
  showError(error.value);
}
if (!post.value) {
  showError("Post not found");
}

defineOgImageComponent("NuxtSeo", {
  title: post.value?.title ?? "",
  description: post.value?.excerpt ?? "",
  alt: post.value?.title ?? "",
});
</script>
<template>
  <Post v-if="post" :post="post" />
  <LoadingSpinner class="text-gray-900 h-16 w-16" v-else />
</template>
