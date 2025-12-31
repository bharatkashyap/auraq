import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {   
    blog: defineCollection({
      type: 'page',
      source: 'blog/**.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        image: z.string(),
        writer: z.string(),
        tags: z.array(z.string()).optional(),
        layout: z.string().optional()
      })
    }),
  },
})
