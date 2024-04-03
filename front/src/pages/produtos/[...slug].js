import mockObj from '@/utils/mock';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { produtoService } from '../../services/produtoService';
import CurrencyInput from 'react-currency-input-field';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function CadastrarProdutos() {
  const router = useRouter();
  const idProduto = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;

  const [isLoading, setIsLoading] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    tipo: 'Marmita',
    valor: ''
  });

  const limparDadosDoFormulario = () => {
    setDadosFormulario({
      nome: '',
      tipo: 'Marmita',
      valor: ''
    });
  };

  useEffect(() => {
    if (idProduto) {
      getProdutoById(idProduto)
    }
  }, [idProduto]);

  const getProdutoById = async (idProduto) => {
    const fetchedProdutoData = await produtoService.getById({
      id: idProduto,
    });
    setDadosFormulario(fetchedProdutoData);
  }

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const validateValue = (value) => {
    if (value) {
      dadosFormulario.valor = value.replace(/[^0-9]/g, '')
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await produtoService.salvar({
        data: dadosFormulario,
      });

      toast.notify(result.mensagem, {
        title: 'Salvo!',
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
      limparDadosDoFormulario();
      setIsLoading(false);
      voltar();
    }
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
                value={dadosFormulario.nome || ''}
                onChange={handleInput}
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                  text-sm rounded-lg focus:ring-primary-500 
                  focus:border-primary-500 block w-full p-2.5'
                required
              />
            </div>
            <div className='ml-4'>
              <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900">Tipo de produto</label>
              <select id='tipo' name='tipo'
                value={dadosFormulario.tipo}
                onChange={handleInput}
                className='shadow-sm bg-gray-50 border
                  border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-primary-500 focus:border-primary-500 
                  block w-full p-2.5'
              >
                {mockObj.tiposProdutos.map((tipo) => (
                  <option key={tipo.id}>{tipo.nome}</option>
                ))}
              </select>
            </div>
            <div className='mr-4 mt-4'>
              <label htmlFor="valor" className="block mb-2 text-sm font-medium text-gray-900">Valor do produto</label>
              <CurrencyInput
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                name="valor"
                placeholder="R$"
                decimalsLimit={2}
                decimalSeparator=","
                onValueChange={validateValue}
                value={dadosFormulario.valor}
                className='shadow-sm bg-gray-50 border border-gray-300
                 text-gray-900 text-sm rounded-lg 
                  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                required
              />
            </div>
          </div>
          <div className='flex justify-center mt-5'>
            <button
              className='border-solid border-2 text-white rounded-md px-5 py-1 mr-3 bg-gray-400 hover:bg-gray-500'
              onClick={voltar}
              type="button"
            >Voltar
            </button>

            <button
              className='border-solid border-2 text-white rounded-md px-5 py-1 bg-emerald-500 hover:bg-emerald-600'
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}