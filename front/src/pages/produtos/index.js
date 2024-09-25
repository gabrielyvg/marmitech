import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { produtoService } from '../../services/produtoService';
import { toast, ToastContainer } from 'react-nextjs-toast';
import ModalComponent from '../../components/ModalComponent';
import ActionButtonsTable from '../../components/ActionButtonsTable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import HeaderTable from '../../components/HeaderTable';

export default function Produtos() {
    const router = useRouter();
    const [produtos, setClientes] = useState([]);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [id, setId] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'tipo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'valor': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });

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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <ActionButtonsTable
                    nome={rowData.nome}
                    id={rowData.id}
                    editar={editarProduto}
                    openModal={openModal}
                />
            </React.Fragment>
        );
    };

    const valorBodyTemplate = (rowData) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(rowData.valor / 100);
    };

    const renderHeader = () => {
        return (
            <HeaderTable filtros={filters} onFilterChange={setFilters} />
        );
    }

    const header = renderHeader();

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
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de produtos</h2>

                    <div className='overflow-x-auto'>
                        <DataTable value={produtos} paginator rows={5}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                            removableSort
                            scrollable
                            scrollHeight="500px"
                            filters={filters} globalFilterFields={['nome', 'tipo', 'valor']} header={header}
                            emptyMessage="No customers found."
                            onFilter={(e) => setFilters(e.filters)}
                            tableStyle={{ minWidth: '20rem' }}>
                            <Column field="nome" header="Nome" sortable></Column>
                            <Column field="tipo" header="Tipo" sortable></Column>
                            <Column field="valor" header="Valor" body={valorBodyTemplate} sortable></Column>
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                        </DataTable>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}