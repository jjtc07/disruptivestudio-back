import { userRepository } from '../../user/domain'
import { SignInUseCase } from './SignIn'
import { SignUpUseCase } from './SignUp'

const signInUseCase = new SignInUseCase(userRepository)
const signUpUseCase = new SignUpUseCase(userRepository)

export { signInUseCase, signUpUseCase }
