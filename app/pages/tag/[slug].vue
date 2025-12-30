<template>
  <div class="space-y-16">
    <header class="py-12 border-b border-gray-200 dark:border-gray-800">
      <h1 class="text-4xl font-serif font-bold text-gray-900 dark:text-gray-100 flex items-baseline gap-4">
        <span class="text-lg font-sans font-normal text-auraq-accent uppercase tracking-widest">Tag</span>
        {{ tagName }}
      </h1>
    </header>

    <div v-if="posts.length === 0" class="text-center py-20 text-gray-500 font-serif italic">
      No posts found for this tag.
    </div>

    <div class="space-y-16">
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const tagSlug = route.params.slug
// Decode slug? Or assume slug implies tag name?
// Usually slugs are lowercase-dashed. We might need to match loosely using CONTAINS or iterate.
// Nuxt Content queryCollection doesn't support 'contains' in array easily with simple query?
// Actually 'tags' is an array. .where('tags', 'IN', 'Value') or similar?
// Let's fetch all and filter for now as a fallback or use .where({ tags: { $contains: tagName } })

// Simple capitalization for display
const tagName = computed(() => {
    return tagSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
})

const { data: posts } = await useAsyncData(`tag-${tagSlug}`, () => {
  return queryCollection('blog')
    .order('date', 'DESC')
    .all()
    .then(allPosts => {
        // Filter manually if needed, since exact match on slug might vary from tag string
        return allPosts.filter(p => {
            if (!p.tags) return false
            // Check if any tag slugified matches the route slug
            return p.tags.some(t => {
                const s = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                return s === tagSlug
            })
        })
    })
})



// Meta
useHead({
  title: `Tag: ${tagName.value} - Auraq`
})
</script>
