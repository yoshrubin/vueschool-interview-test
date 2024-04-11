<script setup lang="ts">
const user = defineProps<{ user: User }>();
const date = defineProps<string>();
</script>
<template>
  <div class="flex space-x-2 items-center">
    <NuxtImg
      class="w-16 rounded-full"
      :src="user.avatar"
      width="64"
      height="64"
      loading="lazy"
      :alt="`${user.firstName} ${user.lastName}`"
    />
    <div>
      <p>{{ user.firstName }} {{ user.lastName }}</p>
      <p class="text-sm text-gray-700">{{ formattedDate }}</p>
    </div>
  </div>
</template>
