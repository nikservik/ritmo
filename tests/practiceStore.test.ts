import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePracticeStore } from '../src/stores/practice'
import { hoursToMs } from '../src/utils/time'

describe('practice store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts practice', () => {
    const store = usePracticeStore()
    store.startPractice()

    expect(store.isPracticing).toBe(true)
  })

  it('clears countdown when starting practice', () => {
    const store = usePracticeStore()
    store.$patch({
      countdownStartedAt: 123,
      expiresAt: 456,
    })

    store.startPractice()

    expect(store.countdownStartedAt).toBeNull()
    expect(store.expiresAt).toBeNull()
  })

  it('stops practice and starts step countdown', () => {
    vi.useFakeTimers()
    const now = new Date('2024-01-01T00:00:00Z')
    vi.setSystemTime(now)

    const store = usePracticeStore()
    store.stopPractice()

    expect(store.isPracticing).toBe(false)
    expect(store.currentStep).toBe(1)
    expect(store.countdownStartedAt).toBe(now.getTime() - hoursToMs(24))
    expect(store.expiresAt).toBe(now.getTime() + hoursToMs(48))
  })

  it('rolls over level when max steps reached', () => {
    vi.useFakeTimers()
    const now = new Date('2024-01-02T00:00:00Z')
    vi.setSystemTime(now)

    const store = usePracticeStore()
    store.$patch({ currentLevel: 1, currentStep: 9 })
    store.stopPractice()

    expect(store.currentLevel).toBe(2)
    expect(store.currentStep).toBe(0)
    expect(store.expiresAt).toBe(now.getTime() + hoursToMs(216))
  })
})
