import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Column } from "typeorm";
import { instituicaoService } from "../../services/instituicaoService";

export default function Instituicao() {
  const [instituicao, setInstituicao] = useState('');
  const [filters, setFilters] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

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
      initFilters();
    })
  }, []);

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
  return (
    <>
      <section>
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