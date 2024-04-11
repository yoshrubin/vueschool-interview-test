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
const posts = ref<PostWithUser[]>([]);
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
  const data = await $fetch<PostWithUser[]>("/api/posts", {
    query,
  });
  isLoading.value = false;
  if (data.length) {
    posts.value.push(...data);
  } else {
    canLoadMore.value = false;
  }
}

const router = useRouter();
watch(
  () => query.order,
  () => {
    router.push({ query: { order: query.order } });
    posts.value = [];
    query.offset = 0;
    canLoadMore.value = true;
    loadData();
  }
);

const route = useRoute();
onMounted(() => {
  if (route.query.order) {
    query.order = route.query.order as string;
  }
});
</script>

<template>
  <main
    ref="target"
    class="h-screen flex justify-center items-center flex-col overflow-auto"
  >
    <section v-if="isLoading && !posts.length">Loading...</section>
    <section v-else class="h-full p-10 flex flex-col">
      <header class="flex items-center mb-4">
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
      </header>
      <section class="grid grid-cols-2 gap-4 mx-auto max-w-4xl">
        <PostCard :post="post" v-for="post in posts" :key="post.id" />
        <div v-if="isLoading">Loading...</div>
      </section>
    </section>
  </main>
</template>
