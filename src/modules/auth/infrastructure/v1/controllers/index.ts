import { signInUseCase, signUpUseCase } from '../../../useCase'
import { AuthController } from './AuthController'

const authController = new AuthController(signInUseCase, signUpUseCase)

export { authController }
