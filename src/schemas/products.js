import z from 'zod'

export const ProductSchema = z.object({
    id: z.number().int().positive(),
    code: z.string().min(1).max(20),
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    price: z.number().nonnegative(),
    inStock: z.boolean(),
    created_at: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    })
})