<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

const { user, publishedDate } = defineProps<{
  user: User;
  publishedDate: number | undefined;
}>();

const date = useDateFormat(publishedDate, "MMMM Do, YYYY");

const imgLoading = ref(true);
</script>
<template>
  <div class="flex space-x-2 items-center">
    <NuxtImg
      v-show="!imgLoading"
      class="w-16 rounded-full"
      :src="user.avatar ?? ''"
      width="64"
      height="64"
      densities="x1 x2"
      format="webp"
      :alt="`${user.firstName} ${user.lastName}`"
      @load="imgLoading = false"
    />
    <div
      v-show="imgLoading"
      class="w-16 h-16 bg-gray-300 rounded-full animate-pulse"
    />
    <div>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-sm text-gray-700">{{ date }}</p>
      <a :href="`mailto:${user.email}`" class="text-blue-600 hover:underline">
        💌 Contact the author
      </a>
    </div>
  </div>
</template>
