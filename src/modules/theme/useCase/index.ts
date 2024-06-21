import { themeRepository } from '../domain'
import { CreateTheme } from './CreateTheme'
import { GetAllThemes } from './GetAllTheme'
import { GetOneTheme } from './GetOneTheme'

const getAllThemes = new GetAllThemes(themeRepository)
const getOneTheme = new GetOneTheme(themeRepository)
const createTheme = new CreateTheme(themeRepository)

export { getAllThemes, getOneTheme, createTheme }
