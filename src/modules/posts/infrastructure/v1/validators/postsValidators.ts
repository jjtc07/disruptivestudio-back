import { z } from 'zod'

export const PostsValidatorSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(3, 'Description is required'),
  themes: z
    .array(z.string().min(1, 'Themes not empty'))
    .min(1, 'At least one theme is required'),
})
