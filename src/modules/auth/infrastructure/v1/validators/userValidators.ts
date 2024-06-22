import { z } from 'zod'

export const SignInValidatorSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const SignUpValidatorSchema = z.object({
  username: z.string().min(1, 'Username is required').max(255),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
})
