import z from 'zod'

export const InvoiceSchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    amount: z.number().nonnegative(),
    currency: z.string().length(3),
    status: z.enum(['unpaid', 'paid', 'overdue']),
    type: z.enum(['standard', 'proforma']),
    created_at: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    })
})