import { onScopeDispose, watch } from 'vue'
import { usePracticeStore } from '../stores/practice'
import { createExpiryTimer } from '../timer/expiryTimer'

export function usePracticeExpiryTimer() {
  const store = usePracticeStore()
  const timer = createExpiryTimer(
    () => store.expiresAt,
    () => store.expireProgress(Date.now()),
  )

  const stopWatch = watch(
    () => store.expiresAt,
    (expiresAt) => {
      if (expiresAt) {
        timer.start()
      } else {
        timer.stop()
      }
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    stopWatch()
    timer.stop()
  })

  return { timer }
}
