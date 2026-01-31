<script setup lang="ts">
import { computed, onMounted, onScopeDispose, ref } from 'vue'
import { usePracticeStore } from '../stores/practice'

const store = usePracticeStore()
const now = ref(Date.now())

const radius = 97.5
const circumference = 2 * Math.PI * radius
const tickMs = 1000

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = Date.now()
  }, tickMs)
})

onScopeDispose(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
})

const totalMs = computed(() => {
  if (!store.countdownStartedAt || !store.expiresAt) return 0
  return Math.max(0, store.expiresAt - store.countdownStartedAt)
})

const remainingMs = computed(() => {
  if (!store.expiresAt) return 0
  return Math.max(0, store.expiresAt - now.value)
})

const hasCountdown = computed(
  () =>
    store.countdownStartedAt !== null &&
    store.expiresAt !== null &&
    store.expiresAt > store.countdownStartedAt,
)

const formattedRemaining = computed(() => {
  if (!hasCountdown.value || remainingMs.value <= 0) return ''
  const totalSeconds = Math.floor(remainingMs.value / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (value: number) => String(value).padStart(2, '0')
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
})

const progress = computed(() => {
  const total = totalMs.value
  if (total <= 0) return 0
  return Math.min(1, remainingMs.value / total)
})

const dashArray = computed(() => {
  const filled = circumference * progress.value
  const empty = circumference - filled
  return `${filled} ${empty}`
})

const dashOffset = computed(() => circumference * progress.value)
</script>

<template>
  <div class="relative flex w-full items-center justify-center">
    <svg class="h-52 w-52" viewBox="0 0 200 200" aria-hidden="true">
      <circle
        cx="100"
        cy="100"
        r="97.5"
        fill="transparent"
        stroke="currentColor"
        stroke-width="5"
        class="text-indigo-500/30"
      />
      <circle
        cx="100"
        cy="100"
        r="97.5"
        fill="transparent"
        stroke="currentColor"
        stroke-width="5"
        stroke-linecap="round"
        class="text-indigo-500"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 100 100)"
      />
    </svg>
    <span
      v-if="formattedRemaining"
      class="absolute text-2xl font-medium text-gray-900 dark:text-gray-100"
    >
      {{ formattedRemaining }}
    </span>
  </div>
</template>
