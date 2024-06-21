import { createTheme, getAllThemes, getOneTheme } from '../../../useCase'
import { ThemeController } from './ThemeController'

const themeController = new ThemeController(
  getAllThemes,
  getOneTheme,
  createTheme
)

export { themeController }
