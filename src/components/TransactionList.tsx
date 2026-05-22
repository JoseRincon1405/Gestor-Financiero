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
    <div className="bg-white shadow p-5 my-10 border-2 border-gray-400 rounded-lg max-w-2xl w-2xl">
        <h3 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-400 mb-4">Últimas Transacciones</h3>

    <div className="flex flex-col md:flex-row md:items-center gap-5 my-8 bg-white p-5 rounded-lg shadow border border-gray-200">
        <label className="font-bold text-gray-700">Filtrar por Categoría:</label>
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

</div>
        <div>
            {filteredTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    {selectedCategory 
                        ? `Aún no hay movimientos en la categoría "${selectedCategory}"` 
                        : "Aún no hay transacciones registradas..."}
                </p>
            ) : (
                <table className="w-full border-collapse">
                // ... tu tabla intacta ...
                    <thead>
                        <tr className="bg-green-200 rounded-lg">
                            <th className="px-7 py-2 text-left uppercase">Concepto</th>
                            <th className="px-7 py-2 text-left uppercase">Categoría</th>
                            <th className="px-7 py-2 text-left uppercase">Monto</th>
                            <th className="px-7 py-2 text-left uppercase">FECHA</th>

                        </tr>
                    </thead>
                    <tbody>
                    {lastTenFilteredTransactions.map((tx) => (
                        
                        <tr
                        key={tx.id}
                        >
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.description}</td>
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.category}</td>
                            <td className={`px-7 py-2 font-bold ${tx.type === 'gasto' ? 'text-red-700' : 'text-green-700'}`}>{tx.amount}</td>
                            <td className="px-7 py-2 text-left uppercase text-sm text-gray-600">{tx.date}</td>
                        </tr>
                    
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
    </>
  )
}
