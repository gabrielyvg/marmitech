import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from "react";
import { clienteService } from '../../services/clienteService';

export default function CadastrarCliente() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
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

        clienteService
            .salvar({
                data: dadosFormulario,
            })
            .catch((err) => {
                console.log(err);
            })
    };

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
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
                            <input type="phone"
                                name="telefone"
                                placeholder="Telefone"
                                value={dadosFormulario.telefone}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Endereço</label>
                            <input type="text"
                                name="endereco"
                                placeholder="Endereço"
                                value={dadosFormulario.endereco}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Número</label>
                            <input type="text"
                                name="numero"
                                placeholder="Número"
                                value={dadosFormulario.numero}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Bairro</label>
                            <input type="text"
                                name="bairro"
                                placeholder="Bairro"
                                value={dadosFormulario.bairro}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='ml-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                            <input type="text"
                                name="cidade"
                                placeholder="Cidade"
                                value={dadosFormulario.cidade}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>
                        <div className='mt-4'>
                            <input type="checkbox" id="paga_mensalmente" name="paga_mensalmente" className='mr-1' checked={dadosFormulario.paga_mensalmente} onChange={handleInput} />
                            <label htmlFor="paga_mensalmente" className="text-sm font-medium text-gray-900" >Paga mensalmente</label>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button className='border-solid border-2 text-white rounded-md px-5 py-1 mr-3 bg-gray-400 hover:bg-gray-500' onClick={voltar}>Voltar</button>
                        <button className='border-solid border-2 text-white rounded-md px-5 py-1 bg-emerald-500 hover:bg-emerald-600' type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </section>
    );
}