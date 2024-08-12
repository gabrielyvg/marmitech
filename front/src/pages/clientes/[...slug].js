import { useRouter } from 'next/router';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function CadastrarCliente() {
    const router = useRouter();
    const idCliente = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;

    const [isLoading, setIsLoading] = useState(false);

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        telefone: '',
        bairro: '',
        cidade: '',
        endereco: '',
        numero: 0,
        paga_mensalmente: false,
        paga_semanalmente: false,
        nfe: false,
    });

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setDadosFormulario((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            dadosFormulario.paga_mensalmente = dadosFormulario.paga_mensalmente ? 1 : 0;
            dadosFormulario.paga_semanalmente = dadosFormulario.paga_semanalmente ? 1 : 0;
            dadosFormulario.nfe = dadosFormulario.nfe ? 1 : 0;
            const result = await clienteService.salvar({
                data: dadosFormulario,
            })

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
            setIsLoading(false);
            voltar();
        }
    }

    const voltar = () => {
        router.push('/clientes/');
    }

    useEffect(() => {
        if (idCliente) {
            getClienteById(idCliente)
        }
    }, [idCliente]);

    const getClienteById = async (idCliente) => {
        const fetchedClienteData = await clienteService.getById({
            id: idCliente,
        });
        const updatedData = {
            ...fetchedClienteData,
            nfe: fetchedClienteData.nfe === '1' ? true : false,
            paga_mensalmente: fetchedClienteData.paga_mensalmente === 1 ? true : false,
            paga_semanalmente: fetchedClienteData.paga_semanalmente === 1 ? true : false
        };
    
        setDadosFormulario(updatedData);
    }

    return (
        <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Cadastrar cliente</h2>
                <form onSubmit={onSubmit} className='items-center'>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome cliente</label>
                            <input type="text"
                                name="nome"
                                placeholder="Nome"
                                value={dadosFormulario.nome}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                            <input type="phone"
                                name="telefone"
                                placeholder="Telefone"
                                value={dadosFormulario.telefone}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                            <input type="text"
                                name="endereco"
                                value={dadosFormulario.endereco}
                                placeholder="Endereço"
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">Número</label>
                            <input type="text"
                                name="numero"
                                value={dadosFormulario.numero}
                                placeholder="Número"
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text"
                                name="bairro"
                                value={dadosFormulario.bairro}
                                placeholder="Bairro"
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                            <input type="text"
                                name="cidade"
                                value={dadosFormulario.cidade}
                                placeholder="Cidade"
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4 mt-4'>
                            <input type="checkbox"
                                id="paga_mensalmente"
                                name="paga_mensalmente"
                                value={dadosFormulario.paga_mensalmente}
                                checked={dadosFormulario.paga_mensalmente}
                                onChange={handleInput}
                                className='mr-1'
                            />
                            <label htmlFor="paga_mensalmente" className="text-sm font-medium text-gray-900" >Paga mensalmente</label>
                        </div>
                        <div className='ml-4 mt-4'>
                            <input type="checkbox"
                                id="paga_semanalmente"
                                name="paga_semanalmente"
                                value={dadosFormulario.paga_semanalmente}
                                checked={dadosFormulario.paga_semanalmente}
                                onChange={handleInput}
                                className='mr-1'
                            />
                            <label htmlFor="paga_semanalmente" className="text-sm font-medium text-gray-900" >Paga semanalmente</label>
                        </div>
                        <div className='ml-4 mt-4'>
                            <input type="checkbox"
                                id="nfe"
                                name="nfe"
                                value={dadosFormulario.nfe}
                                checked={dadosFormulario.nfe}
                                onChange={handleInput}
                                className='mr-1'
                            />
                            <label htmlFor="nfe" className="text-sm font-medium text-gray-900" >Necessário tirar nota?</label>
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
    );
}