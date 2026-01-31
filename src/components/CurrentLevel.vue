<script setup lang="ts">
import { computed } from 'vue'
import { getLevelConfig } from '../config/levels'
import { usePracticeStore } from '../stores/practice'

const store = usePracticeStore()

const levelConfig = computed(() => getLevelConfig(store.currentLevel))
const stepCount = computed(() => levelConfig.value.stepCount)
const filledCount = computed(() => Math.min(store.currentStep, stepCount.value))
const steps = computed(() => Array.from({ length: stepCount.value }))
</script>

<template>
  <div class="space-y-2 mt-10">
    <p class="text-lg font-medium text-gray-900 dark:text-gray-100">
      {{ levelConfig.name }}
    </p>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(_, index) in steps"
        :key="index"
        class="h-2.5 w-2.5 rounded-full"
        :class="index < filledCount ? 'bg-indigo-500' : 'bg-indigo-500/30'"
      />
    </div>
  </div>
</template>
