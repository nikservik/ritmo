export type LevelConfig = {
  level: number
  stepCount: number
  name: string
  stepTtlHours: number
  levelTtlHours: number
}

export const DEFAULT_STEP_COUNT = 10
export const DEFAULT_STEP_TTL_HOURS = 72
export const DEFAULT_LEVEL_TTL_HOURS = 240

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 1',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 2,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 2',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 3,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 3',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 4,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 4',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 5,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 5',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 6,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 6',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 7,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 7',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 8,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 8',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 9,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 9',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
  {
    level: 10,
    stepCount: DEFAULT_STEP_COUNT,
    name: 'Уровень 10',
    stepTtlHours: DEFAULT_STEP_TTL_HOURS,
    levelTtlHours: DEFAULT_LEVEL_TTL_HOURS,
  },
]

export const MAX_LEVEL = LEVELS.length

export function getLevelConfig(level: number): LevelConfig {
  const safeLevel = Math.min(Math.max(level, 1), MAX_LEVEL)
  return LEVELS[safeLevel - 1]
}
