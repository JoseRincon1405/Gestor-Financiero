import { useState, useMemo, useEffect } from "react";
import { useAppStore } from "../stores/useAppStore"

export default function TransactionList() {
  const transactions = useAppStore((state) => state.transactions)

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory')
    return savedCategory || ''
  })

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory)
  }, [selectedCategory])

  const filteredTransactions = useMemo(() => {
    if (!selectedCategory) return transactions;
    return transactions.filter(tx => tx.category === selectedCategory);
  }, [transactions, selectedCategory]);


  const lastTenFilteredTransactions = filteredTransactions.slice().reverse().slice(0, 10);

  return (
    <>

      <div className="bg-white shadow-md p-5 my-10 border-2 border-gray-400 rounded-lg max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-400 mb-4">Últimas Transacciones</h3>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 my-6 bg-white p-4 rounded-lg border border-gray-200">
          <label className="font-bold text-gray-700 text-sm">Filtrar por Categoría:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 p-2 rounded-lg border-none focus:ring-2 focus:ring-green-500 outline-none w-full sm:w-64 text-sm"
          >
            <option value="">-- Todas las Categorías --</option>
            <option value="comida">Alimentación</option>
            <option value="vivienda">Vivienda</option>
            <option value="ocio">Entretenimiento</option>
            <option value="trabajo">Trabajo</option>
          </select>
        </div>


        <div>
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-4 text-sm font-medium">
              {selectedCategory 
                ? `Aún no hay movimientos en la categoría "${selectedCategory}"` 
                : "Aún no hay transacciones registradas..."}
            </p>
          ) : (

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse minimal-table">
                <thead>
                  <tr className="bg-green-100 border-b border-gray-200">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-700 tracking-wider">Concepto</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-700 tracking-wider">Categoría</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-700 tracking-wider">Monto</th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-700 tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {lastTenFilteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-left uppercase text-xs font-medium text-gray-800">{tx.description}</td>
                      <td className="px-5 py-3 text-left uppercase text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold border border-gray-200">
                          {tx.category}
                        </span>
                      </td>

                      <td className={`px-5 py-3 text-xs font-bold ${tx.type === 'gasto' ? 'text-red-700' : 'text-green-700'}`}>
                        {tx.type === 'gasto' ? '-' : '+'}${tx.amount}
                      </td>
                      <td className="px-5 py-3 text-left text-xs text-gray-500">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
