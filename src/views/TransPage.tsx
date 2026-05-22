import { useAppStore } from "../stores/useAppStore"
import { useEffect, useState, useMemo } from "react"

export default function TransPage() {
  const transactions = useAppStore((state) => state.transactions)
  const deleteTransaction = useAppStore((state) => state.deleteTransaction)

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const savedCategory = localStorage.getItem('selectedCategory')
    return savedCategory || ''
  })

  useEffect(() => {
    localStorage.setItem('selectedCategory', selectedCategory)
  }, [selectedCategory])

  const filteredTransactions = useMemo(() => {
    if (!selectedCategory) return transactions
    return transactions.filter(tx => tx.category === selectedCategory)
  }, [transactions, selectedCategory])

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-800">Movimientos</h2>
      
      <div className="mt-5">
        {/* Filtro de Categorías */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <label className="font-bold text-gray-700">Filtrar por Categoría:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-100 p-2 rounded-lg border-none focus:ring-2 focus:ring-green-500 outline-none w-full sm:w-64"
          >
            <option value="">-- Todas las Categorías --</option>
            <option value="comida">Alimentación</option>
            <option value="vivienda">Vivienda</option>
            <option value="ocio">Entretenimiento</option>
            <option value="trabajo">Trabajo</option>
          </select>
        </div>

        {/* Tabla o Mensaje Vacío */}
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-10 bg-white shadow rounded-lg border border-gray-200">
            {selectedCategory 
              ? `Aún no hay transacciones registradas en la categoría "${selectedCategory}".` 
              : "Aún no hay transacciones registradas..."}
          </p>
        ) : (
          /* Estructura HTML completamente corregida */
          <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-7 py-3 text-left uppercase text-xs font-bold text-gray-700 tracking-wider">Concepto</th>
                  <th className="px-7 py-3 text-left uppercase text-xs font-bold text-gray-700 tracking-wider">Categoría</th>
                  <th className="px-7 py-3 text-left uppercase text-xs font-bold text-gray-700 tracking-wider">Monto</th>
                  <th className="px-7 py-3 text-left uppercase text-xs font-bold text-gray-700 tracking-wider">Fecha</th>
                  <th className="px-7 py-3 text-left uppercase text-xs font-bold text-gray-700 tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-7 py-4 text-left uppercase text-sm font-medium text-gray-800">{tx.description}</td>
                    <td className="px-7 py-4 text-left uppercase text-sm text-gray-600">
                      <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs font-semibold">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-7 py-4 text-sm font-bold ${tx.type === 'gasto' ? 'text-red-700' : 'text-green-700'}`}>
                      {tx.type === 'gasto' ? '-' : '+'}${tx.amount}
                    </td>
                    <td className="px-7 py-4 text-left text-sm text-gray-600">{tx.date}</td>
                    <td className="px-7 py-4 text-left">
                      <button
                        onClick={() => {
                          if (confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
                            deleteTransaction(tx.id)
                          }
                        }}
                        className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-semibold py-1.5 px-3 rounded-md transition-all duration-200 text-xs uppercase tracking-wider hover:cursor-pointer shadow-xs"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}