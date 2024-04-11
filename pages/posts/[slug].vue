<script setup lang="ts">
import type { PostWithUser } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const { data: post, error } = await useFetch<PostWithUser>(
  `/api/posts/${slug}`,
  { query: { include: "user" } }
);

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
