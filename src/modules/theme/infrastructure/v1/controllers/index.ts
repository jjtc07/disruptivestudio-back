import {
  createThemeUseCase,
  getAllThemesUseCase,
  getOneThemeUseCase,
} from '../../../useCase'
import { ThemeController } from './ThemeController'

const themeController = new ThemeController(
  getAllThemesUseCase,
  getOneThemeUseCase,
  createThemeUseCase
)

export { themeController }
