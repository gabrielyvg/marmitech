import React, { useState, useEffect } from 'react';
import { clienteService } from '../../services/clienteService';
import { useRouter } from 'next/router';
import ActionButtonsTable from '../../components/ActionButtonsTable';
import ModalComponent from '../../components/ModalComponent';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Column } from 'typeorm';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import HeaderTable from '../../components/HeaderTable';

export default function Clientes() {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [nome, setNome] = useState();
    const [id, setId] = useState();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'telefone': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'paga_mensalmente': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'paga_semanalmente': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'nfe': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
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
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <ActionButtonsTable
                    nome={rowData.nome}
                    id={rowData.id}
                    editar={editarCliente}
                    openModal={openModal}
                />
            </React.Fragment>
        );
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
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de Clientes</h2>
                    <div className='overflow-x-auto'>
                        <DataTable value={clientes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
                            filters={filters}
                            globalFilterFields={['nome', 'telefone', 'paga_mensalmente', 'paga_semanalmente', 'nfe']}
                            header={header}
                            scrollable
                            scrollHeight="500px"
                            emptyMessage="Clientes não encontrados." onFilter={(e) => setFilters(e.filters)} tableStyle={{ minWidth: '20rem' }}>
                            <Column field="nome" header="Nome" sortable></Column>
                            {/* <Column field="telefone" header="Telefone" sortable></Column> */}
                            <Column field="paga_mensalmente" header="Paga Mensalmente" sortable body={(rowData) => rowData.paga_mensalmente === 1 ? 'SIM' : 'NÃO'}></Column>
                            <Column field="paga_semanalmente" header="Paga Semanalmente" sortable body={(rowData) => rowData.paga_semanalmente === 1 ? 'SIM' : 'NÃO'}></Column>
                            <Column field="nfe" header="Nfe" sortable body={(rowData) => rowData.nfe === 1 ? 'SIM' : 'NÃO'}></Column>
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                        </DataTable>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}