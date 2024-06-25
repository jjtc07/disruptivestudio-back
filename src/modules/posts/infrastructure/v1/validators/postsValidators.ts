import { z } from 'zod'

export const PostsValidatorSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(3, 'Description is required'),
  content: z.string().url().optional(),
})
