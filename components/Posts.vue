<script setup lang="ts">
import type { PostWithUser } from "~/types";
import { useInfiniteScroll } from "@vueuse/core";
import LoadingSpinner from "./LoadingSpinner.vue";
const query = reactive({
  limit: 10,
  offset: 0,
  order: "newestFirst",
  include: "user",
});

const target = ref<HTMLElement | null>(null);
const posts = ref<PostWithUser[]>([]);
const canLoadMore = ref(true);
const isLoading = ref(true);
useInfiniteScroll(
  target,
  async () => {
    await loadData();
    query.offset += query.limit;
  },
  { distance: 100, canLoadMore: () => canLoadMore.value }
);

async function loadData() {
  isLoading.value = true;
  let data: PostWithUser[] = [];
  try {
    data = await $fetch<PostWithUser[]>("/api/posts", {
      query,
    });
  } catch (error) {
    console.error(error);
  }
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
    <LoadingSpinner
      v-if="isLoading && !posts.length"
      class="text-gray-900 h-16 w-16"
    />
    <section v-else class="h-full p-10 flex flex-col">
      <SortBy v-model:order="query.order" />
      <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-4xl">
        <PostCard :post="post" v-for="post in posts" :key="post.id" />
        <LoadingSpinner v-if="isLoading" class="text-gray-900 h-8 w-8" />
      </section>
    </section>
  </main>
</template>
