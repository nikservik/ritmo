import { defineStore } from 'pinia'
import { getLevelConfig, MAX_LEVEL } from '../config/levels'
import { hoursToMs } from '../utils/time'

type PersistedStorage = Storage | undefined

const persistedStorage: PersistedStorage =
  typeof window === 'undefined' ? undefined : window.localStorage

export const usePracticeStore = defineStore('practice', {
  state: () => ({
    currentLevel: 1,
    currentStep: 0,
    isPracticing: false,
    countdownStartedAt: null as number | null,
    expiresAt: null as number | null,
  }),
  actions: {
    startPractice() {
      this.isPracticing = true
      this.countdownStartedAt = null
      this.expiresAt = null
    },
    stopPractice(now = Date.now()) {
      const testOffsetMs = hoursToMs(24)
      this.isPracticing = false
      this.advanceStep()
      this.applyCountdown(now - testOffsetMs)
    },
    advanceStep() {
      const { stepCount } = getLevelConfig(this.currentLevel)
      const nextStep = this.currentStep + 1

      if (nextStep >= stepCount) {
        this.currentLevel = Math.min(this.currentLevel + 1, MAX_LEVEL)
        this.currentStep = 0
        return
      }

      this.currentStep = nextStep
    },
    applyCountdown(now = Date.now()) {
      this.countdownStartedAt = now
      const ttlMs = this.getCurrentTtlMs()
      this.expiresAt = ttlMs > 0 ? now + ttlMs : null
    },
    getCurrentTtlMs() {
      const { stepTtlHours, levelTtlHours } = getLevelConfig(this.currentLevel)
      const ttlHours = this.currentStep === 0 ? levelTtlHours : stepTtlHours
      return hoursToMs(ttlHours)
    },
    expireProgress(now = Date.now()) {
      if (this.currentStep > 0) {
        this.currentStep -= 1
      } else if (this.currentLevel > 1) {
        this.currentLevel -= 1
      }

      this.isPracticing = false
      this.applyCountdown(now)
    },
  },
  persist: persistedStorage
    ? {
        key: 'ritmo:practice',
        storage: persistedStorage,
      }
    : false,
})
