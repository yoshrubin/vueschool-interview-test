<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
const query = reactive({
  limit: 10,
  offset: 0,
  order: "newestFirst",
});

const target = ref<HTMLElement | null>(null);
const posts = ref<Post[]>([]);
const canLoadMore = ref(true);
const isLoading = ref(false);
useInfiniteScroll(
  target,
  async () => {
    query.offset += query.limit;
    isLoading.value = true;
    const { data } = await useFetch("/api/posts", {
      query,
    });
    isLoading.value = false;
    if (data.value?.length) {
      posts.value.push(...data.value);
    } else {
      canLoadMore.value = false;
    }
  },
  { distance: 10, canLoadMore: () => canLoadMore.value }
);
</script>

<template>
  <div class="h-screen flex justify-center items-center flex-col">
    <div
      ref="target"
      class="overflow-auto h-full grid grid-cols-2 gap-4 px-8 mx-auto max-w-4xl"
    >
      <Post :post="post" v-for="(post, index) in posts" :key="index" />
      <div v-if="isLoading">Loading...</div>
    </div>
  </div>
</template>
