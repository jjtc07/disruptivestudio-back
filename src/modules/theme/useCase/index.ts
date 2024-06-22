import { themeRepository } from '../domain'
import { CreateThemeUseCase } from './CreateTheme'
import { GetAllThemesUseCase } from './GetAllTheme'
import { GetOneThemeUseCase } from './GetOneTheme'

const getAllThemesUseCase = new GetAllThemesUseCase(themeRepository)
const getOneThemeUseCase = new GetOneThemeUseCase(themeRepository)
const createThemeUseCase = new CreateThemeUseCase(themeRepository)

export { getAllThemesUseCase, getOneThemeUseCase, createThemeUseCase }
