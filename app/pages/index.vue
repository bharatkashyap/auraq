<template>
  <div class="space-y-20 pt-8">
    <section>
      <div class="space-y-16">
        <article v-for="post in posts" :key="post.path" class="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start group border-b border-gray-800 pb-16 last:border-0 last:pb-0">
                    
          <NuxtLink :to="`/post${post.path.split('/blog')[1]}`" class="absolute inset-0 z-10" aria-label="Read story"></NuxtLink>

          <div class="flex-1 space-y-4 pointer-events-none"> <!-- content pointer-events-none to let the overlay handle clicks, or just relative z-index -->
             <div class="flex items-center text-xs font-sans font-medium text-auraq-accent uppercase tracking-wider mb-2 relative z-20 pointer-events-auto">          
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
                <span v-if="post.tags && post.tags.length > 0" class="text-gray-600 mx-2">•</span>
                <div v-if="post.tags" class="flex gap-2 flex-wrap">
                   <NuxtLink 
                      v-for="tag in post.tags" 
                      :key="tag" 
                      :to="`/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`" 
                      class="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-gray-900 dark:hover:text-white hover:border-auraq-accent transition-colors"
                   >
                     {{ tag }}
                   </NuxtLink>
                </div>
             </div>
             
             <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-gray-600 dark:text-gray-400 font-serif group-hover:text-auraq-accent transition-colors duration-200 leading-tight">
                {{ post.title }}
             </h2>
             
             <p class="text-lg md:text-xl leading-relaxed text-gray-500 dark:text-gray-400 font-serif line-clamp-3 font-light">
               {{ post.description }}
             </p>
             
             <div class="pt-4 text-sm font-medium text-auraq-accent font-sans group-hover:underline decoration-1 underline-offset-4 flex items-center">
               Read story
               <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </div>
          </div>

          <div v-if="post.image" class="w-full md:w-72 md:shrink-0 order-first md:order-last relative z-0">
             <div class="block overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-900 border border-gray-800">
               <NuxtImg 
                  :src="post.image" 
                  class="w-full h-56 md:h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  :alt="post.title" 
                />
             </div>
          </div>

        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
// Using Nuxt Content v3 API
const { data: posts } = await useAsyncData('blog', () => 
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

useHead({
  title: 'Auraq - A magazine of life, cities and culture',
  meta: [
    { name: 'description', content: 'A magazine of life, cities and culture.' }
  ]
})
</script>
