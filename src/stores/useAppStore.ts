import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { createAmountSlice, type AmountSliceType } from "./amountSlice"

export const useAppStore = create<AmountSliceType>()(
    devtools(
        persist(
            (...a) => ({
                ...createAmountSlice(...a)
            }),
            {
                name: 'finance-storage' // Nombre único para identificar tus datos en el navegador
            }
        )
    )
)