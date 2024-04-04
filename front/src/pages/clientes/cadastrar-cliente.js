import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function CadastrarCliente() {
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm({ defaultValues: {} });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitForm = async (data) => {
        setIsLoading(true);

        try {
            data.paga_mensalmente = data.paga_mensalmente ? 1 : 0;
            const result = await clienteService.salvar({
                data: JSON.stringify(data),
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
                <form onSubmit={handleSubmit(handleSubmitForm)} className='items-center'>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome cliente</label>
                            <input type="text"
                                name="nome"
                                placeholder="Nome"
                                {...register('nome')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                            <input type="phone"
                                name="telefone"
                                placeholder="Telefone"
                                {...register('telefone')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                            <input type="text"
                                name="endereco"
                                placeholder="Endereço"
                                {...register('endereco')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="numero" className="block mb-2 text-sm font-medium text-gray-900">Número</label>
                            <input type="text"
                                name="numero"
                                placeholder="Número"
                                {...register('numero')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text"
                                name="bairro"
                                placeholder="Bairro"
                                {...register('bairro')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                            <input type="text"
                                name="cidade"
                                placeholder="Cidade"
                                {...register('cidade')}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4 mt-4'>
                            <input type="checkbox" id="paga_mensalmente" name="paga_mensalmente" className='mr-1' {...register('paga_mensalmente')}
                                onChange={(e) => setValue('paga_mensalmente', e.target.checked)} />
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