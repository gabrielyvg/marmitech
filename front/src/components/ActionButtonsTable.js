import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';

export default function ActionButtonsTable({ nome, id, editar, openModal }) {
  return (
    <>
      <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editar(id)} />
      <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => openModal(nome, id)} />
     {/*  <FontAwesomeIcon
        icon="pen-to-square"
        className='mr-3 cursor-pointer text-orange-600'
        title='Editar'
        onClick={() => editar(id)}
      /> */}
      {/*  <FontAwesomeIcon
        icon="trash-can"
        className='cursor-pointer text-red-700'
        title='Excluir'
        onClick={() => openModal(nome, id)}
      /> */}
    </>
  )
}
