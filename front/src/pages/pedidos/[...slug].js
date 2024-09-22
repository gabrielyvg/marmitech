import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pedidoService } from '../../services/pedidoService';
import { produtoService } from '../../services/produtoService';
import { clienteService } from '../../services/clienteService';
import Buttons from '../../components/Buttons';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from "primereact/floatlabel";

export default function CadastrarPedidos() {
    const router = useRouter();

    const [dadosFormulario, setDadosFormulario] = useState({
        pago: false,
        date: '',
        nomeCliente: '',
        idsProdutos: []
    });
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setCliente] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const idPedido = router.query.slug && router.query.slug[1] ? router.query.slug[1] : null;

    useEffect(() => {
        getCliente();
        getProdutos();
    }, []);

    useEffect(() => {
        if (idPedido) {
            getPedidoById(idPedido)
        }
    }, [idPedido]);


    addLocale('pt-BR', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'quar', 'quin', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abreil', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    });

    const handleInput = (e, id = null, tipo = null) => {
        const isPrimeReactCheckbox = e.target === undefined && e.checked !== undefined;
        const isPrimeReactInput = e.target !== undefined && e.target.name !== undefined;

        let fieldName, fieldValue;

        if (isPrimeReactCheckbox) {
            fieldName = `produto_${id}_checked`;
            fieldValue = e.checked;
        } else if (isPrimeReactInput) {
            fieldName = e.target.name;
            fieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        } else {
            return;
        }

        if (fieldName && fieldName.includes('produto')) {
            const [_, idProduto, tipoInput] = fieldName.split('_');
            const produtoId = parseInt(idProduto);

            if (tipoInput === 'checked') {
                setDadosFormulario((prevState) => {
                    const isSelected = prevState.idsProdutos.some(produto => produto.idProduto === produtoId);
                    if (fieldValue) {
                        if (!isSelected) {
                            return {
                                ...prevState,
                                idsProdutos: [...prevState.idsProdutos, { idProduto: produtoId, quantidade: 0 }]
                            };
                        }
                    } else {
                        return {
                            ...prevState,
                            idsProdutos: prevState.idsProdutos.filter(produto => produto.idProduto !== produtoId)
                        };
                    }
                });
            } else if (tipoInput === 'quantidade') {
                setDadosFormulario((prevState) => ({
                    ...prevState,
                    idsProdutos: prevState.idsProdutos.map(produto =>
                        produto.idProduto === produtoId ? { ...produto, quantidade: Number(fieldValue) } : produto
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
            id: idPedido ?? 0,
            idCliente: selectedCliente,
            pago: dadosFormulario.pago ? 1 : 0,
            date: dadosFormulario.date,
            idsProdutos: dadosFormulario.idsProdutos,
            nomeCliente: dadosFormulario.nomeCliente
        };
        try {
            const result = await pedidoService.salvar(data);
            if (result.status) {
                console.log('SALVOU');
            } else {
                console.log('ERRO');
            }
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


    const getPedidoById = async (idPedido) => {
        try {
            const fetchedClienteData = await pedidoService.getById({ id: idPedido });

            const produtosSelecionados = Array.isArray(fetchedClienteData.produtos)
                ? fetchedClienteData.produtos.map((produto) => ({
                    idProduto: produto.idProduto,
                    quantidade: produto.quantidade
                }))
                : [{
                    idProduto: fetchedClienteData.idProduto,
                    quantidade: fetchedClienteData.quantidade
                }];

            const updatedData = {
                ...fetchedClienteData,
                idsProdutos: produtosSelecionados,
                pago: fetchedClienteData.pago === 1 ? true : false,
                date: new Date(fetchedClienteData.data),
                nomeCliente: fetchedClienteData.nomeCliente || ''
            };
            setCliente(fetchedClienteData.idCliente);
            setDadosFormulario(updatedData);

        } catch (err) {
            console.error('Erro ao buscar os dados do pedido:', err);
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <FloatLabel>
                                <InputText type="text" className="p-inputtext-md"
                                    name="nomeCliente"
                                    value={dadosFormulario.nomeCliente}
                                    onChange={handleInput} />
                                <label htmlFor={'nomeCliente'}>Nome</label>
                            </FloatLabel>
                        </div>

                        <div>
                            <Dropdown
                                value={selectedCliente}
                                onChange={(e) => setCliente(e.value)}
                                options={clientes}
                                optionLabel="nome"
                                placeholder="Selecione um cliente"
                                filter
                                className="w-full md:w-14rem" />
                        </div>
                        <div>
                            <Calendar
                                name='date'
                                placeholder='Data'
                                value={dadosFormulario.date}
                                onChange={handleInput}
                                dateFormat="dd/mm/yy"
                                locale="pt-BR" />
                        </div>

                        <div className="flex items-center">
                            <span htmlFor="pago" className="text-sm font-medium text-gray-900 mr-2">Pago</span>
                            <InputSwitch id="pago" name="pago" checked={dadosFormulario.pago} onChange={handleInput} />
                        </div>

                        <div className="md:col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    produtos.map((produto) => (
                                        <div key={produto.id} className="flex flex-col mb-2 mt-2">
                                            <div className="flex items-center">
                                                <span className="p-inputgroup-addon">
                                                    <Checkbox
                                                        name={`produto_${produto.id}_checked`}
                                                        checked={dadosFormulario.idsProdutos ? dadosFormulario.idsProdutos.some(p => p.idProduto === produto.id) : produto.idProduto}
                                                        onChange={(e) => handleInput(e, produto.id, 'checked')}
                                                    />
                                                </span>
                                                <FloatLabel>
                                                    <InputText
                                                        type='number'
                                                        min={0}
                                                        name={`produto_${produto.id}_quantidade`}
                                                        onChange={handleInput}
                                                    /*  style={{ width: '100%' }} */
                                                    />
                                                    <label htmlFor={`produto_${produto.id}_quantidade`} className="">{produto.nome}</label>
                                                </FloatLabel>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <Buttons voltar={voltar} />
                </form>
            </div>
            <ToastContainer />
        </section>

    );
}