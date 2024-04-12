<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

const { user, publishedDate } = defineProps<{
  user: User;
  publishedDate: number | undefined;
}>();

const date = useDateFormat(publishedDate, "MMMM Do, YYYY");
</script>
<template>
  <div class="flex space-x-2 items-center">
    <NuxtImg
      v-if="user.avatar"
      class="w-16 rounded-full"
      :src="user.avatar"
      width="150"
      height="150"
      loading="lazy"
      densities="x1 x2"
      format="webp"
      :placeholder="[64, 64, 75, 5]"
      :alt="`${user.firstName} ${user.lastName}`"
    />
    <div v-else class="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
    <div>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-sm text-gray-700">{{ date }}</p>
      <a :href="`mailto:${user.email}`" class="text-blue-600 hover:underline">
        💌 Contact the author
      </a>
    </div>
  </div>
</template>
