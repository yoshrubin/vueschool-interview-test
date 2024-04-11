<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
const { user, publishedDate } = defineProps<{
  user: User;
  publishedDate: number | undefined;
}>();
console.log(publishedDate);
const date = useDateFormat(publishedDate, "MMMM Do, YYYY");
</script>
<template>
  <div class="flex space-x-2 items-center">
    <NuxtImg
      v-if="user.avatar"
      class="w-16 rounded-full"
      :src="user.avatar"
      width="64"
      height="64"
      loading="lazy"
      format="webp"
      :placeholder="[64, 64, 75, 5]"
      :alt="`${user.firstName} ${user.lastName}`"
    />
    <div v-else class="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
    <div>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-sm text-gray-700">{{ date }}</p>
      <a :href="`mailto:${user.email}`" class="text-blue-500 hover:underline">
        💌 Contact the author
      </a>
    </div>
  </div>
</template>
