import mock from '@/utils/mock';
import { useRouter } from 'next/router';

export default function Financeiro() {
    const router = useRouter();
    
    const addGasto = () => {
        router.push('/financeiro/cadastrar-financeiro');
    }

    return (
        <>
            <section>
                <button className='mt-3 ml-3 border-solid border-2 text-white rounded-md px-4 py-1 mr-3 bg-emerald-500 hover:bg-emerald-600' onClick={addGasto}>Adicionar gasto</button>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de Gastos</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6 border border-slate-300 rounded-lg'>
                        <thead>
                            <tr>
                                {mock.tableGastos.map
                                    ((column) => (
                                        <th key={column.id}>{column.nome}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center'>
                                <td>Mercado</td>
                                <td>R$500,00</td>
                                <td>10/01</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}