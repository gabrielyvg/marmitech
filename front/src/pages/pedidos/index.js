import { useRouter } from 'next/router';

export default function Pedidos() {
    const router = useRouter();
    const addPedido = () => {
        router.push('/pedidos/cadastrar-pedidos');
    }
    return (
        <>
            <section>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de pedidos</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6 border border-slate-300 rounded-lg'>
                        <thead>
                            <tr>
                               <th>aaaaaaaa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>aaaaaaaaaa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}