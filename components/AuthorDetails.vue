<script setup lang="ts">
const { user, date } = defineProps<{ user: User; date: string }>();
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
