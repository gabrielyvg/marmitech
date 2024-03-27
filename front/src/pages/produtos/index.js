import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { produtoService } from '../../services/produtoService'
import mock from '@/utils/mock';

export default function Produtos() {
    const router = useRouter();
    const [produtos, setClientes] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            produtoService.listar()
                .then((response) => {
                    setClientes(response);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    }, []);
    
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
                                {mock.tableProdutos.map
                                    ((column) => (
                                        <th key={column.id}>{column.nome}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map
                                ((row) => (
                                    <tr key={row.id} className='text-center'>
                                        <td>{row.nome}</td>
                                        <td>{row.tipo}</td>
                                        <td>{row.valor}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}