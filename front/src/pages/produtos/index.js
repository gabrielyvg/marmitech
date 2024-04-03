import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { produtoService } from '../../services/produtoService';
import mock from '@/utils/mock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-nextjs-toast';
import ModalComponent from '../../components/ModalComponent';

export default function Produtos() {
    const router = useRouter();
    const [produtos, setClientes] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [id, setId] = useState();

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

    const editarProduto = (idProduto) => {
        router.push(`/produtos/cadastrar-produtos/${idProduto}`);
    }

    const removerProduto = async (id) => {
        try {
            const result = await produtoService.remover({
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
        removerProduto(id);
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
                                        <td>{
                                            new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })
                                                .format(row.valor / 100)}
                                        </td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon="pen-to-square"
                                                className='mr-3 cursor-pointer text-orange-600'
                                                title='Editar'
                                                onClick={() => editarProduto(row.id)}
                                            />
                                            <FontAwesomeIcon
                                                icon="trash-can"
                                                className='cursor-pointer text-red-700'
                                                title='Excluir'
                                                onClick={() => openModal(row.nome, row.id)}
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