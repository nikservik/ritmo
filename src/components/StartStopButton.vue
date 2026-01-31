<script setup lang="ts">
import { computed } from 'vue'
import { StopIcon, PlayIcon } from '@heroicons/vue/24/solid'
import { usePracticeStore } from '../stores/practice'

const store = usePracticeStore()
const isPracticing = computed(() => store.isPracticing)

const startPractice = () => store.startPractice()
const stopPractice = () => store.stopPractice()
</script>

<template>
  <button
    v-if="!isPracticing"
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-indigo-500 dark:hover:bg-indigo-400"
    @click="startPractice"
  >
    <PlayIcon class="size-5" aria-hidden="true" />
    Начать практику
  </button>
  <button
    v-else
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-red-500/20 transition hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
    @click="stopPractice"
  >
    <StopIcon class="size-5" aria-hidden="true" />
    Закончить
  </button>
</template>
