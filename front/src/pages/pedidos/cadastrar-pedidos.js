import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services/pedidoService';
import { produtoService } from '../../services/produtoService';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function CadastrarPedidos() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        idCliente: 0,
        pago: false,
        date: '',
        nomeCliente: '',
        idsProdutos: []
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

        if (fieldName.includes('produto')) {
            const [_, idProduto, tipo] = fieldName.split('_');
            const id = parseInt(idProduto);

            if (tipo === 'checked') {
                setDadosFormulario((prevState) => {
                    const isSelected = prevState.idsProdutos.some(produto => produto.idProduto === id);
                    if (e.target.checked) {
                        if (!isSelected) {
                            return {
                                ...prevState,
                                idsProdutos: [...prevState.idsProdutos, { idProduto: id, quantidade: 0 }]
                            };
                        }
                    } else {
                        return {
                            ...prevState,
                            idsProdutos: prevState.idsProdutos.filter(produto => produto.idProduto !== id)
                        };
                    }
                });
            } else if (tipo === 'quantidade') {
                setDadosFormulario((prevState) => ({
                    ...prevState,
                    idsProdutos: prevState.idsProdutos.map(produto =>
                        produto.idProduto === id ? { ...produto, quantidade: Number(fieldValue) } : produto
                    )
                }));
            }
        } else {
            setDadosFormulario((prevState) => ({
                ...prevState,
                [fieldName]: fieldValue
            }));
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const data = {
            idCliente: dadosFormulario.idCliente,
            pago: dadosFormulario.pago ? 1 : 0,
            date: dadosFormulario.date,
            idsProdutos: dadosFormulario.idsProdutos,
            nomeCliente: dadosFormulario.nomeCliente
        };
        try {
            const result = await pedidoService.salvar(data);
            console.log('result', result)
            console.log('SALVOU')
           /*  toast.notify(result.mensagem, {
                title: 'Salvo!',
                duration: 3,
                type: "success"
            }) */
            voltar();
        } catch (err) {
            console.error('Error saving pedido:', err);
            return {
                status: false,
                mensagem: `Houve um erro ao cadastrar o pedido. ${err.message}`,
            };
        }
    };


    const getCliente = async () => {
        try {
            const response = await clienteService.listar();
            setClientes(response);
        } catch (error) {
            console.error(error);
        }
    };

    const getProdutos = async () => {
        try {
            const response = await produtoService.listar();
            setProdutos(response);
        } catch (error) {
            console.error(error);
        }
    };

    const voltar = () => {
        router.push('/pedidos/');
    };

    return (
        <section className="bg-neutral-100">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Registrar pedido</h2>
                <form onSubmit={onSubmit}>
                    <div className='grid grid-cols-2'>
                        <div className='mr-4'>
                            <label htmlFor="nomeCliente" className="block mb-2 text-sm font-medium text-gray-900">Nome cliente</label>
                            <input
                                type="text"
                                name="nomeCliente"
                                placeholder='Nome'
                                value={dadosFormulario.nomeCliente}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                            />
                        </div>

                        <div className='ml-4'>
                            <label htmlFor="cliente" className="block mb-2 text-sm font-medium text-gray-900">Selecionar Cliente</label>
                            <select
                                id='cliente'
                                name='idCliente'
                                value={dadosFormulario.idCliente}
                                onChange={handleInput}
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5'
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col mt-2'>
                            <span className="block text-sm font-medium text-gray-900">Produtos</span>
                            {
                                produtos.map((produto) => (
                                    <div key={produto.id} className='grid grid-cols-2 items-center mb-2'>
                                        <label htmlFor={`produto-${produto.id}`} className="text-sm font-medium text-gray-900 mr-4">
                                            <input
                                                name={`produto_${produto.id}_checked`}
                                                type='checkbox'
                                                id={`produto-${produto.id}`}
                                                className='mr-2'
                                                checked={dadosFormulario.idsProdutos.some(p => p.idProduto === produto.id)}
                                                onChange={handleInput}
                                            />
                                            {produto.nome}
                                        </label>
                                        <div>
                                            <label className='w-28'>
                                                <input
                                                    type='number'
                                                    min={0}
                                                    placeholder='Quantidade'
                                                    name={`produto_${produto.id}_quantidade`}
                                                    className='shadow-sm bg-gray-50 border border-gray-300 
                                                        text-gray-900 text-sm rounded-lg 
                                                        focus:ring-primary-500 focus:border-primary-500 
                                                        block  p-2.5'
                                                    value={
                                                        dadosFormulario.idsProdutos.find(p => p.idProduto === produto.id)?.quantidade || 0
                                                    }
                                                    onChange={handleInput}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='ml-4 mt-4'>
                            <input
                                type='date'
                                name='date'
                                label='Data'
                                value={dadosFormulario.date}
                                onChange={handleInput}
                            />
                        </div>
                        <div className='ml-4 mt-4'>
                            <input
                                type='checkbox'
                                id="pago"
                                name="pago"
                                className='mr-1'
                                checked={dadosFormulario.pago}
                                onChange={handleInput}
                            />
                            <label htmlFor="pago" className="text-sm font-medium text-gray-900">Pago</label>
                        </div>
                    </div>
                    <Buttons voltar={voltar} />
                </form>
            </div>
            <ToastContainer />
        </section>
    );
}