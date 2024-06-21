import { ThemeRepository } from './theme-repository'
import { Theme } from './theme.model'
export * from './theme.model'

const themeRepository = new ThemeRepository(Theme)

export { themeRepository }
