import React, { useState, useEffect } from 'react';
import { clienteService } from '../../services/clienteService';
import { useRouter } from 'next/router';
import mock from '@/utils/mock';
import ActionButtonsTable from '../../components/ActionButtonsTable';
import ModalComponent from '../../components/ModalComponent';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Clientes() {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [id, setId] = useState();
    /* const [carregando, setCarregando] = useState(true); */

    useEffect(() => {
        setTimeout(() => {
            clienteService.listar()
                .then((response) => {
                    setClientes(response);
                    /* setCarregando(false); */
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    }, []);

    const addCliente = () => {
        router.push('/clientes/cadastrar-cliente');
    }

    const editarCliente = (idCliente) => {
        router.push(`/clientes/cadastrar-cliente/${idCliente}`);
    }

    const removerCliente = async (id) => {
        try {
            const result = await clienteService.remover({
                id: id,
            });

            toast.notify(result.mensagem, {
                title: 'Removido com sucesso!',
                duration: 3,
                type: "success"
            })
        } catch (error) {
            toast.notify(error.message, {
                title: 'Erro!',
                duration: 3,
                type: "error"
            })
        } finally {
            router.reload();
        }
    }

    const positiveAnswer = () => {
        removerCliente(id);
        setIsOpen(false);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = (nome, id) => {
        setNome(nome);
        setId(id)
        setIsOpen(true);
    }

    return (
        <>
            <section>
                <ModalComponent
                    nome={nome}
                    modalIsOpen={modalIsOpen}
                    positiveAnswer={positiveAnswer}
                    closeModal={closeModal}
                />
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de clientes</h2>
                    <table className='table-auto border-separate sm:border-spacing-1 md:border-spacing-4 lg:border-spacing-6 border border-slate-300 rounded-lg'>
                        <thead>
                            <tr>
                                {mock.tableCliente.map
                                    ((column) => (
                                        <th key={column.id}>{column.nome}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map
                                ((row) => (
                                    <tr key={row.id} className='text-center'>
                                        <td>{row.nome}</td>
                                        <td>{row.telefone}</td>
                                        <td>{row.bairro}</td>
                                        <td>{row.cidade}</td>
                                        <td>{row.endereco}</td>
                                        <td>{row.paga_mensalmente === 1 ? 'SIM' : 'NÃO'}</td>
                                        <td>{row.nfe === '1' ? 'SIM' : 'NÃO'}</td>
                                        <td>
                                            <ActionButtonsTable
                                                nome={row.nome}
                                                id={row.id}
                                                editar={editarCliente}
                                                openModal={openModal}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}