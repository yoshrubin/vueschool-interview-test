<script setup lang="ts">
useSeoMeta({
  title: "Blog Posts",
  ogTitle: "Blog Posts",
  description: "Check out our blog posts!",
  ogDescription: "Check out our blog posts!",
});
defineOgImageComponent("NuxtSeo");
</script>

<template>
  <Posts />
</template>
