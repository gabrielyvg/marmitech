import mockObj from '@/utils/mock';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { produtoService } from '../../services/produtoService';
import { toast, ToastContainer } from 'react-nextjs-toast'
import Buttons from '../../components/Buttons';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

export default function CadastrarProdutos() {
  const router = useRouter();
  const idProduto = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;
  const [selectedProduto, setProduto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    tipo: '',
    valor: ''
  });

  const limparDadosDoFormulario = () => {
    setDadosFormulario({
      nome: '',
      tipo: '',
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

  const onSubmit = async (event) => {
    event.preventDefault();
    dadosFormulario.tipo = selectedProduto.nome;
    dadosFormulario.valor = dadosFormulario.valor * 100;
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
              <FloatLabel>
                <InputText type="text" className="p-inputtext-md"
                  name="nome"
                  value={dadosFormulario.nome}
                  onChange={handleInput} />
                <label htmlFor={'nome'}>Nome</label>
              </FloatLabel>
            </div>
            <div className='ml-4'>
              <Dropdown
                onChange={(e) => setProduto(e.value)}
                options={mockObj.tiposProdutos}
                value={selectedProduto}
                optionLabel="nome"
                placeholder="Selecione um produto"
                className="w-full md:w-14rem" />
            </div>
            <div className='mr-4 mt-4'>
              <InputNumber 
                inputId="currency-br" 
                value={dadosFormulario.valor} 
                onValueChange={handleInput} 
                mode="currency" 
                currency="BRL"
                placeholder='R$'
                name='valor'
                locale="pt-BR" />
            </div>
          </div>
          <Buttons
            voltar={voltar}
            isLoading={isLoading}
          />
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}