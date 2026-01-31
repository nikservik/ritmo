type TimerHandle = ReturnType<typeof setInterval> | null

export type ExpiryTimer = {
  start: () => void
  stop: () => void
  isRunning: () => boolean
}

export type ExpiryTimerOptions = {
  intervalMs?: number
}

export function createExpiryTimer(
  getExpiresAt: () => number | null,
  onExpire: () => void,
  options: ExpiryTimerOptions = {},
): ExpiryTimer {
  const intervalMs = options.intervalMs ?? 1000
  let intervalId: TimerHandle = null
  let fired = false

  const stop = () => {
    if (intervalId === null) return
    clearInterval(intervalId)
    intervalId = null
  }

  const check = () => {
    const expiresAt = getExpiresAt()
    if (expiresAt === null) return

    if (Date.now() >= expiresAt) {
      if (!fired) onExpire()
      fired = true
      stop()
    }
  }

  const start = () => {
    if (intervalId !== null) return
    fired = false
    check()
    intervalId = setInterval(check, intervalMs)
  }

  const isRunning = () => intervalId !== null

  return { start, stop, isRunning }
}
