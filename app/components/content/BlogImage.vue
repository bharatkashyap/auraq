<template>
    <figure :class="[widthClass, 'my-8', alignmentClass, clearClass]">
      <img 
        :src="src" 
        :alt="alt" 
        class="w-full h-auto rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:scale-[1.02] no-auto-float" 
        loading="lazy" 
      />
      <figcaption v-if="caption" class="text-center text-sm text-gray-500 font-sans mt-3 italic">
        {{ caption }}
      </figcaption>
    </figure>
</template>
  
<script setup>
  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'right', // Default to right float as it reads nicely often
      validator: (value) => ['left', 'right', 'center', 'none'].includes(value)
    }
  })
  
  const alignmentClass = computed(() => {
    switch (props.align) {
      case 'left':
        return 'md:float-left md:mr-8 md:mb-4'
      case 'right':
        return 'md:float-right md:ml-8 md:mb-4'
      case 'center':
        return 'mx-auto md:float-none'
      default:
        return 'mx-auto md:float-none'
    }
  })

  const widthClass = computed(() => {
    return props.align === 'center' ? 'w-full' : 'w-full md:w-1/2'
  })

  const clearClass = computed(() => {
    return props.align === 'center' ? 'clear-both' : 'clear-none'
  })
</script>
