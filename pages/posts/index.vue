<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import { is } from "drizzle-orm";
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
    isLoading.value = true;
    const { data } = await useFetch("/api/posts", {
      query,
    });
    isLoading.value = false;
    query.offset += query.limit;
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
    <div ref="target" class="w-full overflow-auto">
      <div class="!w-min min-w-full">
        <Post :post="post" v-for="(post, index) in posts" :key="index" />
        <div v-if="isLoading">Loading...</div>
      </div>
    </div>
  </div>
</template>
