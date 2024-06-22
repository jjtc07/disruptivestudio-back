import { z } from 'zod'

export const CategoryValidatorSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  content: z.string().min(3, 'Content is required'),
})
