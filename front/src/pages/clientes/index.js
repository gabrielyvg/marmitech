import React, { useState, useEffect } from 'react';
import { clienteService } from '../../services/clienteService';
import { useRouter } from 'next/router';
import mock from '@/utils/mock';

export default function Clientes() {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            clienteService.listar()
                .then((response) => {
                    setClientes(response);
                    setCarregando(false);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    }, []);

    const addCliente = () => {
        router.push('/clientes/cadastrar-cliente');
    }

    return (
        <>
            <section className="bg-neutral-100">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de clientes</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6'>
                        <thead>
                            <tr>
                                {mock.tableCliente.map
                                    ((column) => (
                                        <th key={column.id} >{column.nome}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map
                                ((row) => (
                                    <tr key={row.id}>
                                        <td>{row.nome}</td>
                                        <td>{row.telefone}</td>
                                        <td>{row.bairro}</td>
                                        <td>{row.cidade}</td>
                                        <td>{row.endereco}</td>
                                        <td>{row.paga_mensalmente}</td>
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