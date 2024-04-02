import Modal from 'react-modal';
import React from 'react';

export default function ModalComponent({ nome, modalIsOpen, positiveAnswer, closeModal }) {
  const afterOpenModal = () => {
  }

  const handleConfirmation = () => {
    positiveAnswer();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'
    >
      <div className='w-96 h-40 bg-white justify-center items-center shadow-sm shadow-black  rounded-xl'>
        <div className='flex justify-between bg-red-200 p-2 font-semibold text-red-700 rounded-t-lg'>
          <h1>Atenção</h1>
          <button onClick={closeModal}>X</button>
        </div>
        <div className='p-2'>
          <span className='flex'>
            Tem certeza que deseja remover {nome}?
          </span>
          <div className='flex justify-end mt-10'>
            <button
              className='rounded-md px-4 py-1 bg-slate-300 mr-2'
              onClick={closeModal}
            >
              Não
            </button>
            <button
              className='rounded-md px-4 py-1 bg-slate-300'
              onClick={handleConfirmation}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </Modal>

  );
}