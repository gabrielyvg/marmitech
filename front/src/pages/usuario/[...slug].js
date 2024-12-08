import mockObj from '@/utils/mock';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { usuarioService } from '../../services/usuarioService';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputMask } from 'primereact/inputmask';
import Buttons from '../../components/Buttons';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { Password } from 'primereact/password';
export default function CadastrarUsuario() {
  const router = useRouter();
  const idUsuario = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTipoPessoa, setTipoPessoa] = useState(null);
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    tipoPessoa: '',
    telefone: '',
    email: '',
    token: '',
    senha: '',
    confirmaSenha: ''
  });

  const limparDadosDoFormulario = () => {
    setDadosFormulario({
      nome: '',
      tipoPessoa: '',
      telefone: '',
      email: '',
      token: '',
      senha: '',
      confirmaSenha: ''
    });
  };

  useEffect(() => {
    if (idUsuario) {
      getUsuarioById(idUsuario)
    }
  }, [idUsuario]);

  const getUsuarioById = async (idUsuario) => {
    const fetchedUsuarioData = await usuarioService.getById({
      id: idUsuario,
    });
    setDadosFormulario(fetchedUsuarioData);
  }

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setDadosFormulario((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  /* const handlePassword = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldValue === 'confirmaSenha') {
      
    }
  } */

  const onSubmit = async (event) => {
    event.preventDefault();
    dadosFormulario.tipoPessoa = selectedTipoPessoa.id;
    dadosFormulario.token = dadosFormulario.senha;

    if (dadosFormulario.senha !== dadosFormulario.confirmaSenha) {
      toast.notify(error.message, {
        title: 'Confirmação de senha inválida! Verifique a senha informada.',
        duration: 3,
        type: "error"
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await usuarioService.salvar({
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
    router.push('/usuario/');
  }

  return (
    <section className="bg-neutral-100">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Registrar Usuário</h2>
        <form onSubmit={onSubmit}>
          <div className='grid grid-cols-3'>
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
                onChange={(e) => setTipoPessoa(e.value)}
                options={mockObj.tipoUsuario}
                value={selectedTipoPessoa}
                optionLabel="nome"
                placeholder="Selecione um tipo de usuário"
                className="w-full md:w-14rem" />
            </div>
            <div className='mr-4 mt-4'>
              <FloatLabel>
                <InputMask
                  id="telefone"
                  name="telefone"
                  type="text"
                  mask="(99) 99999-9999"
                  placeholder="(99) 99999-9999"
                  value={dadosFormulario.telefone}
                  onChange={handleInput}
                >
                </InputMask>
                <label htmlFor="telefone">Telefone</label>
              </FloatLabel>
            </div>
            <div className='mr-4 mt-4'>
              <FloatLabel>
                <InputText type="text" className="p-inputtext-md"
                  name="email"
                  value={dadosFormulario.email}
                  onChange={handleInput} />
                <label htmlFor={'email'}>E-mail</label>
              </FloatLabel>
            </div>
            <div className='mr-4 mt-4'>
              <FloatLabel>
                <Password
                  inputId="senha"
                  name="senha"
                  value={dadosFormulario.senha}
                  onChange={handleInput}
                  toggleMask 
                  feedback={false}/>
                <label htmlFor="senha">Senha</label>
              </FloatLabel>
            </div>
            <div className='mr-4 mt-4'>
              <FloatLabel>
                <Password
                  inputId="confirmaSenha"
                  name="confirmaSenha"
                  value={dadosFormulario.confirmaSenha}
                  onChange={handleInput} 
                  toggleMask
                  feedback={false} />
                <label htmlFor="confirmaSenha">Confirme a senha digitada</label>
              </FloatLabel>
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