<template>
  <div class="space-y-16">
    <header class="py-12 border-b border-gray-200 dark:border-gray-800">
      <h1 class="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 flex items-baseline gap-4">
        <span class="text-lg font-sans font-normal text-auraq-accent uppercase tracking-widest">Writer</span>
        {{ writerName }}
      </h1>
    </header>

    <div v-if="posts.length === 0" class="text-center py-20 text-gray-500 font-serif italic">
      No posts found for this writer.
    </div>

    <div class="space-y-16">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const writerSlug = route.params.slug

// Simple capitalization for display
const writerName = computed(() => {
    return writerSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

const { data: posts } = await useAsyncData(`writer-${writerSlug}`, () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
    .then(allPosts => {
        return allPosts.filter(p => {
            if (!p.writer) return false
            const s = p.writer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            return s === writerSlug
        })
    })
})



// Meta
useHead({
  title: `Writer: ${writerName.value} - Auraq`
})
</script>
