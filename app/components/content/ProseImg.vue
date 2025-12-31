<template>
  <figure class="prose-img group my-8 clear-none">
    <img
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
      class="w-full h-auto rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.02]"
      loading="lazy"
    />
    <figcaption v-if="alt" class="text-center text-sm text-gray-500 font-sans mt-3 italic">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import { withBase } from 'ufo'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    // Ensure base URL handling if deployed to subdir
    return withBase(props.src, useRuntimeConfig().app.baseURL)
  }
  return props.src
})
</script>
