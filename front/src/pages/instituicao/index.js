import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import { Column } from "typeorm";
import { instituicaoService } from "../../services/instituicaoService";
import ActionButtonsTable from "../../components/ActionButtonsTable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import HeaderTable from "../../components/HeaderTable";
import ModalComponent from "../../components/ModalComponent";
import { useRouter } from "next/router";
import { toast, ToastContainer } from 'react-nextjs-toast';

export default function Instituicao() {
  const [instituicao, setInstituicao] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const toast = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nome, setNome] = useState();
  const [id, setId] = useState();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      instituicaoService.listar()
        .then((response) => {
          setInstituicao(response);
          /* setCarregando(false); */
        })
        .catch((error) => {
          console.error(error);
        })
    })
  }, []);

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

  const editarInstituicao = (idInstituicao) => {
    router.push(`/instituicao/cadastrar-instituicao/${idInstituicao}`);
  }

  const removerCliente = async (id) => {
    try {
      const result = await instituicaoService.remover({
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

  const actionBodyTemplate = (item) => {
    return (
      <React.Fragment>
        <ActionButtonsTable
          nome={item.nome}
          id={item.id}
          editar={editarInstituicao}
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
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Listagem de Instituições</h2>
          <div className='overflow-x-auto'>
            <DataTable value={instituicao} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort
              filters={filters}
              globalFilterFields={['nome', 'cnpj']}
              header={header}
              scrollable
              scrollHeight="500px"
              emptyMessage="Instituições não encontrados." onFilter={(e) => setFilters(e.filters)} tableStyle={{ minWidth: '20rem' }}>
              <Column field="nome" header="Nome" sortable></Column>
              <Column field="cnpj" header="Cnpj" sortable></Column>
              <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column>
            </DataTable>
          </div>
        </div>
      </section>
    </>
  );
}