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
        if (!selectedCategory) return transactions;
        return transactions.filter(tx => tx.category === selectedCategory);
    }, [transactions, selectedCategory])


  return (
    <>
    <div className="p-5">
      <h2 className="text-2xl font-bold text-gray-800">Movimientos</h2>
        <div className="mt-5">
          
          {filteredTransactions.length === 0 ? (
                <p className="text-gray-500 text-center">Aún no hay transacciones...</p>
            ) : (
              <div className="bg-white rounded-lg shadow py-5 ">
                <label className="font-bold text-gray-700 pl-7">Filtrar por Categoría:</label>
                  <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-gray-100 p-2 rounded-lg border-none focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                  >
                      <option value="">-- Todas las Categorías --</option>
                      <option value="comida">Alimentación</option>
                      <option value="vivienda">Vivienda</option>
                      <option value="ocio">Entretenimiento</option>
                      <option value="trabajo">Trabajo</option>
                  </select>
                <table className="w-full border-collapse mt-5">
                    <thead>
                        <tr className=" rounded-lg">
                            <th className="px-7 py-2 text-left uppercase">Concepto</th>
                            <th className="px-7 py-2 text-left uppercase">Categoría</th>
                            <th className="px-7 py-2 text-left uppercase">Monto</th>
                            <th className="px-7 py-2 text-left uppercase">FECHA</th>
                            <th className="px-7 py-3 text-left uppercase ">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredTransactions.map((tx) => (
                        
                        <tr
                        key={tx.id}
                        >
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.description}</td>
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.category}</td>
                            <td className={`px-7 py-2 font-bold ${tx.type === 'gasto' ? 'text-red-700' : 'text-green-700'}`}>{tx.amount}</td>
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.date}</td>
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600 ">
                                <button
                                onClick={() => {
                                  if(confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
                                    deleteTransaction(tx.id)
                                  }
                                }}
                                className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white hover:cursor-pointer font-semibold py-1 px-3 rounded-md transition-colors duration-200 text-xs uppercase tracking-wider"
                                >
                                    ELIMINAR
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
    </>
  )
}
