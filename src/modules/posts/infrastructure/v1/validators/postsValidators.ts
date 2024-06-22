import { z } from 'zod'

export const PostsValidatorSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  categories: z
    .array(z.string().min(1, 'Category not empty'))
    .min(1, 'At least one category is required'),
})
