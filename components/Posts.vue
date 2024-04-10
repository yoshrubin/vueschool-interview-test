<script setup lang="ts">
import { useInfiniteScroll } from "@vueuse/core";
import type { PostWithUser } from "~/types";
const query = reactive({
  limit: 10,
  offset: 0,
  order: "newestFirst",
  include: "user",
});

const target = ref<HTMLElement | null>(null);
const posts = ref<Post[]>([]);
const canLoadMore = ref(true);
const isLoading = ref(false);
useInfiniteScroll(
  target,
  async () => {
    query.offset += query.limit;
    await loadData();
  },
  { distance: 100, canLoadMore: () => canLoadMore.value }
);

async function loadData() {
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
}

watch(
  () => query.order,
  () => {
    posts.value = [];
    query.offset = 0;
    canLoadMore.value = true;
    loadData();
  }
);
</script>

<template>
  <div
    ref="target"
    class="h-screen flex justify-center items-center flex-col overflow-auto"
  >
    <div class="h-full p-10 flex flex-col">
      <div class="flex items-center mb-4">
        <input
          v-model="query.order"
          type="radio"
          value="newestFirst"
          id="newestFirst"
        />
        <label class="ml-2" for="newestFirst">Newest First</label>
        <input
          class="ml-4"
          v-model="query.order"
          type="radio"
          value="oldestFirst"
          id="oldestFirst"
        />
        <label class="ml-2" for="oldestFirst">Oldest First</label>
      </div>
      <div class="grid grid-cols-2 gap-4 mx-auto max-w-4xl">
        <Post
          :post="post as PostWithUser"
          v-for="(post, index) in posts"
          :key="index"
        />
        <div v-if="isLoading">Loading...</div>
      </div>
    </div>
  </div>
</template>
