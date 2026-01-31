<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'

// check for updates every day
const period = 24 * 60 * 60 * 1000

const swActivated = ref(false)

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(swUrl: string, r: ServiceWorkerRegistration) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    }
    else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        const sw = e.target as ServiceWorker
        swActivated.value = sw.state === 'activated'
        if (swActivated.value)
          registerPeriodicSync(swUrl, r)
      })
    }
  },
})

function close() {
  needRefresh.value = false
}
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-start px-4 py-6 sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class=""
        leave-to-class="opacity-0"
      >
        <div
          v-if="needRefresh"
          class="pointer-events-auto w-full max-w-sm rounded-lg bg-white  shadow-lg outline-1 outline-black/5 dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10"
          aria-labelledby="toast-message"
          role="alert"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <ArrowPathIcon class="size-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p id="toast-message" class="text-sm font-medium text-gray-900 dark:text-white">
                  Доступно обновление
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  При обновлении все данные остаются без изменений
                </p>
                <div class="mt-3 flex space-x-7">
                  <button
                    type="button"
                    class="rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 dark:focus:outline-indigo-400"
                    @click="updateServiceWorker()"
                  >
                    Обновить
                  </button>
                  <button
                    type="button"
                    class="rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 dark:text-gray-300 dark:hover:text-white dark:focus:outline-indigo-400"
                    @click="close"
                  >
                    Пропустить
                  </button>
                </div>
              </div>
              <div class="ml-4 flex shrink-0">
                <button
                  type="button"
                  class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 dark:hover:text-white dark:focus:outline-indigo-500"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
