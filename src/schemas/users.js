import z from 'zod'

export const UserSchema = z.object({
    id: z.number().int().positive(),
    username: z.string().min(3).max(30),
    fullName: z.string().min(1).max(100),
    email: z.string().email(),
    created_at: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    })
})