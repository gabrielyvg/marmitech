import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';
import { instituicaoService } from "../../services/instituicaoService";
import { Dropdown } from "primereact/dropdown";
import mock from '@/utils/mock';
import { useRouter } from "next/router";
import { useState } from "react";
import Buttons from "../../components/Buttons";

export default function CadastrarInstituicao() {
  const router = useRouter();
  const idInstituicao = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;
  const [selectedTipoInstituicao, setTipoInstituicao] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    cnpj: '',
    tipoInstituicao: ''
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const voltar = () => {
    router.push('/instituicao/');
  }

  const onSubmit = async (event) => {
    dadosFormulario.tipoInstituicao = selectedTipoInstituicao.id;
    event.preventDefault();
    try {
      const result = await instituicaoService.salvar({
        data: dadosFormulario,
      })

      if (result.status) {
        console.log('salvou?')
      } else {
        console.log('erro')
      }
    } catch (error) {
      console.error(error);
    } finally {
      voltar();
    }
  }
  console.log('mock.tipoInstituicao', mock.tipoInstituicao);
  return (
    <>
      <section className="flex justify-center">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Cadastrar cliente</h2>
          <form onSubmit={onSubmit} className='items-center'>
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
                <FloatLabel>
                  <InputText type="text" className="p-inputtext-md"
                    name="cnpj"
                    value={dadosFormulario.cnpj}
                    onChange={handleInput} />
                  <label htmlFor={'cnpj'}>Cnpj</label>
                </FloatLabel>
              </div>
              <div>
                <Dropdown
                  options={mock.tipoInstituicao}
                  value={selectedTipoInstituicao}
                  onChange={(e) => setTipoInstituicao(e.value)}
                  optionLabel="nome"
                  placeholder="Selecione um tipo de instituição"
                  className="w-full md:w-14rem" />
              </div>
            </div>
            <Buttons
              voltar={voltar}
              isLoading={isLoading}
            />
          </form>
        </div>
      </section>
    </>
  );
}