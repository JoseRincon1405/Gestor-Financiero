import { z } from 'zod'

export const TransactionSchema = z.object({
    description: z.string(),
    amount: z.number(),
    type: z.enum(["ingreso", "gasto"]),
    category: z.string(),
})