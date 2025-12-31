<template>
  <article class="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start group border-b border-gray-200 dark:border-gray-800 pb-16 last:border-0 last:pb-0">
     <NuxtLink :to="`/post${post.path.split('/blog')[1]}`" class="absolute inset-0 z-10" aria-label="Read story"></NuxtLink>
     
     <div class="flex-1 space-y-4 pointer-events-none">
        <div class="flex items-center gap-3 text-sm font-sans pointer-events-auto relative z-20">
            <time class="font-sans font-medium text-auraq-accent">{{ formatDate(post.date) }}</time>
             <span v-if="post.tags && post.tags.length > 0" class="text-gray-400 dark:text-gray-600">•</span>
             <div v-if="post.tags" class="flex gap-2 flex-wrap">
                <NuxtLink 
                  v-for="tag in post.tags" 
                  :key="tag" 
                  :to="`/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`"
                  class="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-auraq-accent hover:border-auraq-accent transition-colors"
                >
                  {{ tag }}
                </NuxtLink>
             </div>
        </div>
        
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100 group-hover:text-auraq-accent transition-colors duration-200 leading-tight">
            {{ post.title }}
        </h2>
        
        <p class="text-gray-600 dark:text-gray-400 font-serif leading-relaxed line-clamp-3">
            {{ post.description }}
        </p>
     </div>

     <div v-if="post.image" class="w-full md:w-72 md:shrink-0 order-first md:order-last relative z-0">
        <div class="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <NuxtImg :src="post.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0" width="400" loading="lazy" />
        </div>
     </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
