import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ActionButtonsTable({ nome, id, editarProduto, openModal}) {
  return (
    <>
      <FontAwesomeIcon
        icon="pen-to-square"
        className='mr-3 cursor-pointer text-orange-600'
        title='Editar'
        onClick={() => editarProduto(id)}
      />
      <FontAwesomeIcon
        icon="trash-can"
        className='cursor-pointer text-red-700'
        title='Excluir'
        onClick={() => openModal(nome, id)}
      />
    </>
  )
}
