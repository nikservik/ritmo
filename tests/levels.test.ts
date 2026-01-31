import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LEVEL_TTL_HOURS,
  DEFAULT_STEP_COUNT,
  DEFAULT_STEP_TTL_HOURS,
  LEVELS,
} from '../src/config/levels'

describe('levels config', () => {
  it('builds 10 levels with default values', () => {
    expect(LEVELS).toHaveLength(10)

    LEVELS.forEach((level, index) => {
      const expectedLevel = index + 1
      expect(level.level).toBe(expectedLevel)
      expect(level.stepCount).toBe(DEFAULT_STEP_COUNT)
      expect(level.name).toBe(`Уровень ${expectedLevel}`)
      expect(level.stepTtlHours).toBe(DEFAULT_STEP_TTL_HOURS)
      expect(level.levelTtlHours).toBe(DEFAULT_LEVEL_TTL_HOURS)
    })
  })
})
