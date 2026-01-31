<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'

type Theme = 'light' | 'dark'

const THEME_KEY = 'ritmo:theme'
const theme = ref<Theme>('light')

const applyTheme = (value: Theme) => {
  theme.value = value
  document.documentElement.classList.toggle('dark', value === 'dark')
  localStorage.setItem(THEME_KEY, value)
}

const setTheme = (value: Theme) => {
  if (theme.value === value) return
  applyTheme(value)
}

onMounted(() => {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
    return
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
})
</script>

<template>
  <div class="mt-4 float-right inline-flex items-center gap-0.5 p-0.75 rounded-full text-gray-700 dark:text-gray-200  bg-gray-950/5  dark:bg-white/10">
    <button
      type="button"
      class="rounded-full p-1.5 bg-white dark:bg-transparent  transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      :aria-pressed="theme === 'light'"
      @click="setTheme('light')"
    >
      <span class="sr-only">Светлая тема</span>
      <SunIcon class="size-5" aria-hidden="true" />
    </button>
    <button
      type="button"
      class="rounded-full p-1.5 dark:bg-gray-600"
      :aria-pressed="theme === 'dark'"
      @click="setTheme('dark')"
    >
      <span class="sr-only">Темная тема</span>
      <MoonIcon class="size-5" aria-hidden="true" />
    </button>
  </div>
</template>
