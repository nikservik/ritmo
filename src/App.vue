<script setup lang="ts">
import PWABadge from './components/PWABadge.vue'
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <div class="flex min-h-[100svh] flex-col justify-between pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div class="">Настройки</div>
        <div class="">Уровень</div>
        <div class="">Таймер</div>
        <div class="">Предложение практики</div>
        <div class="">Старт/Стоп</div>
        <div class=""> </div>
      </div>
    </div>
    <PWABadge />
  </div>
</template>
