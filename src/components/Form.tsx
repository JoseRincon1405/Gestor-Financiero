import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema } from '../schemas/TransactionsSchema';
import { useAppStore } from '../stores/useAppStore';
import type {  TransactionForm } from '../types';


export default function Form() {

const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
        type: 'gasto',
        amount: 0
    }
})

const addTransaction = useAppStore((state) => state.addTransaction)

const onSubmit = (data : TransactionForm) => {
    const newTransaction = {
        ...data,
        id: crypto.randomUUID(),
        date: new Date().toISOString().slice(0, 10)
    };
    
    addTransaction(newTransaction);
    reset(); 
};

  return (
    <form
    className="bg-white shadow-md p-5 max-w-65 my-10 border-2 mr-3 border-gray-400 rounded-lg" 
    onSubmit={handleSubmit(onSubmit)}
    >
        <h3 className='text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-400'>Añadir Movimiento</h3>
        <div className='my-4'>
            <label className='text-gray-800 font-bold'>Concepto</label>
            <br />
            <input 
            {...register('description')}
            placeholder='Ej. Supermercado'
            className='border-2 p-2 rounded-lg border-gray-400 w-full '
             />
            
            {errors.description && 
                <span>{errors.description.message}</span>
            }
        </div>

        <div className='my-4'>
            <label className='text-gray-800 font-bold'>Monto $</label>
            <br />
            <input 
            type="number" 
            {...register('amount', { valueAsNumber: true })} 
            className='border-2 p-2 rounded-lg border-gray-400 w-full '
            />
            {errors.amount && <span>{errors.amount.message}</span>}
        </div>

        <div className='my-4'>
            <label className='text-gray-800 font-bold'>Tipo</label>
            <br />
            <select 
            {...register('type')}
            className='border-2 p-2 rounded-lg border-gray-400 w-full  '
            >
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
            </select>
        </div>

        <div className='my-4'>
        <label className='text-gray-800 font-bold'>Categoría</label>
        <br />
            <select {...register('category')}
            className='border-2 p-2 rounded-lg border-gray-400 w-full '
            >
                <option value="comida">Alimentación</option>
                <option value="vivienda">Vivienda</option>
                <option value="ocio">Entretenimiento</option>
                <option value="trabajo">Trabajo</option>
            </select>
        </div>

        <button type="submit" className='bg-green-700 rounded-lg p-2 text-white shadow-md mt-3 w-full hover:bg-green-600 hover:cursor-pointer transition-all'>Registrar Movimiento</button>
    </form>
  )
}
