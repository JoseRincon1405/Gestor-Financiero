import type { StateCreator } from "zustand"
import type { Transaction } from "../types"



export type AmountSliceType = {
    transactions : Transaction[];
    addTransaction: (newTrans: Transaction) => void;
    deleteTransaction: (id: string) => void;
}


export const createAmountSlice: StateCreator<AmountSliceType> = (set) => ({
    transactions: [],
    addTransaction: (newTrans: Transaction) => {
        set((state) => ({
            transactions: [...state.transactions, newTrans]
        }))
    },
    deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
    }))

})