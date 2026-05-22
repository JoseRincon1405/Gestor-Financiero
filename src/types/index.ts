import type { TransactionSchema } from "../schemas/TransactionsSchema";
import { z } from 'zod'



export type Transaction = {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: 'ingreso' | 'gasto';
    date: string;
};

export type TransactionForm = z.infer<typeof TransactionSchema>