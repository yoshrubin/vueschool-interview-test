<script setup lang="ts">
import type { PostWithUser } from "~/types";

const { data: post, error } = useFetch<PostWithUser>("/api/posts/:slug");
if (error.value) {
  showError(error.value);
}
if (!post.value) {
  showError("Post not found");
}
</script>
<template>
  <Post :post="post" />
</template>
