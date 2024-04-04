import mockObj from '@/utils/mock';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { pedidoService } from '../../services/pedidoService';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Buttons from '../../components/Buttons';
import { produtoService } from '../../services/produtoService';
import { clienteService } from '../../services/clienteService';

export default function CadastrarPedidos() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        nome: '',
        tamanho: '',
        pago: false,
    });
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        getCliente();
        getProdutos();
    }, []);

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
        const data = new FormData();
        Object.entries(dadosFormulario).forEach(([key, value]) => {
            data.append(key, value);
        })
        pedidoService
            .salvar({
                data: data,
            })
            .catch((err) => {
                console.log(err);
                /* alert('Erro ao salvar'); */
            })
    };

    const getCliente = async () => {
        await clienteService.listar()
            .then((response) => {
                setClientes(response);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const getProdutos = async () => {
        await produtoService.listar()
            .then((response) => {
                setProdutos(response);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const voltar = () => {
        router.push('/pedidos/');
    }

    return (
        <section className="bg-neutral-100">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Registrar pedido</h2>
                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome cliente</label>
                            <input type="text"
                                name="nome"
                                placeholder='Nome'
                                value={dadosFormulario.nome}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5' />
                        </div>

                        <div className='ml-4'>
                            <label htmlFor="cliente" className="block mb-2 text-sm font-medium text-gray-900">Selecionar Cliente</label>
                            <select id='cliente' name='cliente'
                                /*  value={dadosFormulario.nome} */
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border
                                    border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                            >
                                {clientes.map((cliente) => (
                                    <option key={cliente.id}>{cliente.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col mt-2'>
                            <span className="block text-sm font-medium text-gray-900">Produtos</span>
                            {
                                produtos.map((produto) => (
                                    <div className='grid grid-cols-2 items-center mb-2'>
                                        <label htmlFor="produto" className="text-sm font-medium text-gray-900 mr-4" >
                                            <input
                                                name='produto'
                                                type='checkbox'
                                                value={produto.nome}
                                                id={produto.id}
                                                className='mr-2'
                                            />
                                            {produto.nome}
                                        </label>
                                        <div className=''>
                                            <label className='w-28'>
                                                <input
                                                    type='number'
                                                    min={0}
                                                    placeholder='Quantidade'
                                                    className='shadow-sm bg-gray-50 border border-gray-300 
                                                    text-gray-900 text-sm rounded-lg 
                                                    focus:ring-primary-500 focus:border-primary-500 
                                                    block  p-2.5'
                                                />
                                            </label>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                           <div className='ml-4 mt-4'>
                            <DatePicker />
                        </div>
                        <div className='ml-4 mt-4'>
                            <input type="checkbox" id="pago" name="pago" className='mr-1' checked={dadosFormulario.pago} onChange={handleInput} />
                            <label htmlFor="pago" className="text-sm font-medium text-gray-900" >Pago</label>
                        </div>
                    </div>
                    <Buttons
                        voltar={voltar}
                    />
                </form>
            </div>
        </section>
    )
}