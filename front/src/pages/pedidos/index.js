import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services/pedidoService';
import mock from '../../utils/mock';
import moment from 'moment';

export default function Pedidos() {
    const router = useRouter();

    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            pedidoService.listar()
                .then((response) => {
                    setPedidos(response);
                    /* setCarregando(false); */
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    }, []);


    const addPedido = () => {
        router.push('/pedidos/cadastrar-pedidos');
    }
    return (
        <>
            <section>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de pedidos</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6 border border-slate-300 rounded-lg'>
                        <thead className='bg-slate-100 text-slate-600'>
                            <tr>
                                {mock.tablePedidos.map((column) => (
                                    <th key={column.id} className='px-4 py-2 border-b border-slate-200'>{column.nome}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((row) => (
                                <tr key={row.id} className='text-center'>
                                    <td className='px-4 py-2 border-b border-slate-200'>{row.cliente.nome}</td>
                                    <td className='px-4 py-2 border-b border-slate-200'>{row.produto.nome}</td>
                                    <td className='px-4 py-2 border-b border-slate-200'>{row.quantidade}</td>
                                    <td className='px-4 py-2 border-b border-slate-200'>{row.pago === 1 ? 'SIM' : 'NÃO'}</td>
                                    <td className='px-4 py-2 border-b border-slate-200'>{moment(row.data).format('DD/MM/YYYY')}</td>
                                    {/* <td className='px-4 py-2 border-b border-slate-200'>
                                        <ActionButtonsTable
                                            nome={row.nome}
                                            id={row.id}
                                            editar={editarCliente}
                                            openModal={openModal}
                                        />
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}