import { useRouter } from 'next/router';

export default function Produtos() {
    const router = useRouter();
    const addProduto = () => {
        router.push('/produtos/cadastrar-produtos');
    }
    return (
        <>
            <section>
                <button className='mt-3 ml-3 border-solid border-2 text-white rounded-md px-4 py-1 mr-3 bg-emerald-500 hover:bg-emerald-600' onClick={addProduto}>Adicionar produto</button>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de produtos</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6 border border-slate-300 rounded-lg'>
                        <thead>
                            <tr>
                               <th>Nome produto</th>
                               <th>Tipo produto</th>
                               <th>Valor produto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Coca-cola</td>
                                <td>Bebida</td>
                                <td>R$ 3,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}