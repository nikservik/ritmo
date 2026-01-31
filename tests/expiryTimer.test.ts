import { afterEach, describe, expect, it, vi } from 'vitest'
import { createExpiryTimer } from '../src/timer/expiryTimer'

describe('expiry timer', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('fires when the expiry time is reached', () => {
    vi.useFakeTimers()
    const now = new Date('2024-01-01T00:00:00Z')
    vi.setSystemTime(now)

    let expiresAt = now.getTime() + 1000
    const onExpire = vi.fn()
    const timer = createExpiryTimer(() => expiresAt, onExpire, { intervalMs: 100 })

    timer.start()
    vi.advanceTimersByTime(900)
    expect(onExpire).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  it('fires immediately if already expired', () => {
    vi.useFakeTimers()
    const now = new Date('2024-01-01T00:00:00Z')
    vi.setSystemTime(now)

    const onExpire = vi.fn()
    const timer = createExpiryTimer(() => now.getTime() - 1, onExpire)

    timer.start()
    expect(onExpire).toHaveBeenCalledTimes(1)
  })
})
