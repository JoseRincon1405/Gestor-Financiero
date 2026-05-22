import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionSchema } from '../schemas/TransactionsSchema';
import { useAppStore } from '../stores/useAppStore';
import type { TransactionForm } from '../types';

export default function Form() {
  // Añadimos el genérico <TransactionForm> para blindar el tipado de los inputs
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionForm>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: 'gasto',
      amount: 0,
      description: '',
      category: 'comida'
    }
  });

  const addTransaction = useAppStore((state) => state.addTransaction);

  const onSubmit = (data: TransactionForm) => {
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
      /* Cambiado max-w-65 por max-w-sm para fijar el ancho correctamente */
      className="bg-white shadow-md p-5 max-w-sm my-10 border-2 border-gray-400 rounded-lg w-full" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className='text-2xl font-bold text-gray-800 pb-2 border-b-2 border-gray-400 mb-4'>Añadir Movimiento</h3>
      
      <div className='my-4'>
        <label className='text-gray-800 font-bold block mb-1'>Concepto</label>
        <input 
          {...register('description')}
          placeholder='Ej. Supermercado'
          className='border-2 p-2 rounded-lg border-gray-400 w-full outline-none focus:border-green-600'
        />
        {errors.description && 
          <span className="text-red-600 text-xs font-semibold mt-1 block">{errors.description.message}</span>
        }
      </div>

      <div className='my-4'>
        <label className='text-gray-800 font-bold block mb-1'>Monto $</label>
        <input 
          type="number" 
          {...register('amount', { valueAsNumber: true })} 
          className='border-2 p-2 rounded-lg border-gray-400 w-full outline-none focus:border-green-600'
        />
        {errors.amount && 
          <span className="text-red-600 text-xs font-semibold mt-1 block">{errors.amount.message}</span>
        }
      </div>

      <div className='my-4'>
        <label className='text-gray-800 font-bold block mb-1'>Tipo</label>
        <select 
          {...register('type')}
          className='border-2 p-2 rounded-lg border-gray-400 w-full bg-white outline-none focus:border-green-600'
        >
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {errors.type && 
          <span className="text-red-600 text-xs font-semibold mt-1 block">{errors.type.message}</span>
        }
      </div>

      <div className='my-4'>
        <label className='text-gray-800 font-bold block mb-1'>Categoría</label>
        <select 
          {...register('category')}
          className='border-2 p-2 rounded-lg border-gray-400 w-full bg-white outline-none focus:border-green-600'
        >
          <option value="comida">Alimentación</option>
          <option value="vivienda">Vivienda</option>
          <option value="ocio">Entretenimiento</option>
          <option value="trabajo">Trabajo</option>
        </select>
        {errors.category && 
          <span className="text-red-600 text-xs font-semibold mt-1 block">{errors.category.message}</span>
        }
      </div>

      <button 
        type="submit" 
        className='bg-green-700 rounded-lg p-2 text-white shadow-md mt-3 w-full hover:bg-green-600 hover:cursor-pointer transition-all font-bold uppercase text-sm tracking-wider'
      >
        Registrar Movimiento
      </button>
    </form>
  );
}
