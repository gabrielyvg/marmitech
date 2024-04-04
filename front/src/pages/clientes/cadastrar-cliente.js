import { useRouter } from 'next/router';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function CadastrarCliente() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        telefone: '',
        bairro: '',
        cidade: '',
        endereco: '',
        numero: '',
        paga_mensalmente: false,
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
        setIsLoading(true);
        
        try {
            dadosFormulario.paga_mensalmente = dadosFormulario.paga_mensalmente ? 1 : 0;
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
                                onChange={handleInput}
                                className='mr-1'
                            />
                            <label htmlFor="paga_mensalmente" className="text-sm font-medium text-gray-900" >Paga mensalmente</label>
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