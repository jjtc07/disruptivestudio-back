import { z } from 'zod'

export const ThemeValidatorSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
})
