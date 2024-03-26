import mockObj from '@/utils/mock';
import { useRouter } from 'next/router';
import { useState } from "react";
import { produtoService } from '../../services/produtoService';

export default function CadastrarProdutos() {
  const router = useRouter();

  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    tipo: '',
    valor: ''
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(dadosFormulario).forEach(([key, value]) => {
      data.append(key, value);
    })

    produtoService
      .salvar({
        data: data,
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const voltar = () => {
    router.push('/produtos/');
  }

  return (
    <section className="bg-neutral-100">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Registrar produto</h2>
        <form onSubmit={onSubmit}>
          <div className='grid grid-cols-2'>
            <div className='mr-4'>
              <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome produto</label>
              <input type="text"
                name="nome"
                placeholder='Nome'
                value={dadosFormulario.nome}
                onChange={handleInput}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
            </div>
            <div className='ml-4'>
              <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900">Tipo de produto</label>
              <select id='tipo' name='tipo'
                value={dadosFormulario.tipo}
                onChange={handleInput}
                className='shadow-sm bg-gray-50 border
                                    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
              >
                {mockObj.tiposProdutos.map((tipo) => (
                  <option key={tipo.id}>{tipo.nome}</option>
                ))}
              </select>
            </div>
            <div className='mr-4 mt-4'>
              <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900">Valor do produto</label>
              <input type="text"
                name="valor"
                placeholder='R$'
                value={dadosFormulario.valor}
                onChange={handleInput}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />

            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <button className='border-solid border-2 text-white rounded-md px-5 py-1 mr-3 bg-gray-400 hover:bg-gray-500' onClick={voltar}>Voltar</button>
            <button className='border-solid border-2 text-white rounded-md px-5 py-1 bg-emerald-500 hover:bg-emerald-600' type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </section>
  )
}