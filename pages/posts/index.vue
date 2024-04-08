<script setup lang="ts">
const pagination = reactive({
  limit: 10,
  offset: 0,
  order: "newestFirst",
});

const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch("/api/posts", {
  pagination,
});

console.log(posts.value);
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div v-if="pending">Loading...</div>
    <div v-else class="space-y-5">
      <div v-for="(post, index) in posts" :key="index">
        <NuxtImg :src="post.image" />
        <h2 class="text-xl font-bold">{{ post.title }}</h2>
      </div>
    </div>
    <!-- <h1 class="text-2xl">Display The Paginated Posts Here</h1>
      <ul class="list-disc list-inside ml-10">
        <li>Keep performance in mind</li>
        <li>Make sure to display optimized images</li>
        <li>Paginate according to your desired strategy</li>
        <li>Provide a sort order control</li>
        <li>Store the sort order in the URL</li>
        <li>Make it look good 💪</li>
        <li>
          Then
          <NuxtLink class="text-blue-500 underline" to="/posts/hello">
            go to the next task (displaying the individual post)</NuxtLink
          >
        </li>
      </ul> -->
  </div>
</template>
