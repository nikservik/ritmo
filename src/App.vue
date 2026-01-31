<script setup lang="ts">
import PWABadge from './components/PWABadge.vue'
import CurrentLevel from './components/CurrentLevel.vue'
import StartStopButton from './components/StartStopButton.vue'
import TimerIndicator from './components/TimerIndicator.vue'
import ThemeToggle from './components/ThemeToggle.vue'
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg">
      <div class="flex min-h-[100svh] flex-col justify-between pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div class="">
          <ThemeToggle />
          <CurrentLevel />
        </div>
        <div class="">
          <TimerIndicator />
        </div>
        <div class="">Предложение практики</div>
        <div class="text-center">
          <StartStopButton />
        </div>
        <div class="">
        </div>
      </div>
    </div>
    <PWABadge />
  </div>
</template>
