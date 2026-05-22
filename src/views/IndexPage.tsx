import Form from "../components/Form";
import TransactionList from "../components/TransactionList";
import { useAppStore } from "../stores/useAppStore";
import { useMemo } from "react";

export default function IndexPage() {
  const transactions = useAppStore((state) => state.transactions)

  // Cálculo optimizado de totales
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
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Mi Resumen Financiero</h2>
      
      <div className="w-full">
        {/* Tarjetas de Resumen: Corregido gap-35 por un espaciado responsivo nativo */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 md:gap-16 bg-white shadow-md p-6 max-w-2xl w-full rounded-lg mx-auto border-2 border-gray-400 mb-8">
          <div className="text-center">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider mb-1">Ingresos</h3>
            <span className="text-3xl font-black text-green-800">${totalIncomes}</span>
          </div>

          <div className="text-center border-y sm:border-y-0 sm:border-x border-gray-200 py-4 sm:py-0 sm:px-12 md:px-16">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider mb-1">Gastos</h3>
            {/* Añadido el símbolo de $ y limpiado el signo negativo */}
            <span className="text-3xl font-black text-red-800">-${totalExpenses}</span>
          </div>

          <div className="text-center">
            <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider mb-1">Balance</h3>
            {/* Color dinámico según el estado del balance */}
            <span className={`text-3xl font-black ${totalBalance < 0 ? 'text-red-600' : totalBalance > 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {totalBalance < 0 ? '-' : ''}${Math.abs(totalBalance)}
            </span>
          </div>
        </div>

        {/* Sección de Formulario y Lista: Corregido flex-row estático a diseño responsivo */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mx-auto w-full max-w-6xl">
          <div className="w-full md:w-auto flex justify-center">
            <Form />
          </div>
          <div className="w-full md:flex-1 flex justify-center">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  )
}
