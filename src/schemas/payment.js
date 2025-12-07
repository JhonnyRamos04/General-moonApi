import z from 'zod'

export const PaymentSchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    amount: z.number().nonnegative(),
    currency: z.string().length(3),
    method: z.enum(['credit_card', 'paypal', 'bank_transfer']),
    status: z.enum(['pending', 'completed', 'failed']),
    created_at: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    })
})