import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod'
import { note, note_type } from '~/server/drizzle/schema'
  
const baseSchema = z.object({
    type: z.enum(note_type.enumValues).default('text'),
    title: z.string().min(1),
    content: z.string().optional(),
    imageUrl: z.string().optional(),
});

export const refinedSchema = baseSchema.extend({
    imageUrl: z.string().optional(),
}).refine((data) => data.type !== 'image' || (data.type === 'image' && data.imageUrl), {
    message: "imageUrl is required when type is 'image'",
    path: ["imageUrl"], // This specifies the path of the field that the error message is associated with.
});

export const schema = createInsertSchema(note, baseSchema.shape)

export const updateSchema = schema.omit({ type: true, userId: true, id: true })

export type CreateNoteSchema = z.infer<typeof refinedSchema>
export type UpdateNoteSchema = z.infer<typeof updateSchema>
