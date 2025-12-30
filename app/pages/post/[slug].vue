<template>
  <div v-if="post" class="min-h-screen">            
      <header class="text-center space-y-8 border-b border-gray-200 dark:border-gray-800 pb-12 mb-12">        
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-tight">
          {{ post.title }}
        </h1>
        
        <div class="flex flex-wrap items-center text-gray-500 text-sm font-sans gap-4 justify-center">
          <time :datetime="post.date" class="text-auraq-accent font-medium">{{ formatDate(post.date) }}</time>
          <span class="text-gray-700 hidden sm:inline">•</span>
          
          <span v-if="post.writer" class="text-xs font-medium text-gray-400 dark:text-gray-200 leading-tight uppercase">
             <NuxtLink :to="`/writer/${post.writer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`" class="hover:text-auraq-accent transition-colors">
               {{ post.writer }}
             </NuxtLink>
          </span>
          <span v-if="post.writer && post.tags" class="text-gray-700 hidden sm:inline">•</span>

          <div v-if="post.tags" class="flex gap-2">
             <NuxtLink v-for="tag in post.tags" :key="tag" :to="`/tag/${tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`" class="bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 px-2 py-1 rounded text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide hover:text-gray-900 dark:hover:text-white hover:border-auraq-accent transition-colors">
               {{ tag }}
             </NuxtLink>
          </div>
        </div>
        
        <div v-if="post.image" class="mt-10 mb-12">
            <NuxtImg :src="post.image" class="w-full h-auto rounded-lg shadow-2xl border border-gray-800" :alt="post.title" />
        </div>
      </header>
      
      <article class="flow-root prose prose-lg prose-invert prose-serif mx-auto max-w-none 
          font-serif prose-headings:font-bold prose-headings:text-gray-100
          prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
          prose-a:text-auraq-accent prose-a:no-underline prose-a:transition-colors
          prose-blockquote:border-l-auraq-accent prose-blockquote:text-gray-400
          prose-img:rounded-lg prose-img:shadow-xl
          prose-strong:text-white prose-strong:font-bold">
        <ContentRenderer :value="post" />
      </article>
      


  </div>
  <div v-else class="text-center py-32 font-serif text-gray-500">
    <p class="text-2xl mb-4">Post not found.</p>
    <NuxtLink to="/" class="text-auraq-accent hover:text-white transition-colors underline">Return Home</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const contentPath = `/blog/${slug}`

const { data: post } = await useAsyncData(`content-${contentPath}`, () => {
    return queryCollection('blog').path(contentPath).first()
})

function formatDate(dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Meta
useHead({
  title: post.value?.title ? `${post.value.title} - Auraq` : 'Auraq',
  meta: [
    { name: 'description', content: post.value?.description }
  ]
})
</script>

<style>
/* 
   Magazine Layout Logic 
   Isolated here to avoid polluting global config.
*/
@media (min-width: 768px) {
  .prose img, .prose figure {
    clear: both;
  }
  
  /* Alternating Floats */
  .prose img:not(.no-auto-float):nth-of-type(odd), 
  .prose figure:not(.no-auto-float):nth-of-type(odd) {
    float: right;
    width: 50%;
    margin-left: 2rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
  }

  .prose img:not(.no-auto-float):nth-of-type(even), 
  .prose figure:not(.no-auto-float):nth-of-type(even) {
    float: left;
    width: 50%;
    margin-right: 2rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
  }
  
  .prose figure figcaption {
     text-align: center;
     font-size: 0.875rem;
     color: #6b7280; /* gray-500 */
     margin-top: 0.5rem;
  }
}
</style>
