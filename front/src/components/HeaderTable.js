import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export default function HeaderTable({ filtros, onFilterChange }) {  
    const [filters, setFilters] = useState();
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    
    useEffect(() => {
        console.log('filtros', filtros);
        setFilters(filtros);
    }, []);

    const clearFilter = () => {
        initFilters();
        onFilterChange({});
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        console.log('value', value);
        console.log('filters', filters);
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
        onFilterChange(_filters);
    };

    const initFilters = () => {
        setGlobalFilterValue('');
    };

    return (
        <div className="flex justify-content-between">
            <Button type="button" icon="pi pi-filter-slash" label="Limpar" outlined onClick={clearFilter} />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Pesquisa" />
            </IconField>
        </div>
    );
}