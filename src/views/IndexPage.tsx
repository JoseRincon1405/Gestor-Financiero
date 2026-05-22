
import Form from "../components/Form";
import TransactionList from "../components/TransactionList";
import { useAppStore } from "../stores/useAppStore";
import { useMemo } from "react";



export default function IndexPage() {

const transactions = useAppStore((state) => state.transactions)

const { totalIncomes, totalExpenses, totalBalance } = useMemo(() => {
  const incomes = transactions
    .filter(tx => tx.type === 'ingreso')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const expenses = transactions
    .filter(tx => tx.type === 'gasto')
    .reduce((acc, tx) => acc + tx.amount, 0);

  return {
    totalIncomes: incomes,
    totalExpenses: expenses,
    totalBalance: incomes - expenses
  };
}, [transactions]);



  return (
    <div className="p-5 bg-white rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Mi Resumen Financiero</h2>
        
        <div className="w-full">
            <div className="flex justify-center gap-35 bg-white shadow-md p-5 mt-5 max-w-2xl w-full rounded-lg mx-auto border-2 border-gray-400">
                <div className="text-center">
                    <h3 className="font-bold text-gray-700">Ingresos</h3>
                    <span className="text-3xl font-black text-green-800 ">${totalIncomes}</span>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-gray-700">Gastos</h3>
                    <span className="text-3xl font-black text-red-800">-{totalExpenses}</span>
                </div>

                <div className="text-center">
                    <h3 className="font-bold text-gray-700">Balance</h3>
                    <span className="text-3xl font-black text-gray-900">{totalBalance}</span>
                </div>

            </div>
            <div className="flex flex-row justify-center mx-auto gap-5">
                <div>
                    <Form />
                </div>
                <div>
                    <TransactionList 
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
