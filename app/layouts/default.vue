<template>
  <div class="min-h-screen bg-[#FDFBF7] dark:bg-auraq-dark text-gray-900 dark:text-gray-100 font-serif antialiased selection:bg-auraq-accent selection:text-white transition-colors duration-300">
    <header class="fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#FDFBF7]/90 dark:bg-auraq-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800/50">
      <div class="max-w-4xl mx-auto px-6 h-auto md:h-20 py-4 md:py-0 flex flex-row items-center justify-between gap-4 md:gap-0">
        <NuxtLink to="/" class="group flex items-center gap-4">        
          <img src="/auraq_logo.svg" alt="Auraq" class="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity dark:filter-none" /> 
          <div class="flex flex-col">            
            <span class="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 leading-none tracking-tight">Auraq</span>            
            <span class="text-[0.55rem] md:text-[0.65rem] uppercase tracking-widest font-sans font-medium text-auraq-accent mt-1">A magazine of life, cities and culture</span>
          </div>         
        </NuxtLink>
        
        <nav class="flex items-center gap-6 text-sm font-sans font-medium text-gray-600 dark:text-gray-400">                    
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle Theme">
             <!-- Sun (for dark mode) -->
             <svg v-if="isDark" class="w-5 h-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
             </svg>
             <!-- Moon (for light mode) -->
             <svg v-else class="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
             </svg>
          </button>
        </nav>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-32">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800/50 mt-auto py-12">
      <div class="max-w-4xl mx-auto px-6 text-center text-sm font-sans text-gray-500 dark:text-gray-600">
        &copy; {{ new Date().getFullYear() }} Bharat Kashyap
      </div>
    </footer>
  </div>
</template>

<script setup>
const isDark = ref(true)

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  // Check system preference or default to dark
  if (localStorage.getItem('theme') === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  } else {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

watch(isDark, (val) => {
  localStorage.setItem('theme', val ? 'dark' : 'light')
})
</script>

<style>
/* Remove hardcoded body bg */
html {
  scroll-behavior: smooth;
}
</style>
