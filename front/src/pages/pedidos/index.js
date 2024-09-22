import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pedidoService } from '../../services/pedidoService';
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Tag } from 'primereact/tag';
import ActionButtonsTable from '../../components/ActionButtonsTable';
import ModalComponent from '../../components/ModalComponent';
import { Dropdown } from 'primereact/dropdown';

export default function Pedidos() {
    const router = useRouter();
    const [pedidos, setPedidos] = useState([]);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [nome, setNome] = useState();
    const [id, setId] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [status] = useState(['PAGO', 'PENDENTE']);

    useEffect(() => {
        pedidoService.listar()
            .then((response) => {
                setPedidos(response);
            })
            .catch((error) => {
                console.error(error);
            });
        initFilters();
    }, []);


    const addPedido = () => {
        router.push('/pedidos/cadastrar-pedidos');
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        if (_filters['global']) {
            _filters['global'].value = value;
        }

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'cliente.nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'produto.nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'quantidade': { value: null, matchMode: FilterMatchMode.IN },
            'pago': { value: null, matchMode: FilterMatchMode.EQUALS },
            'data': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Limpar" outlined onClick={clearFilter} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisa" />
                </IconField>
            </div>
        );
    };

    const header = renderHeader();

    /* Filtros de status */
    const isPaid = (value) => {
        return value === 1 || value === 'PAGO' ? 'success' : 'danger';
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.pago === 1 ? 'PAGO' : 'PENDENTE'} severity={isPaid(rowData.pago)}></Tag>;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={isPaid(option)} />;
    };

    const pagoFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value}
                options={status}
                onChange={(e) => options.filterApplyCallback(e.value == 'PAGO' ? 1 : 0)}
                itemTemplate={statusItemTemplate}
                placeholder="Status"
                className="p-column-filter"
                showClear style={{ minWidth: '12rem' }} />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <ActionButtonsTable
                    nome={rowData.cliente.nome}
                    id={rowData.id}
                    editar={editarPedido}
                    openModal={openModal}
                />
            </React.Fragment>
        );
    };

    const editarPedido = (idPedido) => {
        router.push(`/pedidos/cadastrar-pedidos/${idPedido}`);
    }

    const openModal = (nome, id) => {
        setNome(nome);
        setId(id)
        setIsOpen(true);
    }

    const positiveAnswer = () => {
        removerPedido(id);
        setIsOpen(false);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const removerPedido = async (id) => {
        try {
            const result = await pedidoService.remover({
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

    return (
        <section>
            <ModalComponent
                nome={nome}
                modalIsOpen={modalIsOpen}
                positiveAnswer={positiveAnswer}
                closeModal={closeModal}
            />
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de pedidos</h2>
                <div className='overflow-x-auto'>
                    <DataTable value={pedidos} paginator rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        removableSort
                        scrollable
                        scrollHeight="500px"
                        filters={filters} globalFilterFields={['cliente.nome', 'produto.nome', 'quantidade', 'data']} header={header}
                        emptyMessage="Nenhum pedido encontrado."
                        onFilter={(e) => setFilters(e.filters)}
                        tableStyle={{ minWidth: '20rem' }}>
                        <Column field="cliente.nome" header="Nome" sortable></Column>
                        <Column field="produto.nome" header="Produto" sortable></Column>
                        <Column field="quantidade" header="Quantidade" sortable></Column>
                        <Column field="data" header="Data" sortable body={(rowData) => moment(rowData.data).format('DD/MM/YYYY')}></Column>
                        <Column field="pago" header="Pago" body={statusBodyTemplate} filter filterElement={pagoFilterTemplate}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </section>
    );
}